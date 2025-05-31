/**
 * SVELTE 5 RUNES THEME STORE
 * Simple reactive theme management for Svelte 5 components
 */

import { browser } from '$app/environment';

/**
 * GLOBAL THEME STATE
 * Simple state that can be imported and used with $state() in components
 */
let globalThemeState = {
  isDarkMode: false,
  initialized: false
};

/**
 * THEME UTILITIES
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

/**
 * THEME PERSISTENCE
 */
function saveThemePreference(isDarkMode) {
  if (browser) {
    localStorage.setItem('fitness-tracker-theme', isDarkMode ? 'dark' : 'light');
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
 */
function applyTheme(isDarkMode) {
  if (browser && document.documentElement) {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
}

/**
 * THEME FUNCTIONS
 */
export function toggleTheme() {
  globalThemeState.isDarkMode = !globalThemeState.isDarkMode;
  saveThemePreference(globalThemeState.isDarkMode);
  applyTheme(globalThemeState.isDarkMode);
  console.log(`🎨 Theme gewechselt zu: ${globalThemeState.isDarkMode ? 'Dark' : 'Light'} Mode`);
  return globalThemeState.isDarkMode;
}

export function setTheme(isDarkMode) {
  globalThemeState.isDarkMode = isDarkMode;
  saveThemePreference(globalThemeState.isDarkMode);
  applyTheme(globalThemeState.isDarkMode);
  return globalThemeState.isDarkMode;
}

export function initTheme() {
  if (browser && !globalThemeState.initialized) {
    const savedTheme = loadThemePreference();
    globalThemeState.isDarkMode = savedTheme;
    globalThemeState.initialized = true;
    applyTheme(globalThemeState.isDarkMode);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleSystemThemeChange(e) {
      if (!localStorage.getItem('fitness-tracker-theme')) {
        globalThemeState.isDarkMode = e.matches;
        applyTheme(globalThemeState.isDarkMode);
      }
    }
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    console.log(`🎨 Theme initialisiert: ${globalThemeState.isDarkMode ? 'Dark' : 'Light'} Mode`);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }
}

/**
 * STATE GETTERS
 * For use in components
 */
export function getThemeState() {
  return globalThemeState;
}

export function getSystemTheme() {
  if (browser) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

// Direct getters for convenience
export const isDarkMode = () => globalThemeState.isDarkMode;
export const themeIcon = () => getThemeIcon(globalThemeState.isDarkMode);
export const themeLabel = () => getThemeLabel(globalThemeState.isDarkMode);
export const currentTheme = () => getCurrentTheme(globalThemeState.isDarkMode);
