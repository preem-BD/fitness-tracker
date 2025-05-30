<!-- 
  LANDING PAGE - SVELTE 5 RUNES VERSION
  Moderne, professionelle Homepage im Stil der anderen Pages
-->

<svelte:head>
  <title>Fitness Tracker - Dein persönlicher Trainingsbegleiter</title>
  <meta name="description" content="Verwalte deine Workouts, tracke deine Goals und entdecke neue Exercises mit dem Fitness Tracker.">
</svelte:head>

<div class="landing-page">
  
  <!-- HERO SECTION -->
  <section class="hero-section">
    <div class="container">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">
            <span class="hero-icon">💪</span>
            Fitness Tracker
          </h1>
          <p class="hero-subtitle">
            Dein persönlicher Trainingsbegleiter für mehr Erfolg im Fitness
          </p>
          <p class="hero-description">
            Verwalte deine Workouts, tracke deine Goals und entdecke neue Exercises. 
            Alles an einem Ort für maximalen Trainingserfolg.
          </p>
          
          <div class="hero-actions">
            <a href="/workouts" class="btn btn-primary btn-lg">
              <span class="btn-icon">💪</span>
              Workouts starten
            </a>
            <a href="/goals" class="btn btn-outline-light btn-lg">
              <span class="btn-icon">🎯</span>
              Goals setzen
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURES SECTION -->
  <section class="features-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">✨ Deine Fitness-Features</h2>
        <p class="section-subtitle">
          Alles was du für erfolgreiches Training brauchst
        </p>
      </div>
      
      <div class="features-grid">
        
        <!-- Workouts Feature -->
        <div class="feature-card">
          <div class="feature-icon">💪</div>
          <h3 class="feature-title">Workouts</h3>
          <p class="feature-description">
            Erstelle und verwalte deine persönlichen Trainingspläne. 
            Von Anfänger bis Profi - für jeden das Richtige.
          </p>
          <div class="feature-stats">
            <span class="stat-item">📋 Strukturierte Pläne</span>
            <span class="stat-item">⏱️ Zeiterfassung</span>
            <span class="stat-item">🎯 Verschiedene Levels</span>
          </div>
          <div class="feature-actions">
            <a href="/workouts" class="btn btn-primary">
              Workouts erkunden
            </a>
            <a href="/workouts/create" class="btn btn-outline-primary">
              Neues Workout
            </a>
          </div>
        </div>

        <!-- Goals Feature -->
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3 class="feature-title">Goals</h3>
          <p class="feature-description">
            Setze dir messbare Fitness-Ziele und verfolge deinen Fortschritt. 
            Motivation durch klare Zielvorgaben.
          </p>
          <div class="feature-stats">
            <span class="stat-item">📈 Fortschritt tracken</span>
            <span class="stat-item">🏆 Ziele erreichen</span>
            <span class="stat-item">📊 Statistiken</span>
          </div>
          <div class="feature-actions">
            <a href="/goals" class="btn btn-primary">
              Goals anzeigen
            </a>
            <a href="/goals/create" class="btn btn-outline-primary">
              Neues Goal
            </a>
          </div>
        </div>

        <!-- Exercises Feature -->
        <div class="feature-card">
          <div class="feature-icon">🏋️</div>
          <h3 class="feature-title">Exercises</h3>
          <p class="feature-description">
            Durchsuche unsere umfangreiche Exercise-Datenbank. 
            Detaillierte Anleitungen für perfekte Ausführung.
          </p>
          <div class="feature-stats">
            <span class="stat-item">📖 Exercise-Datenbank</span>
            <span class="stat-item">🎯 Nach Muskelgruppen</span>
            <span class="stat-item">📝 Detaillierte Infos</span>
          </div>
          <div class="feature-actions">
            <a href="/exercises" class="btn btn-primary">
              Exercises entdecken
            </a>
            <a href="/exercises/create" class="btn btn-outline-primary">
              Exercise hinzufügen
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- QUICK STATS SECTION -->
  <section class="stats-section">
    <div class="container">
      <div class="stats-header">
        <h2 class="stats-title">📊 Deine Fitness im Überblick</h2>
        <p class="stats-subtitle">Behalte den Überblick über deinen Trainingsfortschritt</p>
      </div>
      
      <div class="stats-grid">        <div class="stat-card">
          <div class="stat-icon">💪</div>
          <div class="stat-info">
            <div class="stat-number">{workoutsCount}</div>
            <div class="stat-label">Workouts verfügbar</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-info">
            <div class="stat-number">{goalsCount}</div>
            <div class="stat-label">Goals gesetzt</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">🏋️</div>
          <div class="stat-info">
            <div class="stat-number">{exercisesCount}</div>
            <div class="stat-label">Exercises verfügbar</div>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <div class="stat-info">
            <div class="stat-number">100%</div>
            <div class="stat-label">Motivation</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- QUICK ACCESS SECTION -->
  <section class="quick-access-section">
    <div class="container">
      <div class="quick-access-header">
        <h2 class="section-title">⚡ Quick Start</h2>
        <p class="section-subtitle">Sofort loslegen mit deinem Training</p>
      </div>
      
      <div class="quick-access-grid">
        
        <div class="quick-card">
          <div class="quick-icon">🚀</div>
          <h3 class="quick-title">Workout starten</h3>
          <p class="quick-description">Wähle ein Workout und starte sofort dein Training</p>
          <a href="/workouts" class="btn btn-primary">Workout wählen</a>
        </div>
        
        <div class="quick-card">
          <div class="quick-icon">➕</div>
          <h3 class="quick-title">Neues Goal</h3>
          <p class="quick-description">Setze dir ein neues Fitness-Ziel und verfolge deinen Fortschritt</p>
          <a href="/goals/create" class="btn btn-success">Goal erstellen</a>
        </div>
        
        <div class="quick-card">
          <div class="quick-icon">🔍</div>
          <h3 class="quick-title">Exercise suchen</h3>
          <p class="quick-description">Finde die perfekte Übung für dein Training</p>
          <a href="/exercises" class="btn btn-info">Exercise finden</a>
        </div>
          <div class="quick-card">
          <div class="quick-icon">📊</div>
          <h3 class="quick-title">Statistiken</h3>
          <p class="quick-description">Schaue dir deinen Fortschritt und deine Erfolge an</p>
          <a href="/stats" class="btn btn-warning">Stats anzeigen</a>
        </div>
        
      </div>
    </div>
  </section>

  <!-- CALL TO ACTION SECTION -->
  <section class="cta-section">
    <div class="container">
      <div class="cta-content">
        <h2 class="cta-title">Bereit für dein nächstes Workout?</h2>
        <p class="cta-description">
          Starte jetzt durch und erreiche deine Fitness-Ziele mit dem Fitness Tracker.
        </p>
        <div class="cta-actions">
          <a href="/workouts/create" class="btn btn-primary btn-lg">
            <span class="btn-icon">💪</span>
            Workout erstellen
          </a>
          <a href="/goals/create" class="btn btn-outline-light btn-lg">
            <span class="btn-icon">🎯</span>
            Goal setzen
          </a>
        </div>
      </div>
    </div>
  </section>

