import { CONFIG } from './config.js';
import * as liveDashboard from './liveDashboard.js';
import * as historicalAnalysis from './historicalAnalysis.js';
import * as ui from './ui.js';

// --- DOM Elements ---
const TABS = document.querySelectorAll('.tab-button');
const CONTENTS = document.querySelectorAll('.tab-content');
const filterControlsContainer = document.querySelector('#panel-live-dashboard .filter-controls');
const portFilterContainer = document.getElementById('port-filter-container');
const settingsContainer = document.getElementById('panel-settings');
const filterAccordionButton = document.getElementById('filter-accordion-button');

// --- State Management ---
let appState = {
    activeTab: CONFIG.UI.DEFAULT_TAB,
    liveData: {
        ports: {},
        allPortNames: [],
        lastUpdated: null,
    },
    historicalData: {
        processedData: null,
        portNames: [],
        dataLoaded: false,
    },
    filters: {
        ports: [],
        modes: Object.values(CONFIG.MODES).filter(m => m !== 'PedWest'),
        lanes: Object.values(CONFIG.LANES),
    },
    favorites: [],
    settings: {
        ...CONFIG.UI.WAIT_THRESHOLDS // Start with defaults from config
    },
    historicalPortSelection: null,
};

function handleStateUpdate(updates) {
    // Deep merge for nested objects like liveData and filters
    Object.keys(updates).forEach(key => {
        // Note: `appState.settings` is not deeply merged, it's replaced, which is what we want.
        if (typeof updates[key] === 'object' && !Array.isArray(updates[key]) && updates[key] !== null) {
            appState[key] = { ...appState[key], ...updates[key] };
        } else {
            appState[key] = updates[key];
        }
    });

    // If settings were updated, persist them to localStorage
    if (updates.settings) {
        saveSettingsToStorage(appState.settings);
    }

    // After state is updated, sync with URL and re-render the UI
    setHashFromState();
    render();
}

// --- URL Hash Management ---
function getStateFromHash() {
    const params = new URLSearchParams(window.location.hash.substring(1));
    return {
        activeTab: params.get('tab') || CONFIG.UI.DEFAULT_TAB,
        filters: {
            ports: params.get('ports')?.split(',').filter(Boolean) || [],
            modes: params.get('modes')?.split(',').filter(Boolean) || appState.filters.modes,
            lanes: params.get('lanes')?.split(',').filter(Boolean) || appState.filters.lanes,
        },
        historicalPortSelection: params.get('histPort') || null,
    };
}

function setHashFromState() {
    const params = new URLSearchParams();
    params.set('tab', appState.activeTab);
    if (appState.filters.ports.length > 0) params.set('ports', appState.filters.ports.join(','));
    if (appState.filters.modes.length > 0) params.set('modes', appState.filters.modes.join(','));
    if (appState.filters.lanes.length > 0) params.set('lanes', appState.filters.lanes.join(','));
    if (appState.historicalPortSelection) params.set('histPort', appState.historicalPortSelection);
    
    // Use replaceState to avoid polluting browser history on every state change
    history.replaceState(null, '', '#' + params.toString());
}

// --- Rendering ---
function render() {
    // Update active tab
    TABS.forEach(t => t.classList.toggle('active', t.dataset.tab === appState.activeTab));
    CONTENTS.forEach(c => c.classList.toggle('active', c.id === `panel-${appState.activeTab}`));
    TABS.forEach(t => t.setAttribute('aria-selected', t.dataset.tab === appState.activeTab));

    // Render live dashboard content
    if (appState.liveData.allPortNames.length > 0) {
        ui.renderPortFilterControls(portFilterContainer, appState.liveData.allPortNames, appState.filters.ports);
        ui.updateFilterCheckboxes(filterControlsContainer, appState.filters);
        liveDashboard.render(appState, handleStateUpdate);
    }
    
    // Update timestamp
    if (appState.liveData.lastUpdated) {
        ui.updateLastUpdatedTimestamp(appState.liveData.lastUpdated);
    }

    // Update historical chart
    if (appState.activeTab === 'historical-analysis' && appState.historicalData.dataLoaded) {
        historicalAnalysis.updateChart(appState);
    }

    // Update settings controls with current state values
    if (appState.activeTab === 'settings') {
        ui.updateSettingsControls(appState.settings);
    }
}

// --- Event Handlers & Initialization ---
function switchTab(tabId) {
    handleStateUpdate({ activeTab: tabId });

    if (tabId === 'historical-analysis' && !appState.historicalData.dataLoaded) {
        handleStateUpdate({ historicalData: { dataLoaded: true } });
        historicalAnalysis.init(appState, handleStateUpdate);
    } else if (tabId === 'settings') {
        // No data to load, just render to show the inputs with correct values
    }
}

