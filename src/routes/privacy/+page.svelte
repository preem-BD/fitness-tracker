<!-- 
  DATENSCHUTZ SEITE
  Datenschutzerklärung für die Fitness Tracker App
-->

<svelte:head>
  <title>Datenschutz - Fitness Tracker</title>
  <meta name="description" content="Datenschutzerklärung der Fitness Tracker App - Wie wir mit deinen Daten umgehen.">
</svelte:head>

<div class="privacy-page">
  <div class="container">
    
    <!-- Header Section -->
    <div class="page-header">
      <h1 class="page-title">
        <span class="page-icon">🔒</span>
        Datenschutzerklärung
      </h1>
      <p class="page-subtitle">
        Transparenz und Schutz deiner persönlichen Daten
      </p>
      <div class="last-updated">
        Letzte Aktualisierung: 29. Mai 2025
      </div>
    </div>

    <!-- Introduction -->
    <section class="content-section">
      <div class="content-card">
        <h2 class="section-title">
          <span class="section-icon">ℹ️</span>
          Einleitung
        </h2>
        <p class="section-text">
          Bei Fitness Tracker nehmen wir den Schutz deiner persönlichen Daten sehr ernst. 
          Diese Datenschutzerklärung informiert dich darüber, wie wir deine Daten sammeln, 
          verwenden und schützen, wenn du unsere Fitness Tracker App nutzt.
        </p>
        <div class="highlight-box">
          <strong>Kurz gesagt:</strong> Wir sammeln nur die Daten, die für die Funktionalität 
          der App notwendig sind, und geben sie niemals an Dritte weiter.
        </div>
      </div>
    </section>

    <!-- Data Collection -->
    <section class="content-section">
      <div class="content-card">
        <h2 class="section-title">
          <span class="section-icon">📊</span>
          Welche Daten sammeln wir?
        </h2>
        
        <div class="data-category">
          <h3 class="category-title">🏋️ Trainingsdaten</h3>
          <ul class="data-list">
            <li>Workout-Einträge und Trainingspläne</li>
            <li>Exercise-Ausführungen und Sets</li>
            <li>Trainingszeiten und -dauer</li>
            <li>Gewichte und Wiederholungen</li>
          </ul>
        </div>

        <div class="data-category">
          <h3 class="category-title">🎯 Ziel- und Fortschrittsdaten</h3>
          <ul class="data-list">
            <li>Gesetzte Fitness-Ziele</li>
            <li>Fortschritts-Messungen</li>
            <li>Ziel-Deadlines und Status</li>
            <li>Erfolgs-Statistiken</li>
          </ul>
        </div>

        <div class="data-category">
          <h3 class="category-title">📱 Technische Daten</h3>
          <ul class="data-list">
            <li>Browser-Typ und Version</li>
            <li>Betriebssystem</li>
            <li>IP-Adresse (anonymisiert)</li>
            <li>Zugriffszeitpunkte</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Data Usage -->
    <section class="content-section">
      <div class="content-card">
        <h2 class="section-title">
          <span class="section-icon">🎯</span>
          Wie verwenden wir deine Daten?
        </h2>
        
        <div class="usage-grid">
          <div class="usage-item">
            <div class="usage-icon">💪</div>
            <h4 class="usage-title">App-Funktionalität</h4>
            <p class="usage-text">
              Bereitstellung der Workout-, Goal- und Exercise-Features
            </p>
          </div>
          
          <div class="usage-item">
            <div class="usage-icon">📈</div>
            <h4 class="usage-title">Fortschritts-Tracking</h4>
            <p class="usage-text">
              Anzeige deiner persönlichen Trainingsstatistiken
            </p>
          </div>
          
          <div class="usage-item">
            <div class="usage-icon">🔧</div>
            <h4 class="usage-title">App-Verbesserung</h4>
            <p class="usage-text">
              Optimierung der Performance und Benutzererfahrung
            </p>
          </div>
          
          <div class="usage-item">
            <div class="usage-icon">🛡️</div>
            <h4 class="usage-title">Sicherheit</h4>
            <p class="usage-text">
              Schutz vor Missbrauch und Sicherheitsbedrohungen
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Storage -->
    <section class="content-section">
      <div class="content-card">
        <h2 class="section-title">
          <span class="section-icon">🗄️</span>
          Datenspeicherung
        </h2>
        <p class="section-text">
          Deine Daten werden sicher in einer MongoDB-Datenbank gespeichert. 
          Wir verwenden moderne Verschlüsselungstechnologien und Sicherheitsmassnahmen:
        </p>
        
        <div class="security-features">
          <div class="security-item">
            <span class="security-icon">🔐</span>
            <span class="security-text">SSL/TLS-Verschlüsselung für alle Datenübertragungen</span>
          </div>
          <div class="security-item">
            <span class="security-icon">🗄️</span>
            <span class="security-text">Sichere MongoDB-Datenbank mit Zugriffskontrollen</span>
          </div>
          <div class="security-item">
            <span class="security-icon">🔒</span>
            <span class="security-text">Regelmässige Sicherheits-Updates und Monitoring</span>
          </div>
          <div class="security-item">
            <span class="security-icon">💾</span>
            <span class="security-text">Automatische Backups zum Schutz vor Datenverlust</span>
          </div>
        </div>
      </div>
    </section>

    <!-- User Rights -->
    <section class="content-section">
      <div class="content-card">
        <h2 class="section-title">
          <span class="section-icon">⚖️</span>
          Deine Rechte
        </h2>
        <p class="section-text">
          Du hast jederzeit folgende Rechte bezüglich deiner persönlichen Daten:
        </p>
        
        <div class="rights-grid">
          <div class="right-item">
            <h4 class="right-title">📋 Auskunftsrecht</h4>
            <p class="right-text">Erfahre, welche Daten wir über dich gespeichert haben</p>
          </div>
          
          <div class="right-item">
            <h4 class="right-title">✏️ Berichtigungsrecht</h4>
            <p class="right-text">Korrigiere unrichtige oder unvollständige Daten</p>
          </div>
          
          <div class="right-item">
            <h4 class="right-title">🗑️ Löschungsrecht</h4>
            <p class="right-text">Verlange die Löschung deiner persönlichen Daten</p>
          </div>
          
          <div class="right-item">
            <h4 class="right-title">📤 Datenportabilität</h4>
            <p class="right-text">Erhalte deine Daten in einem übertragbaren Format</p>
          </div>
        </div>
      </div>
    </section>

    <!-- No Data Sharing -->
    <section class="content-section">
      <div class="content-card no-sharing">
        <h2 class="section-title">
          <span class="section-icon">🚫</span>
          Keine Datenweitergabe
        </h2>
        <p class="section-text">
          <strong>Wir verkaufen, vermieten oder teilen deine persönlichen Daten niemals mit Dritten.</strong> 
          Deine Trainingsdaten bleiben privat und werden ausschliesslich für die App-Funktionalität verwendet.
        </p>
        
        <div class="guarantee-box">
          <div class="guarantee-icon">✅</div>
          <div class="guarantee-text">
            <strong>100% Privatsphäre-Garantie:</strong> Deine Fitness-Daten gehören dir und bleiben bei dir.
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section class="content-section">
      <div class="content-card">
        <h2 class="section-title">
          <span class="section-icon">📧</span>
          Kontakt zum Datenschutz
        </h2>
        <p class="section-text">
          Bei Fragen zum Datenschutz oder zur Ausübung deiner Rechte kannst du uns kontaktieren:
        </p>
        
        <div class="contact-info">
          <div class="contact-item">
            <span class="contact-icon">🐙</span>
            <div class="contact-details">
              <strong>GitHub Issues:</strong>
              <a href="https://github.com/preem-BD/fitness-tracker/issues" target="_blank" rel="noopener noreferrer">
                github.com/preem-BD/fitness-tracker/issues
              </a>
            </div>
          </div>
          
          <div class="contact-item">
            <span class="contact-icon">💬</span>
            <div class="contact-details">
              <strong>GitHub Discussions:</strong>
              <a href="https://github.com/preem-BD/fitness-tracker/discussions" target="_blank" rel="noopener noreferrer">
                github.com/preem-BD/fitness-tracker/discussions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</div>

