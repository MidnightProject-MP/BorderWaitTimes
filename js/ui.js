import { CONFIG } from './config.js';

function getStatusColorClass(status, waitTime, settings) {
    if (status !== 'Open') return CONFIG.UI.STATUS_COLORS.CLOSED;
    const mins = parseInt(waitTime, 10);
    if (isNaN(mins)) return '';
    if (mins <= settings.GREEN) return CONFIG.UI.STATUS_COLORS.GREEN;
    if (mins <= settings.YELLOW) return CONFIG.UI.STATUS_COLORS.YELLOW;
    return CONFIG.UI.STATUS_COLORS.RED;
}

function getHeatmapColor(waitTime) {
    const { HEATMAP_COLORS } = CONFIG.UI;
    if (waitTime <= 0) return HEATMAP_COLORS.NO_DATA;
    if (waitTime <= 15) return HEATMAP_COLORS.LOW;
    if (waitTime <= 30) return HEATMAP_COLORS.MEDIUM;
    if (waitTime <= 45) return HEATMAP_COLORS.HIGH;
    if (waitTime <= 60) return HEATMAP_COLORS.VHIGH;
    return HEATMAP_COLORS.EXTREME;
}

export function createCardElement(laneName, lane, settings) {
    const card = document.createElement('div');
    card.className = `card ${getStatusColorClass(lane.status, lane.waitTime, settings)}`;

    const h3 = document.createElement('h3');
    h3.textContent = laneName;

    const waitTimeDiv = document.createElement('div');
    waitTimeDiv.className = 'wait-time';
    if (lane.status === 'Open') {
        waitTimeDiv.innerHTML = `${lane.waitTime}<span style="font-size:0.5em; color:#bbb;"> min</span>`;
    } else {
        waitTimeDiv.textContent = lane.status;
    }

    const lanesOpenDiv = document.createElement('div');
    lanesOpenDiv.className = 'lanes-open';
    lanesOpenDiv.textContent = lane.status === 'Closed' ? 'Closed' : `${lane.lanesOpen} open`;

    const lastUpdatedDiv = document.createElement('div');
    lastUpdatedDiv.className = 'last-updated';
    lastUpdatedDiv.textContent = lane.updateTime;

    card.append(h3, waitTimeDiv, lanesOpenDiv, lastUpdatedDiv);
    return card;
}

function createFavoriteStarElement(portName, isFavorited, onStateChange) {
    const star = document.createElement('span');
    star.className = `favorite-star ${isFavorited ? 'favorited' : ''}`;
    star.textContent = '★';
    star.setAttribute('role', 'button');
    star.setAttribute('aria-label', isFavorited ? `Unfavorite ${portName}` : `Favorite ${portName}`);
    star.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent the accordion from toggling
        let newFavorites = isFavorited
            ? JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.FAVORITES) || '[]').filter(f => f !== portName)
            : [...JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.FAVORITES) || '[]'), portName];
        
        localStorage.setItem(CONFIG.STORAGE_KEYS.FAVORITES, JSON.stringify(newFavorites));
        onStateChange({ favorites: newFavorites });
    });
    return star;
}