function getFavoritesFromStorage() {
    try {
        const favs = localStorage.getItem(CONFIG.STORAGE_KEYS.FAVORITES);
        return favs ? JSON.parse(favs) : [];
    } catch (e) {
        return [];
    }
}

function getSettingsFromStorage() {
    try {
        const settings = localStorage.getItem(CONFIG.STORAGE_KEYS.SETTINGS);
        // Merge stored settings with defaults to ensure all keys are present if new ones are added to config
        return settings ? { ...CONFIG.UI.WAIT_THRESHOLDS, ...JSON.parse(settings) } : { ...CONFIG.UI.WAIT_THRESHOLDS };
    } catch (e) {
        return { ...CONFIG.UI.WAIT_THRESHOLDS }; // Return defaults on error
    }
}

function saveSettingsToStorage(settings) {
    localStorage.setItem(CONFIG.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

function setupEventListeners() {
    TABS.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    filterAccordionButton.addEventListener('click', () => ui.toggleAccordion(filterAccordionButton));

    const handleFilterChange = debounce(() => {
        const ports = Array.from(document.querySelectorAll('input[name="port-filter"]:checked')).map(c => c.value);
        const modes = Array.from(document.querySelectorAll('input[name="mode-filter"]:checked')).map(c => c.value);
        const lanes = Array.from(document.querySelectorAll('input[name="lane-filter"]:checked')).map(c => c.value);
        handleStateUpdate({ filters: { ports, modes, lanes } });
    }, CONFIG.DASHBOARD.DEBOUNCE_DELAY_MS);

    filterControlsContainer.addEventListener('change', handleFilterChange);

    settingsContainer.addEventListener('input', debounce((e) => {
        if (e.target.type === 'number') {
            const greenInput = document.getElementById('threshold-green');
            const yellowInput = document.getElementById('threshold-yellow');
            const greenThreshold = parseInt(greenInput.value, 10);
            const yellowThreshold = parseInt(yellowInput.value, 10);

            // Basic validation: ensure numbers are valid and green is less than yellow
            if (!isNaN(greenThreshold) && !isNaN(yellowThreshold) && greenThreshold < yellowThreshold) {
                handleStateUpdate({
                    settings: { GREEN: greenThreshold, YELLOW: yellowThreshold }
                });
            }
        }
    }, CONFIG.DASHBOARD.DEBOUNCE_DELAY_MS));

    document.getElementById('reset-settings-button').addEventListener('click', () => {
        // Remove from storage to revert to defaults on next load
        localStorage.removeItem(CONFIG.STORAGE_KEYS.SETTINGS);
        // Update state immediately to reflect the change
        handleStateUpdate({
            settings: { ...CONFIG.UI.WAIT_THRESHOLDS }
        });
    });


    // Handle back/forward browser navigation
    window.addEventListener('popstate', () => {
        const hashState = getStateFromHash();
        handleStateUpdate(hashState);
    });
}

async function initialize() {
    // 1. Set initial state from URL hash and local storage
    const initialStateFromHash = getStateFromHash();
    const initialSettings = getSettingsFromStorage();
    const initialFavorites = getFavoritesFromStorage();
    
    // Use a temporary state object to avoid multiple re-renders
    const initialState = {
        ...appState,
        ...initialStateFromHash,
        settings: initialSettings,
        favorites: initialFavorites,
    };
    
    // Directly update appState without triggering render yet
    appState = initialState;

    // 2. Setup event listeners
    setupEventListeners();

    // 3. Initial tab switch without triggering historical load yet
    TABS.forEach(t => t.classList.toggle('active', t.dataset.tab === appState.activeTab));
    CONTENTS.forEach(c => c.classList.toggle('active', c.id === `panel-${appState.activeTab}`));
    TABS.forEach(t => t.setAttribute('aria-selected', t.dataset.tab === appState.activeTab));

    // 4. Fetch initial live data
    await liveDashboard.init(handleStateUpdate);

    // 5. Load historical data if it's the active tab
    if (appState.activeTab === 'historical-analysis' && !appState.historicalData.dataLoaded) {
        handleStateUpdate({ historicalData: { dataLoaded: true } });
        await historicalAnalysis.init(appState, handleStateUpdate);
    }

    // 6. Perform the first full render with all initial data
    render();
}

document.addEventListener('DOMContentLoaded', initialize);