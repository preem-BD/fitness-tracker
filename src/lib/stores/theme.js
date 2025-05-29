/**
 * DARK MODE STORE - VANILLA JS VERSION
 * Verwaltet Dark/Light Mode State für die gesamte App
 * Automatische Persistierung im localStorage
 */

import { browser } from '$app/environment';
import { writable, derived } from 'svelte/store';

/**
 * THEME STATE MANAGEMENT
 * Svelte Store für reaktive Theme-Verwaltung
 */

// Theme State - standardmäßig Light Mode
export const isDarkMode = writable(false);

/**
 * INITIAL THEME SETUP
 * Lädt gespeicherte Theme-Preference beim App-Start
 */
function initializeTheme() {
  if (browser) {
    // Lade gespeicherte Preference oder verwende System-Preference
    const savedTheme = localStorage.getItem('fitness-tracker-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      isDarkMode.set(savedTheme === 'dark');
    } else {
      isDarkMode.set(systemPrefersDark);
    }
    
    // Wende Theme sofort an
    isDarkMode.subscribe(applyTheme);
    
    // Höre auf System Theme Changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('fitness-tracker-theme')) {
        isDarkMode.set(e.matches);
      }
    });
  }
}

/**
 * THEME APPLICATION
 * Wendet das aktuelle Theme auf das DOM an
 */
function applyTheme(darkMode) {
  if (browser) {
    const html = document.documentElement;
    
    if (darkMode) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
  }
}

/**
 * THEME TOGGLE FUNCTION
 * Wechselt zwischen Dark und Light Mode
 */
export function toggleTheme() {
  isDarkMode.update(current => {
    const newValue = !current;
    
    if (browser) {
      // Speichere Preference
      localStorage.setItem('fitness-tracker-theme', newValue ? 'dark' : 'light');
      
      // Optional: Analytics Event
      console.log('🌙 Theme gewechselt zu:', newValue ? 'Dark Mode' : 'Light Mode');
    }
    
    return newValue;
  });
}

/**
 * THEME UTILITIES
 * Helper-Funktionen für Theme-Management
 */

// Prüft ob Dark Mode aktiv ist
export function getIsDarkMode() {
  let current = false;
  isDarkMode.subscribe(value => current = value)();
  return current;
}

// Setzt Theme explizit (für Preferences)
export function setTheme(theme) {
  if (theme === 'dark' || theme === 'light') {
    isDarkMode.set(theme === 'dark');
    
    if (browser) {
      localStorage.setItem('fitness-tracker-theme', theme);
    }
  }
}

// Reset zu System-Preference
export function resetToSystemTheme() {
  if (browser) {
    localStorage.removeItem('fitness-tracker-theme');
    isDarkMode.set(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
}

/**
 * DERIVED VALUES
 * Abgeleitete Werte für UI-Components
 */
export const themeIcon = derived(isDarkMode, $isDarkMode => $isDarkMode ? '☀️' : '🌙');
export const themeLabel = derived(isDarkMode, $isDarkMode => $isDarkMode ? 'Light Mode' : 'Dark Mode');
export const themeClass = derived(isDarkMode, $isDarkMode => $isDarkMode ? 'dark' : 'light');

/**
 * INITIALIZATION
 * Theme beim Import initialisieren - NUR im Browser
 */
// Entferne automatische Initialisierung beim Import
// initializeTheme wird jetzt manuell aufgerufen

/**
 * INITIALIZE FUNCTION
 * Manueller Aufruf für Theme-Initialisierung
 */
export function initTheme() {
  if (browser) {
    initializeTheme();
  }
}
