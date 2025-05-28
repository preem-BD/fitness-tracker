<!-- 
  MAIN APPLICATION LAYOUT - SVELTE 5 RUNES VERSION
  Zentrales Layout für die gesamte Anwendung
  Zeigt SvelteKit Layout-System, Global Styling und Component Integration
-->

<script>
  /* 
    GLOBAL LAYOUT LOGIC
    Svelte 5 Runes für App-weite Funktionalität
  */

  // Component Imports
  import Navigation from '$lib/components/Navigation.svelte';
  import '$lib/styles/global.css'; // Global Styles Import

  // SvelteKit Imports
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  /* 
    SVELTE 5 STATE für Layout-Features
    App-weite State-Verwaltung
  */
  let isLoading = $state(false);
  let showScrollToTop = $state(false);
  let lastScrollY = $state(0);

  /* 
    DERIVED VALUES (Svelte 5)
    Berechnete Werte für Layout-Verhalten
  */
  let currentRoute = $derived($page.url.pathname);
  let pageTitle = $derived(getPageTitle(currentRoute));
  let isHomePage = $derived(currentRoute === '/');

  /* 
    LAYOUT UTILITY FUNCTIONS
    Helper Functions für Layout-Verhalten
  */
  
  // Page Title basierend auf Route
  function getPageTitle(route) {
    const titles = {
      '/': 'Dashboard',
      '/workouts': 'Workouts',
      '/workouts/create': 'Neues Workout',
      '/exercises': 'Exercise Database',
      '/exercises/create': 'Neue Exercise',
      '/goals': 'Meine Ziele',
      '/stats': 'Statistiken',
      '/sessions': 'Training Sessions'
    };
    
    // Dynamic routes (z.B. /workouts/123)
    if (route.startsWith('/workouts/') && route !== '/workouts/create') {
      return 'Workout Details';
    }
    if (route.startsWith('/exercises/') && route !== '/exercises/create') {
      return 'Exercise Details';
    }
    
    return titles[route] || 'Fitness Tracker';
  }

  // Scroll to Top Function
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Handle Scroll Events
  function handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Show/Hide Scroll to Top Button
    showScrollToTop = currentScrollY > 300;
    
    // Track scroll direction für Header-Verhalten
    lastScrollY = currentScrollY;
  }

  // Keyboard Shortcuts
  function handleKeydown(event) {
    // Ctrl+/ oder Cmd+/ für Suche (für später)
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
      event.preventDefault();
      console.log('🔍 Global Search aktiviert (Feature kommt später)');
    }
    
    // Escape für Modal schließen
    if (event.key === 'Escape') {
      // Schließe alle offenen Modals/Dropdowns
      console.log('⎋ Escape gedrückt - Schließe UI-Elemente');
    }
  }

  /* 
    SVELTE 5 EFFECTS
    Lifecycle und Event Management
  */
  
  // Scroll Event Listener
  $effect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      window.addEventListener('keydown', handleKeydown);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('keydown', handleKeydown);
      };
    }
  });

  // Route Change Analytics
  $effect(() => {
    if (currentRoute) {
      console.log('🧭 Route Changed:', {
        from: lastScrollY,
        to: currentRoute,
        timestamp: new Date().toISOString()
      });
      
      // Simuliert Analytics Tracking
      // analytics.track('page_view', { page: currentRoute });
    }
  });

  // Page Loading State
  $effect(() => {
    // Simuliert Loading State bei Route Changes
    isLoading = true;
    
    const timer = setTimeout(() => {
      isLoading = false;
    }, 200);
    
    return () => clearTimeout(timer);
  });
</script>

<!-- 
  GLOBAL SEO HEAD
  Meta Tags für alle Seiten
-->
<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Dein persönlicher Fitness Tracker für Workouts, Exercises und Trainingsziele">
  <meta name="keywords" content="Fitness, Workout, Exercise, Training, Gym, Krafttraining">
  <meta name="author" content="Fitness Tracker App">
  
  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="Fitness Tracker - {pageTitle}">
  <meta property="og:description" content="Verwalte deine Workouts und Exercises professionell">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://fitness-tracker.app{currentRoute}">
  
  <!-- Theme Color -->
  <meta name="theme-color" content="#667eea">
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</svelte:head>