<style>
  .privacy-page {
    min-height: 100vh;
    background: var(--bg-secondary);
    padding: 2rem 0;
  }

  .container {
    max-width: 900px;
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
    margin-bottom: 1rem;
  }

  .last-updated {
    background: var(--info-light);
    color: var(--info-dark);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.9rem;
    display: inline-block;
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

  .highlight-box {
    background: var(--success-light);
    border-left: 4px solid var(--success-color);
    padding: 1rem;
    border-radius: 0 8px 8px 0;
    color: var(--success-dark);
  }

  .data-category {
    margin-bottom: 2rem;
  }

  .category-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .data-list {
    list-style: none;
    padding: 0;
  }

  .data-list li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-secondary);
  }

  .data-list li:before {
    content: "→ ";
    color: var(--primary-color);
    font-weight: bold;
  }

  .usage-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .usage-item {
    text-align: center;
    padding: 1.5rem;
    background: var(--bg-secondary);
    border-radius: 12px;
    transition: transform 0.3s ease;
    border: 1px solid var(--border-color);
  }

  .usage-item:hover {
    transform: translateY(-3px);
  }

  .usage-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .usage-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .usage-text {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin: 0;
  }

  .security-features {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .security-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: var(--bg-secondary);
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

  .security-icon {
    font-size: 1.5rem;
  }

  .security-text {
    color: var(--text-secondary);
    font-weight: 500;
  }

  .rights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .right-item {
    padding: 1.5rem;
    background: var(--bg-secondary);
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

  .right-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .right-text {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin: 0;
  }

  .no-sharing {
    background: var(--success-light);
    border: 2px solid var(--success-color);
  }

  .guarantee-box {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: var(--bg-primary);
    padding: 1.5rem;
    border-radius: 8px;
    margin-top: 1rem;
    border: 1px solid var(--border-color);
  }

  .guarantee-icon {
    font-size: 2rem;
    color: var(--success-color);
  }

  .guarantee-text {
    color: var(--success-dark);
    font-weight: 500;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background: var(--bg-secondary);
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

  .contact-icon {
    font-size: 1.5rem;
    margin-top: 0.2rem;
  }

  .contact-details a {
    color: var(--primary-color);
    text-decoration: none;
  }

  .contact-details a:hover {
    text-decoration: underline;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .page-title {
      font-size: 2.5rem;
      flex-direction: column;
      gap: 0.5rem;
    }

    .usage-grid,
    .rights-grid {
      grid-template-columns: 1fr;
    }

    .content-card {
      padding: 1.5rem;
    }

    .guarantee-box {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
