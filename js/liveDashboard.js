import { CONFIG } from './config.js';
import * as ui from './ui.js';

const container = document.getElementById('dashboard-content');
const loadingMsg = document.getElementById('loading');
const lastUpdatedEl = document.getElementById('last-updated-timestamp');

function createPortTemplate(portName) {
    return { portName, vehicles: {}, pedestrians: {}, pedwest: {} };
}

function extractLaneData(text, laneFullName) {
    const data = { status: 'N/A', waitTime: 'N/A', lanesOpen: 'N/A', updateTime: '' };
    if (!text || !text.includes(laneFullName + ":")) return data;

    const chunk = text.split(laneFullName + ":")[1] || '';
    if (chunk.includes("Lanes Closed")) {
        data.status = 'Closed';
        data.lanesOpen = '0';
    } else {
        const wait = chunk.match(/(\d+)\s+min delay/);
        const lanes = chunk.match(/(\d+)\s+lane\(s\)\s+open/);
        const time = chunk.match(/At\s+([\d:]+\s*[ap]m\s*\w+)/);
        if (wait) {
            data.status = 'Open';
            data.waitTime = wait[1];
            data.lanesOpen = lanes ? lanes[1] : '?';
            data.updateTime = time ? time[0] : '';
        }
    }
    return data;
}

function getOperatingHoursInfo(desc, id) {
    const defaultInfo = { operatingHoursText: 'N/A', isCurrentlyOpen: true };

    // --- New Strategy: Handle table-like format ---
    // Find the line containing the identifier (e.g., "Passenger Vehicles")
    const lines = desc.split('\n');
    const relevantLine = lines.find(line => line.includes(id));

    if (relevantLine) {
        // In this format, the hours are the first column, separated by tabs.
        const parts = relevantLine.split('\t');
        const hoursText = parts[0].trim();
        
        // If we found non-empty text in the first column, use it.
        if (hoursText) {
            return { operatingHoursText: hoursText, isCurrentlyOpen: !hoursText.toLowerCase().includes('closed') };
        }
    }

    // --- Fallback Strategy: Original regex for older formats ---
    // This regex looks for a pattern like "ID: hours" followed by a date.
    const regexWithDate = new RegExp(`(${id}.*?:.*?)(?=\\s+\\d{1,2}/\\d{1,2}/\\d{4})`);
    const match = desc.match(regexWithDate);

    if (match && match[1]) {
        const text = match[1].trim();
        return { operatingHoursText: text, isCurrentlyOpen: !text.toLowerCase().includes('closed') };
    }

    // If both strategies fail, return the default.
    return defaultInfo;
}

function parseDescription(chunk, type, hoursInfo) {
    const data = {};
    let hasOpenLanes = false;
    data.operatingHours = hoursInfo.operatingHoursText;

    Object.values(CONFIG.LANES).forEach(lane => {
        const laneData = extractLaneData(chunk, `${lane} Lanes`);
        if (!hoursInfo.isCurrentlyOpen) laneData.status = 'Closed';
        if (laneData.status === 'Open') hasOpenLanes = true;
        data[lane] = laneData;
    });

    // If no specific hours were found, but lanes are open, assume 24 hours.
    if (data.operatingHours === 'N/A' && hasOpenLanes) {
        data.operatingHours = '24 Hours';
    }
    return data;
}


export async function fetchAndParseData() {
    const response = await fetch(CONFIG.URLS.LIVE_DATA_RSS);
    if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
    const xmlText = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const items = xmlDoc.getElementsByTagName('item');
    const portData = {};

    for (const item of items) {
        const title = item.querySelector('title').textContent;
        const portName = title.split(' - ')[0];
        if (!portData[portName]) portData[portName] = createPortTemplate(portName);

        const desc = item.querySelector('description').textContent;
        if (title.includes('PedWest')) {
            const pedWestHoursInfo = getOperatingHoursInfo(desc, CONFIG.MODES.PEDESTRIANS);
            Object.assign(portData[portName].pedwest, parseDescription(desc, CONFIG.MODES.PEDESTRIANS, pedWestHoursInfo));
        } else {
            const vChunk = desc.split('Passenger Vehicles')[1]?.split('Pedestrian')[0] || '';
            const pChunk = desc.split('Pedestrian')[1] || '';

            const vehicleHoursInfo = getOperatingHoursInfo(desc, 'Passenger Vehicles');
            const pedestrianHoursInfo = getOperatingHoursInfo(desc, CONFIG.MODES.PEDESTRIANS);

            Object.assign(portData[portName].vehicles, parseDescription(vChunk, CONFIG.MODES.VEHICLES, vehicleHoursInfo));
            Object.assign(portData[portName].pedestrians, parseDescription(pChunk, CONFIG.MODES.PEDESTRIANS, pedestrianHoursInfo));
        }
    }
    return portData;
}

export function render(state, onStateChange) {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const { ports: filterPorts, modes: filterModes, lanes: filterLanes } = state.filters;
    const { ports: allPortData, allPortNames } = state.liveData;

    let visiblePorts = filterPorts.length > 0 ? filterPorts : allPortNames;

    // Sort by favorite status, then alphabetically
    visiblePorts = [...visiblePorts].sort((a, b) => {
        const aIsFav = state.favorites.includes(a);
        const bIsFav = state.favorites.includes(b);
        if (aIsFav !== bIsFav) return bIsFav - aIsFav;
        return a.localeCompare(b);
    });

    visiblePorts
        .map(p => allPortData[p])
        .filter(Boolean)
        .forEach(portData => {
            const el = ui.createPortSectionElement(portData, state.filters, state.favorites, state.settings, onStateChange);
            if (el) fragment.appendChild(el);
        });

    container.appendChild(fragment);
    
    // Re-initialize accordions for newly created elements
    document.querySelectorAll('.port-title').forEach(h => {
        // Remove old listener to prevent duplicates
        const newH = h.cloneNode(true);
        h.parentNode.replaceChild(newH, h);
        newH.addEventListener('click', () => ui.toggleAccordion(newH));
    });
}

async function refreshData(onStateChange) {
    lastUpdatedEl.style.opacity = '0.5';
    try {
        const portData = await fetchAndParseData();
        onStateChange({
            liveData: {
                ports: portData,
                allPortNames: Object.keys(portData).sort(),
                lastUpdated: new Date(),
            }
        });
    } catch (error) {
        console.error("Failed to refresh data:", error);
    } finally {
        lastUpdatedEl.style.opacity = '1';
    }
}

export async function init(onStateChange) {
    try {
        const portData = await fetchAndParseData();
        const allPortNames = Object.keys(portData).sort();
        
        onStateChange({
            liveData: {
                ports: portData,
                allPortNames: allPortNames,
                lastUpdated: new Date(),
            }
        });

        loadingMsg.style.display = 'none';

        // Setup periodic refresh
        setInterval(() => refreshData(onStateChange), CONFIG.DASHBOARD.REFRESH_INTERVAL_MS);

    } catch (error) {
        if (loadingMsg) loadingMsg.textContent = 'Failed to load live data.';
        console.error('Live Init Error:', error);
    }
}