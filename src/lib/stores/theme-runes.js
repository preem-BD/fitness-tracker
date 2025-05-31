/**
 * DARK MODE STORE - SVELTE 5 RUNES VERSION
 * Moderne Theme-Verwaltung mit Svelte 5 Runes
 * Automatische Persistierung im localStorage
 */

import { browser } from '$app/environment';

/**
 * THEME STATE MANAGEMENT - SVELTE 5 COMPATIBLE
 * Reactive State für Svelte 5 Components
 */

// Theme State - wird in Components als $state() verwendet
let _isDarkMode = false;

// Export functions that work with Svelte 5 runes
export function createThemeState() {
  // This will be used in components with $state()
  return _isDarkMode;
}

/**
 * DERIVED VALUES
 * Functions die von Components mit $derived() verwendet werden
 */
export function getThemeIcon(isDarkMode) {
  return isDarkMode ? '☀️' : '🌙';
}

export function getThemeLabel(isDarkMode) {
  return isDarkMode ? 'Zu Light Mode wechseln' : 'Zu Dark Mode wechseln';
}

export function getCurrentTheme(isDarkMode) {
  return isDarkMode ? 'dark' : 'light';
}

// Reactive getters für direkten Zugriff
export function isDarkMode() {
  return _isDarkMode;
}

export function themeIcon() {
  return getThemeIcon(_isDarkMode);
}

export function themeLabel() {
  return getThemeLabel(_isDarkMode);
}

export function currentTheme() {
  return getCurrentTheme(_isDarkMode);
}

/**
 * THEME FUNCTIONS
 * Utility Functions für Theme-Management
 */

// Theme toggle function
export function toggleTheme() {
  _isDarkMode = !_isDarkMode;
  saveThemePreference(_isDarkMode);
  applyTheme(_isDarkMode);
  console.log(`🎨 Theme gewechselt zu: ${_isDarkMode ? 'Dark' : 'Light'} Mode`);
  return _isDarkMode;
}

// Set specific theme
export function setTheme(darkMode) {
  _isDarkMode = darkMode;
  saveThemePreference(_isDarkMode);
  applyTheme(_isDarkMode);
  return _isDarkMode;
}

/**
 * THEME PERSISTENCE
 * localStorage Integration
 */
function saveThemePreference(darkMode) {
  if (browser) {
    localStorage.setItem('fitness-tracker-theme', darkMode ? 'dark' : 'light');
  }
}

function loadThemePreference() {
  if (browser) {
    const savedTheme = localStorage.getItem('fitness-tracker-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      return savedTheme === 'dark';
    } else {
      return systemPrefersDark;
    }
  }
  return false;
}

/**
 * THEME APPLICATION
 * DOM Manipulation für Theme-Anwendung
 */
function applyTheme(darkMode) {
  if (browser && document.documentElement) {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
}

/**
 * THEME INITIALIZATION
 * Setup beim App-Start
 */
export function initTheme() {
  if (browser) {
    // Lade gespeicherte Preference
    const savedTheme = loadThemePreference();
    _isDarkMode = savedTheme;
    applyTheme(_isDarkMode);
    
    // Höre auf System Theme Changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleSystemThemeChange(e) {
      // Nur wenn keine manuelle Preference gesetzt ist
      if (!localStorage.getItem('fitness-tracker-theme')) {
        _isDarkMode = e.matches;
        applyTheme(_isDarkMode);
      }
    }
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    console.log(`🎨 Theme initialisiert: ${_isDarkMode ? 'Dark' : 'Light'} Mode`);
    
    // Cleanup function return (für Components die es brauchen)
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }
}

/**
 * THEME UTILITIES
 * Helper Functions
 */
export function getThemeState() {
  return {
    isDarkMode: _isDarkMode,
    currentTheme: getCurrentTheme(_isDarkMode),
    themeIcon: getThemeIcon(_isDarkMode),
    themeLabel: getThemeLabel(_isDarkMode)
  };
}

// System theme detection
export function getSystemTheme() {
  if (browser) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}