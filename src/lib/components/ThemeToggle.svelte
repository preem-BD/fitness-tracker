<!--
  DARK MODE TOGGLE COMPONENT
  Eleganter Toggle-Button für Dark/Light Mode
  Konsistentes Design mit App-Theme
-->

<script>
  /**
   * SVELTE 5 RUNES VERSION - THEME TOGGLE COMPONENT
   * Moderner Toggle-Button mit Svelte 5 State Management
   */
  import { getThemeState, toggleTheme, getThemeIcon, getThemeLabel, initTheme } from '$lib/stores/theme-simple.js';
  import { onMount } from 'svelte';
  
  /**
   * SVELTE 5 STATE
   * Component-lokaler State mit $state()
   */
  let isAnimating = $state(false);
  
  // Get initial theme state
  let themeState = getThemeState();
  
  // Reactive theme values using $state
  let isDarkMode = $state(themeState.isDarkMode);
  
  // Derived values using $derived
  let themeIcon = $derived(getThemeIcon(isDarkMode));
  let themeLabel = $derived(getThemeLabel(isDarkMode));
  let buttonClass = $derived(`theme-toggle ${isAnimating ? 'animating' : ''} ${isDarkMode ? 'dark' : ''}`);
  let iconClass = $derived(`theme-icon ${isAnimating ? 'rotating' : ''}`);
  let indicatorClass = $derived(`toggle-indicator ${isDarkMode ? 'active' : ''}`);
  
  /**
   * INTERACTION FUNCTIONS
   * Event Handlers mit Animation
   */
  function handleToggle() {
    if (isAnimating) return;
    
    isAnimating = true;
    const newDarkMode = toggleTheme();
    
    // Update local state to trigger reactivity
    isDarkMode = newDarkMode;
    
    // Animation Reset nach Transition
    setTimeout(() => {
      isAnimating = false;
    }, 300);
    
    console.log('🎨 Theme Toggle aktiviert:', isDarkMode ? 'Dark' : 'Light');
  }
  
  /**
   * KEYBOARD ACCESSIBILITY
   * Unterstützung für Keyboard Navigation
   */
  function handleKeydown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  }
  
  /**
   * SVELTE 5 EFFECTS
   * Side Effects für Debugging und Theme Sync
   */
  $effect(() => {
    console.log('🎨 ThemeToggle State:', {
      isDarkMode,
      isAnimating,
      themeIcon,
      timestamp: new Date().toISOString()
    });
  });
  
  // Initialize theme on mount
  onMount(() => {
    initTheme();
    // Sync with current theme state
    const currentState = getThemeState();
    isDarkMode = currentState.isDarkMode;
  });
</script>

<!--
  THEME TOGGLE BUTTON
  Accessibility-optimierter Toggle
-->
<button
  type="button"
  class="theme-toggle"
  class:animating={isAnimating}
  class:dark={isDarkMode}
  onclick={handleToggle}
  onkeydown={handleKeydown}
  aria-label={themeLabel}
  title={themeLabel}
>
  <span class="theme-icon" class:rotating={isAnimating}>
    {themeIcon}
  </span>
  
  <!-- Optional: Text Label für Desktop -->
  <span class="theme-text">
    {isDarkMode ? 'Light' : 'Dark'}
  </span>
  
  <!-- Visual Indicator -->
  <div class="toggle-indicator" class:active={isDarkMode}></div>
</button>

<style>
  /*
    THEME TOGGLE STYLING
    Modern, konsistenter Button-Style
  */
  .theme-toggle {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--spacing-2);
    padding: var(--spacing-2) var(--spacing-3);
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    color: var(--text-primary);
    font-size: var(--font-size-sm);
    font-weight: 500;
    cursor: pointer;
    transition: all var(--transition-normal);
    box-shadow: var(--shadow-sm);
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
  
  .theme-toggle:hover {
    background: var(--bg-tertiary);
    border-color: var(--primary-color);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
  
  .theme-toggle:active {
    transform: translateY(0);
    box-shadow: var(--shadow-sm);
  }
  
  .theme-toggle:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
  
  /*
    THEME ICON STYLING
    Animiertes Icon mit Rotation
  */
  .theme-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1em;
    transition: transform var(--transition-normal);
  }
  
  .theme-icon.rotating {
    transform: rotate(180deg);
  }
  
  /*
    TEXT LABEL
    Versteckt auf Mobile, sichtbar auf Desktop
  */
  .theme-text {
    font-size: var(--font-size-sm);
    font-weight: 500;
    color: var(--text-secondary);
    transition: color var(--transition-normal);
  }
  
  /*
    TOGGLE INDICATOR
    Visueller Status-Indikator
  */
  .toggle-indicator {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 6px;
    height: 6px;
    background: var(--gray-300);
    border-radius: 50%;
    transition: all var(--transition-normal);
    opacity: 0.5;
  }
  
  .toggle-indicator.active {
    background: var(--primary-color);
    opacity: 1;
    box-shadow: 0 0 8px var(--primary-color);
  }
  
  /*
    ANIMATION STATES
    Zusätzliche Animationen während Toggle
  */
  .theme-toggle.animating {
    transform: scale(0.95);
  }
  
  .theme-toggle.animating .theme-icon {
    transform: rotate(180deg) scale(1.1);
  }
  
  /*
    DARK MODE SPECIFIC STYLES
    Spezielle Styles für Dark Mode
  */
  .theme-toggle.dark {
    background: var(--bg-secondary);
    border-color: var(--gray-600);
  }
  
  .theme-toggle.dark:hover {
    background: var(--bg-tertiary);
    border-color: var(--primary-color);
  }
  
  /*
    RESPONSIVE DESIGN
    Mobile-optimierte Darstellung
  */
  @media (max-width: 768px) {
    .theme-toggle {
      padding: var(--spacing-2);
      min-width: 40px;
      justify-content: center;
    }
    
    .theme-text {
      display: none;
    }
    
    .toggle-indicator {
      display: none;
    }
  }
  
  /*
    ACCESSIBILITY IMPROVEMENTS
    High Contrast und Reduced Motion
  */
  @media (prefers-reduced-motion: reduce) {
    .theme-toggle,
    .theme-icon,
    .toggle-indicator {
      transition: none;
    }
    
    .theme-icon.rotating {
      transform: none;
    }
  }
  
  @media (prefers-contrast: high) {
    .theme-toggle {
      border-width: 2px;
    }
    
    .theme-toggle:focus {
      outline-width: 3px;
    }
  }
  
  /*
    LOADING STATE
    Für bessere UX während Theme-Switch
  */
  .theme-toggle:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  .theme-toggle:disabled:hover {
    background: var(--bg-primary);
    transform: none;
  }
</style>
