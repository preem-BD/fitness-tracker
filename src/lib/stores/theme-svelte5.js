/**
 * SVELTE 5 THEME STORE
 * Modern theme management using reactive patterns compatible with Svelte 5
 */

import { browser } from '$app/environment';

/**
 * REACTIVE THEME STATE
 * Using a simple reactive pattern that works well with Svelte 5 runes
 */
class ThemeStore {
  constructor() {
    this._isDarkMode = false;
    this._subscribers = new Set();
    
    // Initialize theme on creation
    if (browser) {
      this.init();
    }
  }
  
  // Get current dark mode state
  get isDarkMode() {
    return this._isDarkMode;
  }
  
  // Get theme icon
  get themeIcon() {
    return this._isDarkMode ? '☀️' : '🌙';
  }
  
  // Get theme label
  get themeLabel() {
    return this._isDarkMode ? 'Zu Light Mode wechseln' : 'Zu Dark Mode wechseln';
  }
  
  // Get current theme
  get currentTheme() {
    return this._isDarkMode ? 'dark' : 'light';
  }
  
  // Subscribe to changes (for reactive updates)
  subscribe(callback) {
    this._subscribers.add(callback);
    callback(this._isDarkMode); // Call immediately with current value
    
    return () => {
      this._subscribers.delete(callback);
    };
  }
  
  // Notify subscribers of changes
  _notify() {
    this._subscribers.forEach(callback => callback(this._isDarkMode));
  }
  
  // Toggle theme
  toggleTheme() {
    this._isDarkMode = !this._isDarkMode;
    this._saveThemePreference();
    this._applyTheme();
    this._notify();
    console.log(`🎨 Theme gewechselt zu: ${this._isDarkMode ? 'Dark' : 'Light'} Mode`);
    return this._isDarkMode;
  }
  
  // Set specific theme
  setTheme(darkMode) {
    this._isDarkMode = darkMode;
    this._saveThemePreference();
    this._applyTheme();
    this._notify();
    return this._isDarkMode;
  }
  
  // Initialize theme
  init() {
    if (browser) {
      const savedTheme = this._loadThemePreference();
      this._isDarkMode = savedTheme;
      this._applyTheme();
      
      // Listen for system theme changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleSystemThemeChange = (e) => {
        if (!localStorage.getItem('fitness-tracker-theme')) {
          this._isDarkMode = e.matches;
          this._applyTheme();
          this._notify();
        }
      };
      
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      
      console.log(`🎨 Theme initialisiert: ${this._isDarkMode ? 'Dark' : 'Light'} Mode`);
      
      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    }
  }
  
  // Save theme preference to localStorage
  _saveThemePreference() {
    if (browser) {
      localStorage.setItem('fitness-tracker-theme', this._isDarkMode ? 'dark' : 'light');
    }
  }
  
  // Load theme preference from localStorage
  _loadThemePreference() {
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
  
  // Apply theme to DOM
  _applyTheme() {
    if (browser && document.documentElement) {
      if (this._isDarkMode) {
        document.documentElement.classList.add('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-theme', 'light');
      }
    }
  }
  
  // Get complete theme state
  getState() {
    return {
      isDarkMode: this._isDarkMode,
      currentTheme: this.currentTheme,
      themeIcon: this.themeIcon,
      themeLabel: this.themeLabel
    };
  }
  
  // Get system theme
  getSystemTheme() {
    if (browser) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }
}

// Create and export the theme store instance
export const themeStore = new ThemeStore();

// Export convenience functions for easy use in components
export const isDarkMode = () => themeStore.isDarkMode;
export const themeIcon = () => themeStore.themeIcon;
export const themeLabel = () => themeStore.themeLabel;
export const currentTheme = () => themeStore.currentTheme;
export const toggleTheme = () => themeStore.toggleTheme();
export const setTheme = (darkMode) => themeStore.setTheme(darkMode);
export const initTheme = () => themeStore.init();
export const getThemeState = () => themeStore.getState();
export const getSystemTheme = () => themeStore.getSystemTheme();

// Subscribe function for reactive updates
export const subscribeToTheme = (callback) => themeStore.subscribe(callback);