</div>

<script>
  /* 
    LANDING PAGE INTERAKTIONEN
    Svelte 5 Runes für moderne Interaktivität
  */
  
  import { onMount } from 'svelte';
  
  // Svelte 5 Runes State
  let workoutsCount = $state('-');
  let goalsCount = $state('-');
  let exercisesCount = $state('-');
  let isLoading = $state(true);
  
  // Animiere Statistiken beim Laden
  onMount(() => {
    // Simuliere das Laden von Statistiken
    setTimeout(() => {
      workoutsCount = '12';
      goalsCount = '8';
      exercisesCount = '50+';
      isLoading = false;
    }, 500);
    
    // Console log für Page View
    console.log('🏠 Landing Page loaded');
    console.log('🎯 User ready to start fitness journey');
  });
</script>

<style>
  /* 
    LANDING PAGE STYLING
    Modernes, professionelles Design konsistent mit anderen Pages
  */
  
  .landing-page {
    min-height: 100vh;
  }
  /* HERO SECTION */
  .hero-section {
    background: var(--gradient-primary);
    color: white;
    padding: 4rem 0;
    text-align: center;
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .hero-icon {
    font-size: 3rem;
  }

  .hero-subtitle {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    opacity: 0.9;
  }

  .hero-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    opacity: 0.8;
    line-height: 1.6;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  /* FEATURES SECTION */
  .features-section {
    padding: 4rem 0;
    background: var(--bg-secondary);
  }

  .section-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: 2.5rem;
    font-weight: bold;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .section-subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin: 0;
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  .feature-card {
    background: var(--bg-primary);
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 8px 32px var(--shadow-color);
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
  }

  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px var(--shadow-color);
  }

  .feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
  }

  .feature-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .feature-description {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .feature-stats {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
  .stat-item {
    font-size: 0.9rem;
    color: var(--text-secondary);
    background: var(--bg-secondary);
    padding: 0.5rem;
    border-radius: 6px;
  }

  .feature-actions {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  /* STATS SECTION */
  .stats-section {
    background: var(--gradient-secondary);
    color: white;
    padding: 3rem 0;
  }

  .stats-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .stats-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .stats-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  .stat-card {
    background: rgba(255,255,255,0.1);
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
  }

  .stat-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    display: block;
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    opacity: 0.9;
    font-size: 0.9rem;
  }
  /* QUICK ACCESS SECTION */
  .quick-access-section {
    padding: 4rem 0;
    background: var(--bg-primary);
  }

  .quick-access-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .quick-access-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  .quick-card {
    background: var(--bg-secondary);
    padding: 1.5rem;
    border-radius: 12px;
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
  }

  .quick-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px var(--shadow-color);
  }

  .quick-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: block;
  }

  .quick-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .quick-description {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 1rem;
    line-height: 1.5;
  }
  /* CTA SECTION */
  .cta-section {
    background: var(--gradient-warm);
    color: white;
    padding: 3rem 0;
    text-align: center;
  }

  .cta-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .cta-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .cta-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    line-height: 1.6;
  }

  .cta-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  /* BUTTONS */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.95rem;
  }

  .btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .btn-lg {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
  .btn-primary {
    background: var(--primary-color);
    color: white;
  }

  .btn-primary:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
  }

  .btn-success {
    background: var(--success-color);
    color: white;
  }
  .btn-success:hover {
    background: var(--success-color);
    transform: translateY(-2px);
  }

  .btn-info {
    background: var(--info-color);
    color: white;
  }

  .btn-info:hover {
    background: var(--info-color);
    transform: translateY(-2px);
  }

  .btn-warning {
    background: var(--warning-color);
    color: white;
  }

  .btn-warning:hover {
    background: var(--warning-color);
    transform: translateY(-2px);
  }
  .btn-outline-primary {
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
  }

  .btn-outline-primary:hover {
    background: var(--primary-color);
    color: white;
  }

  .btn-outline-light {
    background: transparent;
    color: white;
    border: 2px solid rgba(255,255,255,0.5);
  }

  .btn-outline-light:hover {
    background: rgba(255,255,255,0.1);
    border-color: white;
  }

  .btn-icon {
    font-size: 1.1em;
  }

  /* RESPONSIVE DESIGN */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
      flex-direction: column;
      gap: 0.5rem;
    }

    .hero-actions {
      flex-direction: column;
      align-items: center;
    }

    .features-grid {
      grid-template-columns: 1fr;
      padding: 0 1rem;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .quick-access-grid {
      grid-template-columns: 1fr;
      padding: 0 1rem;
    }

    .cta-title {
      font-size: 2rem;
    }

    .cta-actions {
      flex-direction: column;
      align-items: center;
    }

    .section-title {
      font-size: 2rem;
    }
  }

  /* CONTAINER */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* ANIMATIONS */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .feature-card,
  .quick-card,
  .stat-card {
    animation: fadeInUp 0.6s ease-out;
  }
</style>