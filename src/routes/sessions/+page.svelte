<!-- 
  SESSIONS COMING SOON PAGE - SVELTE 5 RUNES VERSION
  Placeholder page für zukünftige Training Sessions Funktionalität
-->

<svelte:head>
  <title>Training Sessions - Coming Soon - Fitness Tracker</title>
  <meta name="description" content="Training Sessions Funktionalität kommt bald zum Fitness Tracker" />
</svelte:head>

<div class="coming-soon-page">
  
  <!-- Header Section -->
  <section class="hero-section">
    <div class="hero-content">
      <div class="icon-container">
        <span class="main-icon">🏃‍♂️</span>
        <span class="sparkle">✨</span>
      </div>
      <h1 class="page-title">Training Sessions</h1>
      <p class="subtitle">Diese Funktion ist in Entwicklung</p>
    </div>
  </section>

  <!-- Coming Soon Content -->
  <section class="content-section">
    <div class="container">
      
      <!-- Main Message -->
      <div class="message-card">
        <h2>🚧 Coming Soon!</h2>
        <p class="main-message">
          Die Training Sessions Funktionalität wird bald verfügbar sein. 
          Hier wirst du deine Workout-Sessions verfolgen, Fortschritte messen 
          und deine Trainingshistorie einsehen können.
        </p>
      </div>

      <!-- Planned Features -->
      <div class="features-preview">
        <h3>📋 Geplante Features:</h3>
        <div class="features-grid">
          
          <div class="feature-item">
            <div class="feature-icon">⏱️</div>
            <h4>Live Timer</h4>
            <p>Verfolge deine Workouts in Echtzeit mit integrierten Timern</p>
          </div>
          
          <div class="feature-item">
            <div class="feature-icon">📊</div>
            <h4>Progress Tracking</h4>
            <p>Dokumentiere Gewichte, Wiederholungen und persönliche Rekorde</p>
          </div>
          
          <div class="feature-item">
            <div class="feature-icon">📈</div>
            <h4>Session Analytics</h4>
            <p>Detaillierte Statistiken und Analysen deiner Trainingseinheiten</p>
          </div>
          
          <div class="feature-item">
            <div class="feature-icon">🏆</div>
            <h4>Achievements</h4>
            <p>Erreiche Meilensteine und sammle Erfolge für deine Fortschritte</p>
          </div>

        </div>
      </div>

      <!-- Development Roadmap -->
      <div class="roadmap-section">
        <h3>🗺️ Entwicklungs-Roadmap:</h3>
        <p class="roadmap-intro">
          Hier ist unsere detaillierte Entwicklungsplanung für die Training Sessions Funktionalität:
        </p>
        
        <div class="roadmap-categories">
          
          <!-- Short-term Goals -->
          <div class="roadmap-category">
            <button 
              class="category-header"
              onclick={() => toggleCategory('shortTerm')}
              aria-expanded={expandedCategories.shortTerm}
            >
              <span class="category-icon">🚀</span>
              <span class="category-title">Kurzfristig (Q1 2025)</span>
              <span class="toggle-icon">{expandedCategories.shortTerm ? '▼' : '▶'}</span>
            </button>
            {#if expandedCategories.shortTerm}
              <div class="category-content">
                <div class="todo-item completed">
                  <span class="todo-icon">✅</span>
                  <span>Grundlegende Session-Datenstruktur</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">⏳</span>
                  <span>Live Workout Timer Implementation</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">📝</span>
                  <span>Session Logging & Basic Tracking</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">💾</span>
                  <span>Session History Speicherung</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">📱</span>
                  <span>Mobile-optimierte Session UI</span>
                </div>
              </div>
            {/if}
          </div>

          <!-- Medium-term Goals -->
          <div class="roadmap-category">
            <button 
              class="category-header"
              onclick={() => toggleCategory('mediumTerm')}
              aria-expanded={expandedCategories.mediumTerm}
            >
              <span class="category-icon">📈</span>
              <span class="category-title">Mittelfristig (Q2 2025)</span>
              <span class="toggle-icon">{expandedCategories.mediumTerm ? '▼' : '▶'}</span>
            </button>
            {#if expandedCategories.mediumTerm}
              <div class="category-content">
                <div class="todo-item">
                  <span class="todo-icon">📊</span>
                  <span>Erweiterte Progress Analytics</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">🎯</span>
                  <span>Session-Goal Integration</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">📈</span>
                  <span>Detaillierte Statistiken & Charts</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">🏆</span>
                  <span>Achievement System</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">📋</span>
                  <span>Workout Templates für Sessions</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">⏱️</span>
                  <span>Rest Timer & Intervall Features</span>
                </div>
              </div>
            {/if}
          </div>

          <!-- Long-term Goals -->
          <div class="roadmap-category">
            <button 
              class="category-header"
              onclick={() => toggleCategory('longTerm')}
              aria-expanded={expandedCategories.longTerm}
            >
              <span class="category-icon">🌟</span>
              <span class="category-title">Langfristig (Q3-Q4 2025)</span>
              <span class="toggle-icon">{expandedCategories.longTerm ? '▼' : '▶'}</span>
            </button>
            {#if expandedCategories.longTerm}
              <div class="category-content">
                <div class="todo-item">
                  <span class="todo-icon">🤖</span>
                  <span>AI-powered Workout Suggestions</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">👥</span>
                  <span>Social Features & Session Sharing</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">📸</span>
                  <span>Exercise Form Video Integration</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">🏃‍♂️</span>
                  <span>Wearable Device Integration</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">📱</span>
                  <span>Offline Session Support</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">🎮</span>
                  <span>Gamification Features</span>
                </div>
              </div>
            {/if}
          </div>

          <!-- Technical Improvements -->
          <div class="roadmap-category">
            <button 
              class="category-header"
              onclick={() => toggleCategory('technical')}
              aria-expanded={expandedCategories.technical}
            >
              <span class="category-icon">⚙️</span>
              <span class="category-title">Technische Verbesserungen</span>
              <span class="toggle-icon">{expandedCategories.technical ? '▼' : '▶'}</span>
            </button>
            {#if expandedCategories.technical}
              <div class="category-content">
                <div class="todo-item completed">
                  <span class="todo-icon">✅</span>
                  <span>Svelte 5 Runes Migration</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">🔄</span>
                  <span>Real-time Data Synchronization</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">⚡</span>
                  <span>Performance Optimierungen</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">🔒</span>
                  <span>Enhanced Security Features</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">🧪</span>
                  <span>Comprehensive Test Coverage</span>
                </div>
                <div class="todo-item">
                  <span class="todo-icon">📱</span>
                  <span>PWA Features Implementation</span>
                </div>
              </div>
            {/if}
          </div>

        </div>

        <!-- Progress Indicator -->
        <div class="progress-indicator">
          <h4>🎯 Gesamtfortschritt</h4>
          <div class="progress-bar">
            <div class="progress-fill" style="width: {developmentProgress}%"></div>
          </div>
          <p class="progress-text">{developmentProgress}% abgeschlossen - Geschätzte Veröffentlichung: {estimatedRelease}</p>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="cta-section">
        <h3>🚀 Bereit für mehr?</h3>
        <p class="cta-text">
          In der Zwischenzeit kannst du deine Workouts und Übungen verwalten:
        </p>
        <div class="cta-buttons">
          <a href="/workouts" class="cta-btn primary">
            💪 Zu den Workouts
          </a>
          <a href="/exercises" class="cta-btn secondary">
            🏋️ Exercise Database
          </a>
          <a href="/goals" class="cta-btn secondary">
            🎯 Deine Ziele
          </a>
        </div>
      </div>

    </div>
  </section>

</div>

<script>
  /* 
    COMING SOON PAGE LOGIC - SVELTE 5 RUNES VERSION
    Enhanced with interactive roadmap functionality
  */
  
  // Simulate development progress (for demo purposes)
  let developmentProgress = $state(67); // 67% complete
  
  // Estimated release info
  let estimatedRelease = $state("Q3 2025");
  
  // Roadmap category expansion state using Svelte 5 runes
  let expandedCategories = $state({
    shortTerm: true,   // Show short-term by default
    mediumTerm: false,
    longTerm: false,
    technical: false
  });
  
  // Toggle function for roadmap categories
  function toggleCategory(categoryKey) {
    expandedCategories[categoryKey] = !expandedCategories[categoryKey];
  }
  
  /* 
    SVELTE 5 EFFECTS
    Logging für Analytics
  */
  $effect(() => {
    console.log('📄 Coming Soon Page: Training Sessions besucht');
    console.log('🚀 Development Progress:', developmentProgress + '%');
    console.log('🗺️ Expanded Categories:', Object.entries(expandedCategories)
      .filter(([key, value]) => value)
      .map(([key]) => key)
    );
  });
</script>

<style>
  /* 
    COMING SOON PAGE STYLING
    Moderne, ansprechende Placeholder-Page
  */
  
  .coming-soon-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Disable mobile browser color adjustments */
    -webkit-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* 
    HERO SECTION
  */
  .hero-section {
    padding: 80px 20px 60px 20px;
    text-align: center;
    color: white;
  }

  .hero-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .icon-container {
    position: relative;
    margin-bottom: 30px;
  }

  .main-icon {
    font-size: 4em;
    display: inline-block;
    animation: bounce 2s infinite;
  }

  .sparkle {
    position: absolute;
    top: -10px;
    right: -10px;
    font-size: 1.5em;
    animation: sparkle 1.5s infinite;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }

  @keyframes sparkle {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
  }

  .page-title {
    font-size: 3em;
    margin: 0 0 15px 0;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  }

  .subtitle {
    font-size: 1.3em;
    margin: 0;
    opacity: 0.9;
  }

  /* 
    CONTENT SECTION
  */
  .content-section {
    background: var(--bg-secondary);
    padding: 60px 20px;
    min-height: 60vh;
    /* Prevent mobile browser color adjustments */
    -webkit-color-adjust: exact;
    print-color-adjust: exact;
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
  }

  /* Message Card */
  .message-card {
    background: var(--card-bg);
    padding: 40px;
    border-radius: 12px;
    box-shadow: var(--shadow-lg);
    text-align: center;
    margin-bottom: 50px;
  }

  .message-card h2 {
    color: var(--primary-color);
    font-size: 2.2em;
    margin: 0 0 20px 0;
  }

  .main-message {
    font-size: 1.2em;
    line-height: 1.6;
    color: var(--text-secondary);
    margin: 0;
  }

  /* Features Preview */
  .features-preview {
    margin-bottom: 50px;
  }

  .features-preview h3 {
    text-align: center;
    color: var(--text-primary);
    font-size: 1.8em;
    margin-bottom: 30px;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
  }

  .feature-item {
    background: var(--card-bg);
    padding: 30px 20px;
    border-radius: 12px;
    box-shadow: var(--shadow-md);
    text-align: center;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .feature-item:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-xl);
  }

  .feature-icon {
    font-size: 2.5em;
    margin-bottom: 15px;
  }

  .feature-item h4 {
    color: var(--text-primary);
    margin: 0 0 10px 0;
    font-size: 1.3em;
  }

  .feature-item p {
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.5;
  }

  /* 
    ROADMAP SECTION STYLING
    Dark mode compatible with collapsible categories
  */
  .roadmap-section {
    margin-bottom: 50px;
  }

  .roadmap-section h3 {
    text-align: center;
    color: var(--text-primary);
    font-size: 1.8em;
    margin-bottom: 20px;
  }

  .roadmap-intro {
    text-align: center;
    color: var(--text-secondary);
    font-size: 1.1em;
    margin-bottom: 40px;
    line-height: 1.6;
  }

  .roadmap-categories {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
  }

  .roadmap-category {
    background: var(--card-bg);
    border-radius: 12px;
    box-shadow: var(--shadow-md);
    overflow: hidden;
    transition: box-shadow 0.2s;
  }

  .roadmap-category:hover {
    box-shadow: var(--shadow-lg);
  }

  .category-header {
    width: 100%;
    padding: 20px 25px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 1.2em;
    font-weight: bold;
    transition: all 0.2s;
  }

  .category-header:hover {
    background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
  }

  .category-header:focus {
    outline: 3px solid rgba(255,255,255,0.5);
    outline-offset: 2px;
  }

  .category-icon {
    font-size: 1.4em;
  }

  .category-title {
    flex: 1;
    text-align: left;
  }

  .toggle-icon {
    font-size: 0.9em;
    transition: transform 0.2s;
  }

  .category-content {
    padding: 25px;
    background: var(--card-bg);
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .todo-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 0;
    font-size: 1.05em;
    border-bottom: 1px solid #f0f0f0;
  }

  .todo-item:last-child {
    border-bottom: none;
  }

  .todo-icon {
    font-size: 1.2em;
    min-width: 24px;
  }

  .todo-item.completed {
    opacity: 0.8;
  }

  .todo-item.completed span:last-child {
    text-decoration: line-through;
    color: #888;
  }

  /* Progress Indicator */
  .progress-indicator {
    background: var(--card-bg);
    padding: 30px;
    border-radius: 12px;
    box-shadow: var(--shadow-md);
    text-align: center;
  }

  .progress-indicator h4 {
    color: var(--text-primary);
    margin: 0 0 20px 0;
    font-size: 1.4em;
  }

  .progress-bar {
    width: 100%;
    height: 12px;
    background: var(--bg-tertiary);
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 15px;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 6px;
    transition: width 0.5s ease-out;
  }

  .progress-text {
    color: var(--text-secondary);
    margin: 0;
    font-size: 1.1em;
  }

  /* Call to Action */
  .cta-section {
    background: var(--card-bg);
    padding: 40px;
    border-radius: 12px;
    box-shadow: var(--shadow-lg);
    text-align: center;
  }

  .cta-section h3 {
    color: var(--text-primary);
    margin: 0 0 15px 0;
    font-size: 1.8em;
  }

  .cta-text {
    font-size: 1.2em;
    color: var(--text-secondary);
    margin: 0 0 30px 0;
  }

  .cta-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .cta-btn {
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: bold;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .cta-btn.primary {
    background: var(--primary-color);
    color: white;
  }

  .cta-btn.primary:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
  }

  .cta-btn.secondary {
    background: var(--bg-secondary);
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
  }

  .cta-btn.secondary:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
  }

  /* 
    RESPONSIVE DESIGN
  */
  @media (max-width: 768px) {
    .hero-section {
      padding: 60px 15px 40px 15px;
    }

    .page-title {
      font-size: 2.2em;
    }

    .subtitle {
      font-size: 1.1em;
    }

    .content-section {
      padding: 40px 15px;
      /* Force correct background on mobile */
      background: var(--bg-secondary) !important;
      /* Alternative fallback for mobile browsers */
      background: #f8f9fa !important;
    }

    .message-card {
      padding: 30px 20px;
      /* Ensure white background on mobile */
      background: var(--card-bg) !important;
    }

    .message-card h2 {
      font-size: 1.8em;
    }

    .main-message {
      font-size: 1.1em;
    }

    .features-grid {
      grid-template-columns: 1fr;
    }

    /* Force correct backgrounds on mobile */
    .feature-item,
    .roadmap-category,
    .category-content,
    .progress-indicator,
    .cta-section {
      background: var(--card-bg) !important;
      /* Mobile fallback */
      background: #ffffff !important;
    }

    /* Ensure proper text colors on mobile */
    .features-preview h3,
    .roadmap-section h3,
    .feature-item h4,
    .progress-indicator h4,
    .cta-section h3 {
      color: #333333 !important;
    }

    .feature-item p,
    .main-message,
    .roadmap-intro,
    .cta-text,
    .progress-text {
      color: #666666 !important;
    }

    /* Roadmap responsive adjustments */
    .roadmap-section h3 {
      font-size: 1.6em;
    }

    .roadmap-intro {
      font-size: 1em;
      padding: 0 10px;
    }

    .category-header {
      padding: 15px 20px;
      font-size: 1.1em;
    }

    .category-content {
      padding: 20px;
    }

    .todo-item {
      font-size: 1em;
      padding: 10px 0;
    }

    .progress-indicator {
      padding: 25px 20px;
    }

    .progress-indicator h4 {
      font-size: 1.2em;
    }

    .progress-text {
      font-size: 1em;
    }

    .cta-buttons {
      flex-direction: column;
      align-items: center;
    }

    .cta-btn {
      width: 100%;
      max-width: 300px;
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .category-header {
      font-size: 1em;
      gap: 10px;
    }

    .category-icon {
      font-size: 1.2em;
    }

    .todo-item {
      gap: 8px;
      font-size: 0.95em;
    }

    .progress-bar {
      height: 10px;
    }

    /* Mobile specific background fixes */
    .content-section {
      background: #f8f9fa !important;
    }

    .message-card,
    .feature-item,
    .roadmap-category,
    .category-content,
    .progress-indicator,
    .cta-section {
      background: #ffffff !important;
    }
  }

  /* 
    ACCESSIBILITY IMPROVEMENTS
  */
  .cta-btn:focus,
  .category-header:focus {
    outline: 3px solid #667eea;
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .main-icon,
    .sparkle {
      animation: none;
    }
    
    .feature-item:hover,
    .roadmap-category:hover {
      transform: none;
    }

    .category-content {
      animation: none;
    }

    .progress-fill {
      transition: none;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    .category-header {
      border: 2px solid currentColor;
    }

    .todo-item {
      border-bottom: 2px solid currentColor;
    }

    .progress-bar {
      border: 1px solid currentColor;
    }
  }

  /* Focus indicators for keyboard navigation */
  .todo-item:focus-within {
    background: rgba(102, 126, 234, 0.1);
    border-radius: 4px;
  }
</style>
