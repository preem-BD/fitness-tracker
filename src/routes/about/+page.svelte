<!-- 
  ÜBER UNS SEITE
  Informationen über das Fitness Tracker Projekt
-->

<svelte:head>
  <title>Über uns - Fitness Tracker</title>
  <meta name="description" content="Erfahre mehr über das Fitness Tracker Projekt und das Entwicklerteam.">
</svelte:head>

<div class="about-page">
  <div class="container">
    
    <!-- Header Section -->
    <div class="page-header">
      <h1 class="page-title">
        <span class="page-icon">ℹ️</span>
        Über uns
      </h1>
      <p class="page-subtitle">
        Das Fitness Tracker Projekt - Moderne Trainings-App mit SvelteKit
      </p>
    </div>

    <!-- Project Info -->
    <section class="content-section">
      <div class="content-card">
        <h2 class="section-title">
          <span class="section-icon">💪</span>
          Das Projekt
        </h2>
        <p class="section-text">
          Fitness Tracker ist eine moderne, vollständig responsive Web-Anwendung für das Management 
          von Workouts, Trainingszielen und Exercise-Datenbanken. Das Projekt demonstriert moderne 
          Web-Entwicklung mit den neuesten Technologien.
        </p>
        
        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-icon">🏋️</span>
            <span class="feature-text">Workout-Management mit Sessions</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">🎯</span>
            <span class="feature-text">Goal-Tracking mit Progress-Monitoring</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📖</span>
            <span class="feature-text">Exercise-Datenbank mit Kategorien</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">📊</span>
            <span class="feature-text">Statistische Auswertungen</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology Stack -->
    <section class="content-section">
      <div class="content-card">
        <h2 class="section-title">
          <span class="section-icon">🛠️</span>
          Technologie Stack
        </h2>
        <p class="section-text">
          Das Projekt nutzt modernste Web-Technologien für optimale Performance und Entwicklererfahrung:
        </p>
        
        <!-- Interactive Tech Tabs -->
        <div class="tech-tabs">
          <div class="tab-buttons">
            <button 
              class="tab-button" 
              class:active={activeTab === 'frontend'}
              onclick={() => setActiveTab('frontend')}
            >
              Frontend
            </button>
            <button 
              class="tab-button" 
              class:active={activeTab === 'backend'}
              onclick={() => setActiveTab('backend')}
            >
              Backend
            </button>
            <button 
              class="tab-button" 
              class:active={activeTab === 'tools'}
              onclick={() => setActiveTab('tools')}
            >
              Tools
            </button>
          </div>
          
          <div class="tab-content">
            {#if activeTab === 'frontend'}
              <div class="tech-grid">
                <div class="tech-item">
                  <div class="tech-badge">Svelte 5</div>
                  <p class="tech-description">Neueste Version mit Runes für reaktive State-Verwaltung</p>
                </div>
                <div class="tech-item">
                  <div class="tech-badge">SvelteKit</div>
                  <p class="tech-description">Full-Stack Framework mit Server-Side Rendering</p>
                </div>
                <div class="tech-item">
                  <div class="tech-badge">CSS Grid</div>
                  <p class="tech-description">Modernes Layout-System für responsive Designs</p>
                </div>
                <div class="tech-item">
                  <div class="tech-badge">TypeScript</div>
                  <p class="tech-description">Typsicherheit für bessere Entwicklererfahrung</p>
                </div>
              </div>
            {/if}
            
            {#if activeTab === 'backend'}
              <div class="tech-grid">
                <div class="tech-item">
                  <div class="tech-badge">MongoDB</div>
                  <p class="tech-description">NoSQL-Datenbank für flexible Datenstrukturen</p>
                </div>
                <div class="tech-item">
                  <div class="tech-badge">Node.js</div>
                  <p class="tech-description">JavaScript Runtime für Server-Side Logic</p>
                </div>
                <div class="tech-item">
                  <div class="tech-badge">API Routes</div>
                  <p class="tech-description">RESTful APIs mit SvelteKit Server Functions</p>
                </div>
                <div class="tech-item">
                  <div class="tech-badge">Mongoose</div>
                  <p class="tech-description">Elegant MongoDB Object Modeling</p>
                </div>
              </div>
            {/if}
            
            {#if activeTab === 'tools'}
              <div class="tech-grid">
                <div class="tech-item">
                  <div class="tech-badge">Vite</div>
                  <p class="tech-description">Schneller Build-Tool und Dev-Server</p>
                </div>
                <div class="tech-item">
                  <div class="tech-badge">ESLint</div>
                  <p class="tech-description">Code-Qualität und Konsistenz</p>
                </div>
                <div class="tech-item">
                  <div class="tech-badge">Git</div>
                  <p class="tech-description">Versionskontrolle und Collaboration</p>
                </div>
                <div class="tech-item">
                  <div class="tech-badge">Netlify</div>
                  <p class="tech-description">Deployment und Hosting Platform</p>
                </div>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </section>

    <!-- Development -->
    <section class="content-section">
      <div class="content-card">
        <h2 class="section-title">
          <span class="section-icon">👨‍💻</span>
          Entwicklung
        </h2>
        <p class="section-text">
          Dieses Projekt wurde als Showcase für moderne Web-Entwicklung mit Svelte 5 und SvelteKit entwickelt. 
          Es zeigt Best Practices für Full-Stack JavaScript-Anwendungen.
        </p>
        
        <div class="development-info">
          <div class="info-item">
            <strong>Entwicklungszeit:</strong> Kontinuierliche Entwicklung seit 2024
          </div>
          <div class="info-item">
            <strong>Code-Qualität:</strong> TypeScript, ESLint, moderne Standards
          </div>
          <div class="info-item">
            <strong>Responsive Design:</strong> Mobile-first Ansatz
          </div>
          <div class="info-item">
            <strong>Performance:</strong> Optimiert für schnelle Ladezeiten
          </div>
        </div>
      </div>
    </section>

    <!-- GitHub Link -->
    <section class="content-section">
      <div class="content-card github-section">
        <h2 class="section-title">
          <span class="section-icon">🐙</span>
          Open Source
        </h2>
        <p class="section-text">
          Das komplette Projekt ist Open Source und auf GitHub verfügbar. 
          Schaue dir den Code an, stelle Fragen oder trage zum Projekt bei!
        </p>
        
        <div class="github-actions">
          <a 
            href="https://github.com/preem-BD/fitness-tracker" 
            class="btn btn-primary btn-lg"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span class="btn-icon">🐙</span>
            GitHub Repository
          </a>
          <a 
            href="https://github.com/preem-BD/fitness-tracker/issues" 
            class="btn btn-outline-primary btn-lg"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span class="btn-icon">🐛</span>
            Issues & Feedback
          </a>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="content-section">
      <div class="content-card">
        <h2 class="section-title">
          <span class="section-icon">📧</span>
          Kontakt
        </h2>
        <p class="section-text">
          Hast du Fragen zum Projekt oder möchtest du mehr über die verwendeten Technologien erfahren?
        </p>
        
        <div class="contact-info">
          <div class="contact-item">
            <span class="contact-icon">🐙</span>
            <a href="https://github.com/preem-BD" target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </div>
          <div class="contact-item">
            <span class="contact-icon">💬</span>
            <a href="https://github.com/preem-BD/fitness-tracker/discussions" target="_blank" rel="noopener noreferrer">
              GitHub Discussions
            </a>
          </div>
        </div>
      </div>
    </section>

  </div>
</div>

<script>
  /*
    SVELTE 5 RUNES - Interactive About Page
    Modern reactive state for technology showcase
  */
  
  // Tab state management using Svelte 5 runes
  let activeTab = $state('frontend');
  
  // Tab switching function
  function setActiveTab(tab) {
    activeTab = tab;
  }
</script>

<style>
  .about-page {
    min-height: 100vh;
    background: var(--bg-primary);
    padding: 2rem 0;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .page-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .page-title {
    font-size: 3rem;
    font-weight: bold;
    color: var(--text-primary);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .page-icon {
    font-size: 3rem;
  }

  .page-subtitle {
    font-size: 1.2rem;
    color: var(--text-secondary);
    margin: 0;
  }

  .content-section {
    margin-bottom: 2rem;
  }

  .content-card {
    background: var(--bg-primary);
    padding: 2rem;
    border-radius: 12px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
  }

  .section-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--text-primary);
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .section-icon {
    font-size: 1.5rem;
  }

  .section-text {
    color: var(--text-secondary);
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  .feature-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .feature-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--bg-secondary);
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

  .feature-icon {
    font-size: 1.5rem;
  }

  .feature-text {
    color: var(--text-primary);
    font-weight: 500;
  }

  .tech-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .tech-tabs {
    margin-top: 1.5rem;
  }

  .tab-buttons {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-color);
  }

  .tab-button {
    padding: 0.75rem 1.5rem;
    background: transparent;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease;
    font-weight: 500;
  }

  .tab-button:hover {
    color: var(--text-primary);
    background: var(--bg-hover);
  }

  .tab-button.active {
    color: var(--primary-color);
    border-bottom-color: var(--primary-color);
  }

  .tab-content {
    min-height: 200px;
  }

  .tech-item {
    text-align: center;
    padding: 1rem;
    background: var(--bg-secondary);
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

  .tech-badge {
    display: inline-block;
    background: var(--primary-color);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .tech-description {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin: 0;
  }

  .development-info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .info-item {
    color: var(--text-primary);
    line-height: 1.5;
  }

  .github-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .github-section .section-title,
  .github-section .section-text {
    color: white;
  }

  .github-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--bg-secondary);
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

  .contact-icon {
    font-size: 1.5rem;
  }

  .contact-item a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
  }

  .contact-item a:hover {
    text-decoration: underline;
  }

  /* Button Styles */
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
    background: var(--primary-dark-color);
    transform: translateY(-2px);
  }

  .btn-outline-primary {
    background: transparent;
    color: white;
    border: 2px solid rgba(255,255,255,0.5);
  }

  .btn-outline-primary:hover {
    background: rgba(255,255,255,0.1);
    border-color: white;
  }

  .btn-icon {
    font-size: 1.1em;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .page-title {
      font-size: 2.5rem;
      flex-direction: column;
      gap: 0.5rem;
    }

    .tech-grid {
      grid-template-columns: 1fr;
    }

    .github-actions {
      flex-direction: column;
      align-items: center;
    }

    .content-card {
      padding: 1.5rem;
    }
  }
</style>
