<!-- 
  NAVIGATION COMPONENT - SVELTE 5 RUNES VERSION
  Zentrale Navigation Bar für die gesamte Anwendung
  Zeigt SvelteKit Routing, Responsive Design und Component-Architektur
-->

<nav class="main-navigation" class:mobile-open={isMobileMenuOpen}>
  
  <!-- Navigation Header -->
  <div class="nav-header">
    
    <!-- Logo/Brand -->
    <a href="/" class="nav-brand" onclick={closeMobileMenu}>
      <span class="brand-icon">💪</span>
      <span class="brand-text">Fitness Tracker</span>
    </a>

    <!-- Mobile Menu Toggle -->
    <button 
      type="button" 
      class="mobile-toggle"
      onclick={toggleMobileMenu}
      aria-label="Navigation öffnen/schließen"
    >
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    </button>

  </div>

  <!-- Navigation Menu -->
  <div class="nav-menu" class:open={isMobileMenuOpen}>
    
    <!-- Main Navigation Links -->
    <ul class="nav-links">
      
      <!-- Home -->
      <li class="nav-item">
        <a 
          href="/" 
          class="nav-link"
          class:active={currentPath === '/'}
          onclick={closeMobileMenu}
        >
          <span class="nav-icon">🏠</span>
          <span class="nav-text">Home</span>
        </a>
      </li>

      <!-- Workouts Dropdown -->
      <li class="nav-item dropdown" class:open={isWorkoutDropdownOpen}>
        <button 
          type="button"
          class="nav-link dropdown-toggle"
          class:active={isWorkoutSection}
          onclick={toggleWorkoutDropdown}
        >
          <span class="nav-icon">💪</span>
          <span class="nav-text">Workouts</span>
          <span class="dropdown-arrow">▼</span>
        </button>
        
        <ul class="dropdown-menu" class:show={isWorkoutDropdownOpen}>
          <li>
            <a 
              href="/workouts" 
              class="dropdown-link"
              class:active={currentPath === '/workouts'}
              onclick={closeMobileMenu}
            >
              📋 Alle Workouts
            </a>
          </li>
          <li>
            <a 
              href="/workouts/create" 
              class="dropdown-link"
              class:active={currentPath === '/workouts/create'}
              onclick={closeMobileMenu}
            >
              ➕ Neues Workout
            </a>
          </li>
          <li class="dropdown-divider"></li>
          <li>
            <a 
              href="/sessions" 
              class="dropdown-link"
              onclick={closeMobileMenu}
            >
              🏃‍♂️ Training Sessions
            </a>
          </li>
        </ul>
      </li>

      <!-- Exercises Dropdown -->
      <li class="nav-item dropdown" class:open={isExerciseDropdownOpen}>
        <button 
          type="button"
          class="nav-link dropdown-toggle"
          class:active={isExerciseSection}
          onclick={toggleExerciseDropdown}
        >
          <span class="nav-icon">🏋️</span>
          <span class="nav-text">Exercises</span>
          <span class="dropdown-arrow">▼</span>
        </button>
        
        <ul class="dropdown-menu" class:show={isExerciseDropdownOpen}>
          <li>
            <a 
              href="/exercises" 
              class="dropdown-link"
              class:active={currentPath === '/exercises'}
              onclick={closeMobileMenu}
            >
              📖 Exercise Database
            </a>
          </li>
          <li>
            <a 
              href="/exercises/create" 
              class="dropdown-link"
              class:active={currentPath === '/exercises/create'}
              onclick={closeMobileMenu}
            >
              ✏️ Neue Exercise
            </a>
          </li>
          <li class="dropdown-divider"></li>
          <li>
            <a 
              href="/exercises?muscle_group=Brust" 
              class="dropdown-link"
              onclick={closeMobileMenu}
            >
              🎯 Nach Muskelgruppe
            </a>
          </li>
        </ul>
      </li>

      <!-- Ziele Dropdown -->
      <li class="nav-item dropdown" class:open={isGoalsDropdownOpen}>
        <button 
          type="button"
          class="nav-link dropdown-toggle"
          class:active={isGoalsSection}
          onclick={toggleGoalsDropdown}
        >
          <span class="nav-icon">🎯</span>
          <span class="nav-text">Goals</span>
          <span class="dropdown-arrow">▼</span>
        </button>
        
        <ul class="dropdown-menu" class:show={isGoalsDropdownOpen}>
          <li>
            <a 
              href="/goals" 
              class="dropdown-link"
              class:active={currentPath === '/goals'}
              onclick={closeMobileMenu}
            >
              📋 Alle Ziele
            </a>
          </li>
          <li>
            <a 
              href="/goals/create" 
              class="dropdown-link"
              class:active={currentPath === '/goals/create'}
              onclick={closeMobileMenu}
            >
              ➕ Neues Ziel
            </a>
          </li>
          <li class="dropdown-divider"></li>
          <li>
            <a 
              href="/goals/stats" 
              class="dropdown-link"
              onclick={closeMobileMenu}
            >
              📊 Ziel-Statistiken
            </a>
          </li>
        </ul>
      </li>

      <!-- Statistics -->
      <li class="nav-item">
        <a 
          href="/stats" 
          class="nav-link"
          class:active={currentPath === '/stats'}
          onclick={closeMobileMenu}
        >
          <span class="nav-icon">📊</span>
          <span class="nav-text">Statistiken</span>
        </a>
      </li>

    </ul>

    <!-- Action Buttons -->
    <div class="nav-actions">
      
      <!-- Quick Add Button -->
      <div class="action-dropdown" class:open={isQuickAddOpen}>
        <button 
          type="button"
          class="action-btn quick-add-btn"
          onclick={toggleQuickAdd}
        >
          <span class="action-icon">⚡</span>
          <span class="action-text">Quick Add</span>
        </button>
        
        <ul class="action-menu" class:show={isQuickAddOpen}>
          <li>
            <a href="/workouts/create" class="action-link" onclick={closeMobileMenu}>
              💪 Neues Workout
            </a>
          </li>
          <li>
            <a href="/exercises/create" class="action-link" onclick={closeMobileMenu}>
              🏋️ Neue Exercise
            </a>
          </li>
          <li>
            <a href="/goals/create" class="action-link" onclick={closeMobileMenu}>
              🎯 Neues Ziel
            </a>
          </li>
          <li>
            <a href="/sessions/quick-start" class="action-link" onclick={closeMobileMenu}>
              🚀 Quick Workout
            </a>
          </li>
        </ul>
      </div>

      <!-- User Menu (für später) -->
      <button type="button" class="action-btn user-btn">
        <span class="action-icon">👤</span>
        <span class="action-text">Profil</span>
      </button>

    </div>

  </div>

  <!-- Mobile Overlay -->
  {#if isMobileMenuOpen}
    <div class="mobile-overlay" onclick={closeMobileMenu}></div>
  {/if}

</nav>

<script>
  /* 
    NAVIGATION COMPONENT - SVELTE 5 RUNES
    Zeigt moderne Component-Architektur und State Management
  */

  // SvelteKit Navigation Imports
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  /* 
    SVELTE 5 STATE MANAGEMENT
    Reactive State für Navigation-Interaktionen
  */
  let isMobileMenuOpen = $state(false);
  let isWorkoutDropdownOpen = $state(false);
  let isExerciseDropdownOpen = $state(false);
  let isGoalsDropdownOpen = $state(false);
  let isQuickAddOpen = $state(false);

  /* 
    DERIVED VALUES (Svelte 5)
    Berechnete Werte basierend auf aktueller Route
  */
  let currentPath = $derived($page.url.pathname);
  
  let isWorkoutSection = $derived(
    currentPath.startsWith('/workouts') || 
    currentPath.startsWith('/sessions')
  );
  
  let isExerciseSection = $derived(
    currentPath.startsWith('/exercises')
  );

  let isGoalsSection = $derived(
    currentPath.startsWith('/goals')
  );

  /* 
    NAVIGATION INTERACTION FUNCTIONS
    Event Handlers für Menu-Steuerung
  */

  // Mobile Menu Toggle
  function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    
    // Andere Dropdowns schließen
    if (isMobileMenuOpen) {
      isWorkoutDropdownOpen = false;
      isExerciseDropdownOpen = false;
      isGoalsDropdownOpen = false;
      isQuickAddOpen = false;
    }
    
    console.log('📱 Mobile Menu:', isMobileMenuOpen ? 'geöffnet' : 'geschlossen');
  }

  function closeMobileMenu() {
    isMobileMenuOpen = false;
    isWorkoutDropdownOpen = false;
    isExerciseDropdownOpen = false;
    isGoalsDropdownOpen = false;
    isQuickAddOpen = false;
  }

  // Dropdown Toggles
  function toggleWorkoutDropdown() {
    isWorkoutDropdownOpen = !isWorkoutDropdownOpen;
    
    // Andere Dropdowns schließen
    if (isWorkoutDropdownOpen) {
      isExerciseDropdownOpen = false;
      isGoalsDropdownOpen = false;
      isQuickAddOpen = false;
    }
  }

  function toggleExerciseDropdown() {
    isExerciseDropdownOpen = !isExerciseDropdownOpen;
    
    // Andere Dropdowns schließen
    if (isExerciseDropdownOpen) {
      isWorkoutDropdownOpen = false;
      isGoalsDropdownOpen = false;
      isQuickAddOpen = false;
    }
  }

  function toggleGoalsDropdown() {
    isGoalsDropdownOpen = !isGoalsDropdownOpen;
    
    // Andere Dropdowns schließen
    if (isGoalsDropdownOpen) {
      isWorkoutDropdownOpen = false;
      isExerciseDropdownOpen = false;
      isQuickAddOpen = false;
    }
  }

  function toggleQuickAdd() {
    isQuickAddOpen = !isQuickAddOpen;
    
    // Andere Dropdowns schließen
    if (isQuickAddOpen) {
      isWorkoutDropdownOpen = false;
      isExerciseDropdownOpen = false;
      isGoalsDropdownOpen = false;
    }
  }

  /* 
    NAVIGATION UTILITIES
    Helper Functions für Navigation
  */
  
  // Programmatische Navigation
  function navigateTo(path) {
    closeMobileMenu();
    goto(path);
  }

  // Keyboard Navigation
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  }

  /* 
    SVELTE 5 EFFECTS
    Side Effects für Navigation-Verhalten
  */
  
  // Route Change Effect
  $effect(() => {
    // Schließe Dropdowns bei Route-Wechsel
    if (currentPath) {
      closeMobileMenu();
      console.log('🧭 Navigation zu:', currentPath);
    }
  });

  // Keyboard Event Listener
  $effect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeydown);
      
      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    }
  });

  // Body Scroll Lock bei Mobile Menu
  $effect(() => {
    if (typeof document !== 'undefined') {
      if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      
      return () => {
        document.body.style.overflow = '';
      };
    }
  });