export function createPortSectionElement(port, filters, favorites, settings, onStateChange) {
    const section = document.createElement('section');
    section.className = 'port-section';

    const header = document.createElement('h2');
    header.className = 'port-title active'; // Default to active/open
    header.setAttribute('aria-expanded', 'true');
    const layoutId = `port-layout-${port.portName.replace(/\s+/g, '-')}`;
    header.setAttribute('aria-controls', layoutId);

    const isFavorited = favorites.includes(port.portName)
    const star = createFavoriteStarElement(port.portName, isFavorited, onStateChange);

    header.append(star, ` ${port.portName}`);

    const layout = document.createElement('div');
    layout.className = 'port-layout';
    layout.id = layoutId;

    const categories = {
        [CONFIG.MODES.VEHICLES]: port.vehicles,
        [CONFIG.MODES.PEDESTRIANS]: port.pedestrians,
        [CONFIG.MODES.PEDWEST]: port.pedwest
    };

    for (const [mode, data] of Object.entries(categories)) {
        const effectiveMode = (mode === CONFIG.MODES.PEDWEST) ? CONFIG.MODES.PEDESTRIANS : mode;
        if (!filters.modes.includes(effectiveMode)) continue;

        const lanes = Object.entries(data).filter(([name, d]) => typeof d === 'object' && d.status !== 'N/A' && filters.lanes.includes(name));
        if (lanes.length > 0) {
            const col = document.createElement('div');
            col.className = 'category-column';

            const categoryTitle = document.createElement('h3');
            categoryTitle.className = 'category-title';
            categoryTitle.textContent = mode;
            col.appendChild(categoryTitle);

            if (data.operatingHours && data.operatingHours !== 'N/A') {
                const hoursP = document.createElement('p');
                hoursP.className = 'operating-hours';
                hoursP.textContent = `Hours: ${data.operatingHours}`;
                col.appendChild(hoursP);
            }

            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';
            lanes.forEach(([name, laneData]) => cardContainer.appendChild(createCardElement(name, laneData, settings)));
            col.appendChild(cardContainer);
            layout.appendChild(col);
        }
    }

    if (layout.hasChildNodes()) {
        section.append(header, layout);
        return section;
    }
    return null; // Return null if no content is visible for this port based on filters
}

export function createHeatmapElement(title, heatmapData) {
    const container = document.createElement('div');
    container.className = 'heatmap-wrapper';
    const h3 = document.createElement('h3');
    h3.className = 'heatmap-title';
    h3.textContent = title;
    container.appendChild(h3);
    const table = document.createElement('table');
    table.className = 'heatmap-table';
    const thead = table.createTHead();
    const headerRow = thead.insertRow();
    headerRow.insertCell().textContent = 'Day';
    for (let i = 0; i < 24; i++) {
        const th = document.createElement('th');
        th.textContent = i.toString().padStart(2, '0');
        headerRow.appendChild(th);
    }
    const tbody = table.createTBody();
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    days.forEach(day => {
        const row = tbody.insertRow();
        row.insertCell().textContent = day;
        for (let i = 0; i < 24; i++) {
            const cell = row.insertCell();
            const data = heatmapData[day][i];
            cell.style.backgroundColor = getHeatmapColor(data.average);
            cell.title = data.count > 0 ? `Avg: ${data.average} min (${data.count} records)` : 'No data';
            if (data.count > 0) cell.textContent = data.average;
        }
    });
    container.appendChild(table);
    return container;
}

export function renderPortFilterControls(container, portNames, checkedPorts) {
    container.innerHTML = ''; // Clear previous
    const h3 = document.createElement('h3');
    h3.textContent = 'Port of Entry:';
    container.appendChild(h3);

    portNames.forEach(name => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'port-filter';
        input.value = name;
        input.checked = checkedPorts.length === 0 || checkedPorts.includes(name);
        label.append(input, ` ${name}`);
        container.appendChild(label);
    });
}

export function updateFilterCheckboxes(container, filters) {
    container.querySelectorAll('input[name="mode-filter"]').forEach(c => c.checked = filters.modes.includes(c.value));
    container.querySelectorAll('input[name="lane-filter"]').forEach(c => c.checked = filters.lanes.includes(c.value));
}

export function updateLastUpdatedTimestamp(date) {
    const el = document.getElementById('last-updated-timestamp');
    if (el && date) {
        el.textContent = `Live Data Updated: ${date.toLocaleTimeString()}`;
    }
}

export function toggleAccordion(button) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !isExpanded);
    button.classList.toggle('active');
    const content = document.getElementById(button.getAttribute('aria-controls'));
    if (content) {
        content.classList.toggle('collapsed');
    }
}

export function updateSettingsControls(settings) {
    const greenInput = document.getElementById('threshold-green');
    const yellowInput = document.getElementById('threshold-yellow');

    if (greenInput && greenInput.value !== String(settings.GREEN)) greenInput.value = settings.GREEN;
    if (yellowInput && yellowInput.value !== String(settings.YELLOW)) yellowInput.value = settings.YELLOW;
}