<!-- 
  MAIN APPLICATION STRUCTURE
  Layout mit Navigation, Content und Footer
-->
<div class="app-layout">
  
  <!-- 
    NAVIGATION COMPONENT
    Zentrale Navigation für alle Seiten
  -->
  <Navigation />

  <!-- 
    LOADING INDICATOR
    Zeigt Loading State bei Route Changes
  -->
  {#if isLoading}
    <div class="loading-bar">
      <div class="loading-progress"></div>
    </div>
  {/if}

  <!-- 
    MAIN CONTENT AREA
    Hier wird der Page-Content gerendert
  -->
  <main class="main-content" class:home-page={isHomePage}>
    
    <!-- 
      PAGE CONTENT SLOT
      SvelteKit rendert hier automatisch die jeweilige Page
    -->
    <div class="content-wrapper">
      <slot />
    </div>

  </main>

  <!-- 
    FOOTER COMPONENT
    App-Footer mit Links und Informationen
  -->
  <footer class="app-footer">
    <div class="footer-content">
      
      <!-- Footer Links -->
      <div class="footer-section">
        <h3>💪 Fitness Tracker</h3>
        <p>Deine professionelle Trainings-App</p>
        <div class="footer-social">
          <a href="#" class="social-link">📧 Kontakt</a>
          <a href="#" class="social-link">🐙 GitHub</a>
          <a href="#" class="social-link">📱 App Store</a>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="footer-section">
        <h4>🔗 Quick Links</h4>
        <ul class="footer-links">
          <li><a href="/workouts">Workouts</a></li>
          <li><a href="/exercises">Exercises</a></li>
          <li><a href="/goals">Ziele</a></li>
          <li><a href="/stats">Statistiken</a></li>
        </ul>
      </div>

      <!-- Features -->
      <div class="footer-section">
        <h4>✨ Features</h4>
        <ul class="footer-links">
          <li><a href="/workouts/create">Workout erstellen</a></li>
          <li><a href="/exercises/create">Exercise hinzufügen</a></li>
          <li><a href="/sessions">Training Sessions</a></li>
          <li><a href="/goals">Ziele setzen</a></li>
        </ul>
      </div>

      <!-- App Info -->
      <div class="footer-section">
        <h4>ℹ️ App Info</h4>
        <ul class="footer-links">
          <li><a href="/about">Über uns</a></li>
          <li><a href="/privacy">Datenschutz</a></li>
          <li><a href="/terms">AGB</a></li>
          <li><a href="/help">Hilfe</a></li>
        </ul>
      </div>

    </div>

    <!-- Footer Bottom -->
    <div class="footer-bottom">
      <p>&copy; 2024 Fitness Tracker. Erstellt mit SvelteKit 💻</p>
      <p class="tech-stack">
        <span class="tech-badge">Svelte 5</span>
        <span class="tech-badge">SvelteKit</span>
        <span class="tech-badge">MongoDB</span>
        <span class="tech-badge">CSS Grid</span>
      </p>
    </div>
    
  </footer>

  <!-- 
    SCROLL TO TOP BUTTON
    Floating Action Button für bessere UX
  -->
  {#if showScrollToTop}
    <button 
      type="button"
      class="scroll-to-top"
      onclick={scrollToTop}
      aria-label="Nach oben scrollen"
    >
      ⬆️
    </button>
  {/if}

  <!-- 
    GLOBAL NOTIFICATIONS AREA
    Für Toast Messages, Alerts etc. (für später)
  -->
  <div id="notifications" class="notifications-container">
    <!-- Hier werden Toast Messages gerendert -->
  </div>

</div>

<style>
  /* 
    GLOBAL LAYOUT STYLING
    CSS Grid Layout für die gesamte App-Struktur
  */
  
  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f8f9fa;
    color: #333;
    line-height: 1.6;
  }

  .app-layout {
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    min-height: 100vh;
    width: 100%;
  }

  /* 
    LOADING INDICATOR
    Top Loading Bar für Route Changes
  */
  .loading-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: rgba(102, 126, 234, 0.2);
    z-index: 9999;
  }

  .loading-progress {
    height: 100%;
    background: linear-gradient(90deg, #667eea, #764ba2);
    border-radius: 0 3px 3px 0;
    animation: loading-progress 0.2s ease-out forwards;
  }

  @keyframes loading-progress {
    from { width: 0; }
    to { width: 100%; }
  }

  /* 
    MAIN CONTENT AREA
    Responsive Content Container
  */
  .main-content {
    width: 100%;
    min-height: calc(100vh - 64px - 200px); /* Navigation height - Footer height */
    background: #f8f9fa;
  }

  .main-content.home-page {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  }

  .content-wrapper {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(10px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  /* 
    FOOTER STYLING
    Grid-basiertes Footer Layout
  */
  .app-footer {
    background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    color: white;
    margin-top: auto;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }

  .footer-section h3 {
    margin: 0 0 15px 0;
    font-size: 1.3em;
    color: #3498db;
  }

  .footer-section h4 {
    margin: 0 0 12px 0;
    font-size: 1.1em;
    color: #ecf0f1;
  }

  .footer-section p {
    margin: 0 0 15px 0;
    color: #bdc3c7;
    line-height: 1.6;
  }

  /* Footer Links */
  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-links li {
    margin-bottom: 8px;
  }

  .footer-links a {
    color: #bdc3c7;
    text-decoration: none;
    transition: color 0.2s;
    font-size: 0.95em;
  }

  .footer-links a:hover {
    color: #3498db;
  }

  /* Social Links */
  .footer-social {
    display: flex;
    gap: 15px;
    margin-top: 15px;
  }

  .social-link {
    color: #bdc3c7;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 6px;
    background: rgba(255,255,255,0.1);
    transition: all 0.2s;
    font-size: 0.9em;
  }

  .social-link:hover {
    background: rgba(52, 152, 219, 0.2);
    color: #3498db;
    transform: translateY(-2px);
  }

  /* Footer Bottom */
  .footer-bottom {
    border-top: 1px solid #34495e;
    padding: 20px;
    text-align: center;
    background: rgba(0,0,0,0.2);
  }

  .footer-bottom p {
    margin: 5px 0;
    color: #95a5a6;
    font-size: 0.9em;
  }

  .tech-stack {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 10px;
  }

  .tech-badge {
    background: rgba(102, 126, 234, 0.2);
    color: #667eea;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.8em;
    font-weight: 500;
  }

  /* 
    SCROLL TO TOP BUTTON
    Floating Action Button
  */
  .scroll-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2em;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
    z-index: 1000;
    animation: slideInUp 0.3s ease-out;
  }

  .scroll-to-top:hover {
    background: #5a67d8;
    transform: scale(1.1) translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* 
    NOTIFICATIONS CONTAINER
    Für Toast Messages (Global Positioning)
  */
  .notifications-container {
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
    pointer-events: none;
  }

  /* 
    RESPONSIVE DESIGN
    Mobile-optimierte Layouts
  */
  @media (max-width: 768px) {
    .content-wrapper {
      padding: 15px;
    }

    .footer-content {
      grid-template-columns: 1fr;
      gap: 20px;
      padding: 30px 20px 15px;
    }

    .footer-social {
      justify-content: center;
    }

    .tech-stack {
      margin-top: 15px;
    }

    .scroll-to-top {
      bottom: 20px;
      right: 20px;
      width: 45px;
      height: 45px;
      font-size: 1.1em;
    }
  }

  /* 
    ACCESSIBILITY IMPROVEMENTS
    Bessere Zugänglichkeit
  */
  .scroll-to-top:focus {
    outline: 2px solid white;
    outline-offset: 2px;
  }

  /* 
    PRINT STYLES
    Optimierung für Drucken
  */
  @media print {
    .app-footer,
    .scroll-to-top,
    .notifications-container {
      display: none;
    }
    
    .main-content {
      min-height: auto;
    }
  }
</style>