</script>

<style>
  /* 
    NAVIGATION STYLING
    Moderne Navigation Bar mit CSS Grid und Flexbox
  */
  
  .main-navigation {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
  }

  /* 
    NAVIGATION HEADER
    Logo und Mobile Toggle
  */
  .nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 64px;
  }

  .nav-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 1.2em;
    transition: transform 0.2s;
  }

  .nav-brand:hover {
    transform: scale(1.05);
  }

  .brand-icon {
    font-size: 1.5em;
  }

  .brand-text {
    font-family: 'Arial', sans-serif;
  }

  /* Mobile Toggle Button */
  .mobile-toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    gap: 3px;
  }

  .hamburger-line {
    width: 24px;
    height: 3px;
    background: white;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .mobile-open .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
  }

  .mobile-open .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .mobile-open .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }

  /* 
    NAVIGATION MENU
    Hauptnavigation und Links
  */
  .nav-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 0;
  }

  .nav-links {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    gap: 5px;
  }

  .nav-item {
    position: relative;
  }

  /* Navigation Links */
  .nav-link {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    color: rgba(255,255,255,0.9);
    text-decoration: none;
    border-radius: 6px;
    transition: all 0.2s;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.95em;
    white-space: nowrap;
  }

  .nav-link:hover {
    background: rgba(255,255,255,0.1);
    color: white;
  }

  .nav-link.active {
    background: rgba(255,255,255,0.2);
    color: white;
    font-weight: 600;
  }

  .nav-icon {
    font-size: 1.1em;
  }

  /* 
    DROPDOWN STYLING
    Erweiterte Dropdown-Menus
  */
  .dropdown-toggle {
    position: relative;
  }

  .dropdown-arrow {
    font-size: 0.8em;
    transition: transform 0.2s;
  }

  .dropdown.open .dropdown-arrow {
    transform: rotate(180deg);
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    min-width: 200px;
    list-style: none;
    margin: 8px 0 0 0;
    padding: 8px 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.2s;
    z-index: 100;
  }

  .dropdown-menu.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .dropdown-link {
    display: block;
    padding: 10px 16px;
    color: #333;
    text-decoration: none;
    transition: background 0.2s;
    font-size: 0.9em;
  }

  .dropdown-link:hover {
    background: #f8f9fa;
  }

  .dropdown-link.active {
    background: #667eea;
    color: white;
  }

  .dropdown-divider {
    height: 1px;
    background: #e9ecef;
    margin: 8px 0;
  }

  /* 
    ACTION BUTTONS
    Quick Actions und User Menu
  */
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .action-dropdown {
    position: relative;
  }

  .action-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    background: rgba(255,255,255,0.1);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9em;
    transition: all 0.2s;
  }

  .action-btn:hover {
    background: rgba(255,255,255,0.2);
    transform: translateY(-1px);
  }

  .quick-add-btn {
    background: #28a745;
  }

  .quick-add-btn:hover {
    background: #218838;
  }

  .action-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    min-width: 160px;
    list-style: none;
    margin: 8px 0 0 0;
    padding: 8px 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.2s;
    z-index: 100;
  }

  .action-dropdown.open .action-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .action-link {
    display: block;
    padding: 8px 12px;
    color: #333;
    text-decoration: none;
    transition: background 0.2s;
    font-size: 0.9em;
  }

  .action-link:hover {
    background: #f8f9fa;
  }

  /* 
    MOBILE RESPONSIVE DESIGN
    Mobile-optimierte Navigation
  */
  @media (max-width: 768px) {
    .mobile-toggle {
      display: flex;
    }

    .nav-menu {
      position: fixed;
      top: 64px;
      left: 0;
      width: 100%;
      height: calc(100vh - 64px);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      padding: 20px;
      transform: translateX(-100%);
      transition: transform 0.3s ease;
    }

    .nav-menu.open {
      transform: translateX(0);
    }

    .nav-links {
      flex-direction: column;
      width: 100%;
      gap: 0;
    }

    .nav-item {
      width: 100%;
    }

    .nav-link {
      width: 100%;
      padding: 16px 20px;
      border-radius: 8px;
      margin-bottom: 5px;
    }

    .dropdown-menu {
      position: static;
      opacity: 1;
      visibility: visible;
      transform: none;
      box-shadow: none;
      background: rgba(255,255,255,0.1);
      margin: 0;
      border-radius: 8px;
      overflow: hidden;
    }

    .dropdown-link {
      color: rgba(255,255,255,0.9);
      padding: 12px 24px;
    }

    .dropdown-link:hover {
      background: rgba(255,255,255,0.1);
    }

    .dropdown-link.active {
      background: rgba(255,255,255,0.2);
    }

    .nav-actions {
      width: 100%;
      justify-content: center;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.2);
    }

    .action-menu {
      position: static;
      opacity: 1;
      visibility: visible;
      transform: none;
      box-shadow: none;
      background: rgba(255,255,255,0.1);
      margin-top: 10px;
    }

    .action-link {
      color: rgba(255,255,255,0.9);
    }

    .action-link:hover {
      background: rgba(255,255,255,0.1);
    }
  }

  /* Mobile Overlay */
  .mobile-overlay {
    position: fixed;
    top: 64px;
    left: 0;
    width: 100%;
    height: calc(100vh - 64px);
    background: rgba(0,0,0,0.5);
    z-index: 999;
    display: none;
  }

  @media (max-width: 768px) {
    .mobile-overlay {
      display: block;
    }
  }

  /* 
    ACCESSIBILITY IMPROVEMENTS
    Bessere Zugänglichkeit
  */
  .nav-link:focus,
  .action-btn:focus {
    outline: 2px solid white;
    outline-offset: 2px;
  }

  /* 
    ANIMATIONS für bessere UX
  */
  .nav-item:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  @media (min-width: 769px) {
    .dropdown:hover .dropdown-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    .action-dropdown:hover .action-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
</style>