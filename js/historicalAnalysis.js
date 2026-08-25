import { CONFIG } from './config.js';
import * as ui from './ui.js';

const loadingMsg = document.getElementById('historical-loading');
const portSelect = document.getElementById('port-select');
const ctx = document.getElementById('wait-time-chart').getContext('2d');
const heatmapContainer = document.getElementById('heatmap-container');

let chart;

/**
 * Parses a time string like "12:00 AM" or "3:00 PM" into a 24-hour format number.
 * @param {string} timeStr The time string to parse.
 * @returns {number} The hour in 24-hour format (0-23).
 */
function parseTimeToHour(timeStr) {
    const [time, modifier] = timeStr.split(' ');
    let [hours] = time.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0; // Midnight case
    return hours;
}

async function fetchAndParse() {
    console.groupCollapsed('[HISTORICAL ANALYSIS] Data Processing Pipeline');
    console.log(`[1/4] Fetching historical data from: ${CONFIG.URLS.HISTORICAL_DATA_CSV}`);

    try {
        // Add a cache-busting parameter to prevent browsers from serving stale, empty responses.
        const url = `${CONFIG.URLS.HISTORICAL_DATA_CSV}&_=${new Date().getTime()}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);
        const csvText = await response.text();
        console.log('[2/4] Raw CSV data received:\n', csvText);
        if (!csvText || csvText.trim() === '') {
            throw new Error("Received empty data from the server. The data source might be temporarily unavailable.");
        }
        
        const lines = csvText.trim().split(/\r?\n/);
        if (lines.length < 2) {
            throw new Error("Historical data is incomplete (missing headers or data rows).");
        }

        const headerLine = lines.shift();
        const headers = headerLine.split(',').map(h => h.trim());

        // Find column indices dynamically to be resilient to column reordering
        const colIndices = {
            port: headers.indexOf('Port Name'),
            category: headers.indexOf('Category'),
            lane: headers.indexOf('Lane Type'),
            day: headers.indexOf('Day Label'),
            time: headers.indexOf('Report Time'),
            wait: headers.indexOf('Average Wait Time')
        };

        // Verify that all required columns were found in the header
        for (const [key, index] of Object.entries(colIndices)) {
            if (index === -1) {
                throw new Error(`Historical data is missing required column: "${key}" (Header was: ${headerLine})`);
            }
        }

        const data = {};
        const rows = lines;

        rows.forEach(row => {
            const cells = row.split(',').map(c => c.trim());
            if (cells.length < headers.length) return; // Skip malformed or empty rows

            const portName = cells[colIndices.port];
            const category = cells[colIndices.category];
            const laneType = cells[colIndices.lane].replace(' Lanes', ''); // "General Lanes" -> "General"
            const day = cells[colIndices.day].substring(0, 3); // "Friday" -> "Fri"
            const waitTime = parseInt(cells[colIndices.wait], 10);
            const hour = parseTimeToHour(cells[colIndices.time]);

            if (!portName || !category || !laneType || !day || isNaN(hour) || isNaN(waitTime)) return;

            if (!data[portName]) data[portName] = {};
            const laneKey = `${category} - ${laneType}`;
            if (!data[portName][laneKey]) data[portName][laneKey] = {};
            
            const dayHourKey = `${day} ${hour}`;
            data[portName][laneKey][dayHourKey] = waitTime;
        });
        console.log('[3/4] Parsed data into structured object:', data);
        console.groupEnd();
        return data;
    } catch (error) {
        console.error("[Hist] Error fetching or parsing data:", error);
        console.groupEnd();
        loadingMsg.textContent = `Failed to load historical data: ${error.message}`;
        return null;
    }
}

function calculateHourlyAverages(dayHourData) {
    const averageData = Array(24).fill(0);
    const counts = Array(24).fill(0);

    for (const dayHour in dayHourData) {
        // Use a regex to robustly find the hour number at the end of the string.
        const hourMatch = dayHour.match(/(\d+)$/);
        const hour = hourMatch ? parseInt(hourMatch[1], 10) : NaN;
        if (!isNaN(hour) && hour >= 0 && hour < 24) {
            averageData[hour] += dayHourData[dayHour];
            counts[hour]++;
        }
    }

    for (let i = 0; i < 24; i++) {
        averageData[i] = counts[i] > 0 ? Math.round(averageData[i] / counts[i]) : 0;
    }
    return averageData;
}

function calculateDayHourAverages(dayHourData) {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const processed = {};
    days.forEach(day => {
        processed[day] = {};
        for (let i = 0; i < 24; i++) {
            processed[day][i] = { total: 0, count: 0, average: 0 };
        }
    });

    for (const dayHour in dayHourData) {
        const dayMatch = dayHour.match(/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/);
        const hourMatch = dayHour.match(/(\d+)$/);
        if (dayMatch && hourMatch) {
            const day = dayMatch[0];
            const hour = parseInt(hourMatch[1], 10);
            if (!isNaN(hour) && hour >= 0 && hour < 24) {
                processed[day][hour].total += dayHourData[dayHour];
                processed[day][hour].count++;
            }
        }
    }

    for (const day of days) {
        for (let i = 0; i < 24; i++) {
            if (processed[day][i].count > 0) {
                processed[day][i].average = Math.round(processed[day][i].total / processed[day][i].count);
            }
        }
    }
    return processed;
}


export function updateChart(state) {
    const portName = state.historicalPortSelection;
    const portData = state.historicalData.processedData?.[portName];

    if (!portData) {
        console.warn(`[Hist] No data for selected port: ${portName}`);
        if (chart) chart.destroy();
        heatmapContainer.innerHTML = '';
        return;
    }
    
    console.groupCollapsed(`[HISTORICAL ANALYSIS] Rendering charts for: ${portName}`);
    console.log('Using data subset for this port:', portData);

    const datasets = [];
    const colors = CONFIG.UI.CHART_COLORS;

    for (const key in portData) {
        const laneType = key.split(' - ')[1];
        const dayHourData = portData[key];
        const averageData = calculateHourlyAverages(dayHourData);
        const color = colors[laneType] || colors.DEFAULT;
        datasets.push({
            label: key,
            data: averageData,
            borderColor: color,
            backgroundColor: color + '33', // Add alpha for fill
            fill: true,
            tension: 0.4,
        });
    }

    console.log('[1/2] Data prepared for Line Chart:', datasets);

    const labels = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'line',
        data: { labels, datasets },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: `Average Hourly Wait Times at ${portName}`, color: colors.TEXT_PRIMARY, font: { size: 18 } },
                legend: { labels: { color: colors.TEXT_PRIMARY } }
            },
            scales: {
                x: { ticks: { color: colors.TEXT_SECONDARY }, grid: { color: colors.GRID } },
                y: { ticks: { color: colors.TEXT_SECONDARY }, grid: { color: colors.GRID }, title: { display: true, text: 'Wait Time (minutes)', color: colors.TEXT_PRIMARY } }
            }
        }
    });

    // --- Render Heatmaps ---
    heatmapContainer.innerHTML = ''; // Clear previous heatmaps
    let loggedHeatmapData = false;
    for (const key in portData) {
        const dayHourData = portData[key];
        const heatmapData = calculateDayHourAverages(dayHourData);
        const heatmapEl = ui.createHeatmapElement(key, heatmapData);
        heatmapContainer.appendChild(heatmapEl);
        if (!loggedHeatmapData) {
            console.log(`[2/2] Data prepared for Heatmap (Example: '${key}'):`, heatmapData);
            loggedHeatmapData = true;
        }
    }
    console.groupEnd();
}

export async function init(state, onStateChange) {
    const processedData = await fetchAndParse();
    if (processedData) {
        loadingMsg.style.display = 'none';
        const portNames = Object.keys(processedData).sort();

        onStateChange({
            historicalData: { processedData, portNames }
        });

        portSelect.innerHTML = portNames.map(name => `<option value="${name}">${name}</option>`).join('');

        portSelect.addEventListener('change', () => {
            onStateChange({ historicalPortSelection: portSelect.value });
        });

        // Set initial selection from state (which might have been set from URL)
        if (state.historicalPortSelection && portNames.includes(state.historicalPortSelection)) {
            portSelect.value = state.historicalPortSelection;
        } else if (portNames.length > 0) {
            // If no valid selection, default to the first port and update state
            onStateChange({ historicalPortSelection: portNames[0] });
            portSelect.value = portNames[0];
        }
        
        updateChart({ ...state, historicalData: { processedData } }); // Initial render
    }
}
