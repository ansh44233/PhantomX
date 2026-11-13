// Local Storage Service for VoidStream
export const STORAGE_KEYS = {
  LIBRARY: 'voidstream_library',
  FAVORITES: 'voidstream_favorites',
  CONTINUE_WATCHING: 'voidstream_continue_watching',
  SETTINGS: 'voidstream_settings',
  WATCH_HISTORY: 'voidstream_watch_history'
};

// Library Management
export const addToLibrary = (item) => {
  const library = getLibrary();
  const exists = library.find(libItem => libItem.id === item.id && libItem.type === item.type);
  
  if (!exists) {
    const libraryItem = {
      ...item,
      addedAt: new Date().toISOString()
    };
    library.push(libraryItem);
    localStorage.setItem(STORAGE_KEYS.LIBRARY, JSON.stringify(library));
  }
  
  return library;
};

export const removeFromLibrary = (id, type) => {
  const library = getLibrary();
  const filtered = library.filter(item => !(item.id === id && item.type === type));
  localStorage.setItem(STORAGE_KEYS.LIBRARY, JSON.stringify(filtered));
  return filtered;
};

export const getLibrary = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LIBRARY) || '[]');
  } catch {
    return [];
  }
};

export const isInLibrary = (id, type) => {
  const library = getLibrary();
  return library.some(item => item.id === id && item.type === type);
};

// Continue Watching Management
export const addToContinueWatching = (item, progress = 0, season = null, episode = null) => {
  const continueWatching = getContinueWatching();
  const existingIndex = continueWatching.findIndex(
    cwItem => cwItem.id === item.id && cwItem.type === item.type
  );

  const watchItem = {
    ...item,
    progress,
    season,
    episode,
    lastWatched: new Date().toISOString()
  };

  if (existingIndex >= 0) {
    continueWatching[existingIndex] = watchItem;
  } else {
    continueWatching.unshift(watchItem);
  }

  // Keep only last 20 items
  const trimmed = continueWatching.slice(0, 20);
  localStorage.setItem(STORAGE_KEYS.CONTINUE_WATCHING, JSON.stringify(trimmed));
  return trimmed;
};

export const getContinueWatching = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CONTINUE_WATCHING) || '[]');
  } catch {
    return [];
  }
};

export const removeFromContinueWatching = (id, type) => {
  const continueWatching = getContinueWatching();
  const filtered = continueWatching.filter(item => !(item.id === id && item.type === type));
  localStorage.setItem(STORAGE_KEYS.CONTINUE_WATCHING, JSON.stringify(filtered));
  return filtered;
};

// Settings Management
export const DEFAULT_SETTINGS = {
  // Appearance
  theme: 'dark',
  accentColor: '#ffffff',
  fontSize: 'medium',
  fontFamily: 'Inter',
  borderRadius: 'medium',
  animations: true,
  transparency: true,
  compactMode: false,
  
  // Player
  autoplay: true,
  defaultQuality: 'auto',
  subtitles: true,
  subtitleSize: 'medium',
  subtitleColor: '#ffffff',
  volume: 80,
  playbackSpeed: 1,
  skipIntro: true,
  skipCredits: false,
  
  // Content
  adultContent: false,
  language: 'en',
  region: 'US',
  autoNext: true,
  showSpoilers: false,
  contentRating: 'all',
  
  // Interface
  sidebarCollapsed: false,
  showThumbnails: true,
  gridSize: 'medium',
  showRatings: true,
  showYear: true,
  showGenres: true,
  
  // Notifications
  notifications: true,
  newEpisodes: true,
  recommendations: true,
  updates: true,
  
  // Privacy
  trackWatching: true,
  shareData: false,
  analytics: false,
  
  // Advanced
  hardwareAcceleration: true,
  preloadContent: true,
  cacheSize: '1GB',
  maxConcurrentStreams: 3,
  networkTimeout: 30,
  retryAttempts: 3,
  
  // Experimental
  betaFeatures: false,
  debugMode: false,
  developerMode: false
};

export const getSettings = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{}');
    return { ...DEFAULT_SETTINGS, ...saved };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const updateSettings = (newSettings) => {
  const current = getSettings();
  const updated = { ...current, ...newSettings };
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  return updated;
};

export const resetSettings = () => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
  return DEFAULT_SETTINGS;
};

// Watch History
export const addToWatchHistory = (item, watchedAt = new Date().toISOString()) => {
  const history = getWatchHistory();
  const historyItem = { ...item, watchedAt };
  
  // Remove if already exists
  const filtered = history.filter(h => !(h.id === item.id && h.type === item.type));
  filtered.unshift(historyItem);
  
  // Keep only last 100 items
  const trimmed = filtered.slice(0, 100);
  localStorage.setItem(STORAGE_KEYS.WATCH_HISTORY, JSON.stringify(trimmed));
  return trimmed;
};

export const getWatchHistory = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.WATCH_HISTORY) || '[]');
  } catch {
    return [];
  }
};

export const clearWatchHistory = () => {
  localStorage.setItem(STORAGE_KEYS.WATCH_HISTORY, JSON.stringify([]));
  return [];
};

// Favorites Management
export const addToFavorites = (item) => {
  const favorites = getFavorites();
  const exists = favorites.find(favItem => favItem.id === item.id && favItem.type === item.type);
  
  if (!exists) {
    const favoriteItem = {
      ...item,
      addedAt: new Date().toISOString()
    };
    favorites.push(favoriteItem);
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }
  
  return favorites;
};

export const removeFromFavorites = (id, type) => {
  const favorites = getFavorites();
  const filtered = favorites.filter(item => !(item.id === id && item.type === type));
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(filtered));
  return filtered;
};

export const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]');
  } catch {
    return [];
  }
};

export const isInFavorites = (id, type) => {
  const favorites = getFavorites();
  return favorites.some(item => item.id === id && item.type === type);
};