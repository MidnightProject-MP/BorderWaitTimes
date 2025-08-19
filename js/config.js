export const CONFIG = {
    URLS: {
        LIVE_DATA_RSS: 'https://bwt.cbp.gov/api/bwtRss/CSV/-1/57,55/57,55,106',
        HISTORICAL_DATA_CSV: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQgwjy1utMHHfGJuV_y7dlp_vQvpXo7jvNZ2BPK65BR-KWTgnFNPIk73hiMmX42dJddm5g_QtuUJjRv/pub?gid=993792785&single=true&output=csv',
    },
    DASHBOARD: {
        REFRESH_INTERVAL_MS: 5 * 60 * 1000, // 5 minutes
        DEBOUNCE_DELAY_MS: 300,
    },
    LANES: {
        GENERAL: 'General',
        READY: 'Ready',
        SENTRI: 'Sentri',
    },
    MODES: {
        VEHICLES: 'Vehicles',
        PEDESTRIANS: 'Pedestrians',
        PEDWEST: 'PedWest', // Special case
    },
    UI: {
        DEFAULT_TAB: 'live-dashboard',
        STATUS_COLORS: {
            GREEN: 'status-green',
            YELLOW: 'status-yellow',
            RED: 'status-red',
            CLOSED: 'status-closed',
        },
        WAIT_THRESHOLDS: {
            GREEN: 20,
            YELLOW: 45,
        },
        CHART_COLORS: {
            General: '#3b82f6',
            Ready: '#16a34a',
            Sentri: '#ef4444',
            Standard: '#f97316', // Fallback for pedestrian lanes often named 'Standard'
            DEFAULT: '#ffffff',
        },
        HEATMAP_COLORS: {
            NO_DATA: '#3a3a3a',
            LOW: '#2a5c34',     // green
            MEDIUM: '#7a6c22',  // yellow
            HIGH: '#9e4f22',    // orange
            VHIGH: '#b82f2f',   // red
            EXTREME: '#800000', // dark red
        },
    },
    STORAGE_KEYS: {
        FAVORITES: 'bwt_favorites',
        SETTINGS: 'bwt_settings',
    }
};
