<!-- 
  HILFE SEITE
  Umfassender Support und FAQ für die Fitness Tracker App
-->

<svelte:head>
  <title>Hilfe - Fitness Tracker</title>
  <meta name="description" content="Hilfe und Support für die Fitness Tracker App - FAQ, Anleitungen und Tipps.">
</svelte:head>

<div class="help-page">
  <div class="container">
    
    <!-- Header Section -->
    <div class="page-header">
      <h1 class="page-title">
        <span class="page-icon">❓</span>
        Hilfe & Support
      </h1>
      <p class="page-subtitle">
        Alles was du für die optimale Nutzung des Fitness Trackers wissen musst
      </p>
    </div>

    <!-- Quick Start -->
    <section class="content-section">
      <div class="content-card">
        <h2 class="section-title">
          <span class="section-icon">🚀</span>
          Schnellstart
        </h2>
        <p class="section-text">
          Neu bei Fitness Tracker? Hier findest du die wichtigsten ersten Schritte:
        </p>
        
        <div class="quickstart-steps">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-content">
              <h4 class="step-title">Erstes Workout erstellen</h4>
              <p class="step-text">Gehe zu "Workouts" → "Neues Workout" und erstelle deinen ersten Trainingsplan</p>
              <a href="/workouts/create" class="step-link">Workout erstellen →</a>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-content">
              <h4 class="step-title">Ziele setzen</h4>
              <p class="step-text">Definiere deine Fitness-Ziele unter "Goals" für bessere Motivation</p>
              <a href="/goals/create" class="step-link">Goal erstellen →</a>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-content">
              <h4 class="step-title">Exercises entdecken</h4>
              <p class="step-text">Durchsuche die Exercise-Datenbank für neue Übungsideen</p>
              <a href="/exercises" class="step-link">Exercises erkunden →</a>
            </div>
          </div>
          
          <div class="step-item">
            <div class="step-number">4</div>
            <div class="step-content">
              <h4 class="step-title">Fortschritt verfolgen</h4>
              <p class="step-text">Schaue regelmässig in die Statistiken für deine Erfolge</p>
              <a href="/stats" class="step-link">Statistiken ansehen →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="content-section">
      <div class="content-card">
        <h2 class="section-title">
          <span class="section-icon">❓</span>
          Häufig gestellte Fragen (FAQ)
        </h2>
        
        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-question" onclick={() => toggleFaq(0)}>
              <h4 class="question-text">🏋️ Wie erstelle ich ein effektives Workout?</h4>
              <span class="question-toggle">{openFaqs[0] ? '−' : '+'}</span>
            </div>
            {#if openFaqs[0]}
            <div class="faq-answer">
              <p>Ein gutes Workout sollte verschiedene Muskelgruppen ansprechen und zu deinem Fitnesslevel passen. Nutze unsere Exercise-Datenbank, um passende Übungen zu finden, und plane 3-4 Übungen pro Workout mit jeweils 3-4 Sets.</p>
            </div>
            {/if}
          </div>
          
          <div class="faq-item">
            <div class="faq-question" onclick={() => toggleFaq(1)}>
              <h4 class="question-text">🎯 Wie setze ich realistische Goals?</h4>
              <span class="question-toggle">{openFaqs[1] ? '−' : '+'}</span>
            </div>
            {#if openFaqs[1]}
            <div class="faq-answer">
              <p>Setze dir SMART-Ziele: Spezifisch, Messbar, Erreichbar, Relevant und Zeitgebunden. Beispiel: "Ich möchte in 8 Wochen 10 Liegestütze am Stück schaffen" statt "Ich möchte stärker werden".</p>
            </div>
            {/if}
          </div>
          
          <div class="faq-item">
            <div class="faq-question" onclick={() => toggleFaq(2)}>
              <h4 class="question-text">📊 Was bedeuten die Statistiken?</h4>
              <span class="question-toggle">{openFaqs[2] ? '−' : '+'}</span>
            </div>
            {#if openFaqs[2]}
            <div class="faq-answer">
              <p>Die Statistiken zeigen deinen Trainingsfortschritt über Zeit. Du siehst abgeschlossene Workouts, erreichte Goals und deine aktivsten Trainingstage. Diese Daten helfen dir, deine Erfolge zu verfolgen und Motivation zu behalten.</p>
            </div>
            {/if}
          </div>
          
          <div class="faq-item">
            <div class="faq-question" onclick={() => toggleFaq(3)}>
              <h4 class="question-text">💾 Werden meine Daten gespeichert?</h4>
              <span class="question-toggle">{openFaqs[3] ? '−' : '+'}</span>
            </div>
            {#if openFaqs[3]}
            <div class="faq-answer">
              <p>Ja, alle deine Workouts, Goals und Trainingsfortschritte werden sicher in der Datenbank gespeichert. Du kannst jederzeit auf deine Daten zugreifen. Mehr Details findest du in unserer <a href="/privacy">Datenschutzerklärung</a>.</p>
            </div>
            {/if}
          </div>
          
          <div class="faq-item">
            <div class="faq-question" onclick={() => toggleFaq(4)}>
              <h4 class="question-text">📱 Ist die App mobilfreundlich?</h4>
              <span class="question-toggle">{openFaqs[4] ? '−' : '+'}</span>
            </div>
            {#if openFaqs[4]}
            <div class="faq-answer">
              <p>Absolut! Fitness Tracker ist vollständig responsive und funktioniert perfekt auf Smartphones, Tablets und Desktop-Computern. Du kannst die App auf allen Geräten nutzen.</p>
            </div>
            {/if}
          </div>
          
          <div class="faq-item">
            <div class="faq-question" onclick={() => toggleFaq(5)}>
              <h4 class="question-text">🔄 Kann ich Workouts bearbeiten?</h4>
              <span class="question-toggle">{openFaqs[5] ? '−' : '+'}</span>
            </div>
            {#if openFaqs[5]}
            <div class="faq-answer">
              <p>Ja, du kannst jederzeit deine Workouts und Goals bearbeiten. Klicke einfach auf ein bestehendes Workout oder Goal und wähle "Bearbeiten". So kannst du deine Pläne an deine Fortschritte anpassen.</p>
            </div>
            {/if}
          </div>
        </div>
      </div>
    </section>

    <!-- Features Guide -->
    <section class="content-section">
      <div class="content-card">
        <h2 class="section-title">
          <span class="section-icon">🛠️</span>
          Features erklärt
        </h2>
        
        <div class="features-guide">
          <div class="feature-guide-item">
            <div class="feature-icon">💪</div>
            <div class="feature-content">
              <h4 class="feature-title">Workouts</h4>
              <p class="feature-description">
                Erstelle personalisierte Trainingspläne mit verschiedenen Übungen. 
                Jedes Workout kann mehrere Exercises enthalten mit Sets, Reps und Gewichten.
              </p>
              <ul class="feature-tips">
                <li>Verwende aussagekräftige Namen für deine Workouts</li>
                <li>Plane verschiedene Workouts für unterschiedliche Trainingstage</li>
                <li>Notiere dir wichtige Details wie Gewichte und Wiederholungen</li>
              </ul>
            </div>
          </div>
          
          <div class="feature-guide-item">
            <div class="feature-icon">🎯</div>
            <div class="feature-content">
              <h4 class="feature-title">Goals</h4>
              <p class="feature-description">
                Setze dir messbare Fitness-Ziele und verfolge deinen Fortschritt. 
                Goals motivieren dich und geben deinem Training eine klare Richtung.
              </p>
              <ul class="feature-tips">
                <li>Setze realistische und zeitgebundene Ziele</li>
                <li>Nutze die Kategorien für bessere Organisation</li>
                <li>Aktualisiere den Fortschritt regelmässig</li>
              </ul>
            </div>
          </div>
          
          <div class="feature-guide-item">
            <div class="feature-icon">📖</div>
            <div class="feature-content">
              <h4 class="feature-title">Exercises</h4>
              <p class="feature-description">
                Durchsuche die umfangreiche Exercise-Datenbank oder füge eigene Übungen hinzu. 
                Jede Exercise enthält detaillierte Informationen zur korrekten Ausführung.
              </p>
              <ul class="feature-tips">
                <li>Filtere nach Muskelgruppen für gezieltes Training</li>
                <li>Lies die Beschreibungen für korrekte Ausführung</li>
                <li>Füge eigene Lieblings-Exercises hinzu</li>
              </ul>
            </div>
          </div>
          
          <div class="feature-guide-item">
            <div class="feature-icon">📊</div>
            <div class="feature-content">
              <h4 class="feature-title">Statistiken</h4>
              <p class="feature-description">
                Verfolge deinen Trainingsfortschritt mit detaillierten Statistiken. 
                Sieh deine Erfolge und erkenne Verbesserungsmöglichkeiten.
              </p>
              <ul class="feature-tips">
                <li>Nutze die Trends zur Motivation</li>
                <li>Identifiziere deine produktivsten Trainingstage</li>
                <li>Verfolge die Completion-Rate deiner Goals</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tips & Best Practices -->
    <section class="content-section">
      <div class="content-card tips-card">
        <h2 class="section-title">
          <span class="section-icon">💡</span>
          Tipps & Best Practices
        </h2>
        
        <div class="tips-grid">
          <div class="tip-item">
            <div class="tip-icon">🎯</div>
            <h4 class="tip-title">Ziele richtig setzen</h4>
            <p class="tip-text">
              Beginne mit kleinen, erreichbaren Zielen und steigere dich kontinuierlich. 
              Lieber 3 Trainingseinheiten pro Woche schaffen, als 5 geplante zu verfehlen.
            </p>
          </div>
          
          <div class="tip-item">
            <div class="tip-icon">📅</div>
            <h4 class="tip-title">Regelmässigkeit</h4>
            <p class="tip-text">
              Konsistenz ist wichtiger als Intensität. Plane realistische Trainingszeiten 
              und halte dich daran. Auch 20 Minuten sind besser als gar nichts.
            </p>
          </div>
          
          <div class="tip-item">
            <div class="tip-icon">📈</div>
            <h4 class="tip-title">Fortschritt tracken</h4>
            <p class="tip-text">
              Dokumentiere deine Trainings detailliert. Notiere Gewichte, Wiederholungen 
              und wie du dich gefühlt hast. Das hilft bei der Trainingsplanung.
            </p>
          </div>
          
          <div class="tip-item">
            <div class="tip-icon">💪</div>
            <h4 class="tip-title">Abwechslung</h4>
            <p class="tip-text">
              Variiere deine Workouts regelmässig, um Langeweile zu vermeiden und 
              verschiedene Muskelgruppen zu trainieren. Nutze die Exercise-Datenbank!
            </p>
          </div>
          
          <div class="tip-item">
            <div class="tip-icon">🧘</div>
            <h4 class="tip-title">Erholung einplanen</h4>
            <p class="tip-text">
              Plane bewusst Ruhetage ein. Regeneration ist genauso wichtig wie das 
              Training selbst für deinen Fortschritt und Verletzungsprävention.
            </p>
          </div>
          
          <div class="tip-item">
            <div class="tip-icon">🎉</div>
            <h4 class="tip-title">Erfolge feiern</h4>
            <p class="tip-text">
              Erkenne und feiere deine Fortschritte! Schau regelmässig in die Statistiken 
              und sei stolz auf das, was du bereits erreicht hast.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Support -->
    <section class="content-section">
      <div class="content-card">
        <h2 class="section-title">
          <span class="section-icon">🔧</span>
          Technischer Support
        </h2>
        
        <div class="support-info">
          <p class="section-text">
            Bei technischen Problemen oder Fragen zur App kannst du uns über GitHub kontaktieren:
          </p>
          
          <div class="support-options">
            <a 
              href="https://github.com/preem-BD/fitness-tracker/issues" 
              class="support-option"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div class="support-icon">🐛</div>
              <div class="support-content">
                <h4 class="support-title">Bug Report</h4>
                <p class="support-text">Melde technische Probleme oder Fehler</p>
              </div>
            </a>
            
            <a 
              href="https://github.com/preem-BD/fitness-tracker/discussions" 
              class="support-option"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div class="support-icon">💬</div>
              <div class="support-content">
                <h4 class="support-title">Allgemeine Fragen</h4>
                <p class="support-text">Stelle Fragen oder diskutiere mit der Community</p>
              </div>
            </a>
            
            <a 
              href="https://github.com/preem-BD/fitness-tracker" 
              class="support-option"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <div class="support-icon">📖</div>
              <div class="support-content">
                <h4 class="support-title">Dokumentation</h4>
                <p class="support-text">Technische Details im GitHub Repository</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- System Requirements -->
    <section class="content-section">
      <div class="content-card">
        <h2 class="section-title">
          <span class="section-icon">💻</span>
          System-Anforderungen
        </h2>
        
        <div class="requirements-grid">
          <div class="requirement-item">
            <h4 class="requirement-title">🌐 Browser</h4>
            <ul class="requirement-list">
              <li>Chrome 90+ (empfohlen)</li>
              <li>Firefox 88+</li>
              <li>Safari 14+</li>
              <li>Edge 90+</li>
            </ul>
          </div>
          
          <div class="requirement-item">
            <h4 class="requirement-title">📱 Mobile</h4>
            <ul class="requirement-list">
              <li>iOS Safari 14+</li>
              <li>Android Chrome 90+</li>
              <li>Samsung Internet 15+</li>
              <li>Mobile Firefox 88+</li>
            </ul>
          </div>
          
          <div class="requirement-item">
            <h4 class="requirement-title">🌍 Internet</h4>
            <ul class="requirement-list">
              <li>Aktive Internetverbindung</li>
              <li>Mindestens 1 Mbps</li>
              <li>JavaScript aktiviert</li>
              <li>Cookies erlaubt</li>
            </ul>
          </div>
          
          <div class="requirement-item">
            <h4 class="requirement-title">💾 Speicher</h4>
            <ul class="requirement-list">
              <li>Keine Installation nötig</li>
              <li>Browser-Cache für Performance</li>
              <li>LocalStorage für Settings</li>
              <li>Daten in Cloud gespeichert</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

  </div>
</div>

<script>
  /*
    SVELTE 5 RUNES - FAQ Interactive Functionality
    Modern reactive state management for help page
  */
  
  // FAQ state management using Svelte 5 runes
  let openFaqs = $state([false, false, false, false, false, false]);
  
  // Toggle FAQ function with reactive updates
  function toggleFaq(index) {
    openFaqs[index] = !openFaqs[index];
  }
</script>

<style>
  .help-page {
    min-height: 100vh;
    background: var(--bg-secondary);
    padding: 2rem 0;
  }

  .container {
    max-width: 1000px;
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
    box-shadow: var(--shadow-lg);
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

  /* Quick Start */
  .quickstart-steps {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .step-item {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 1.5rem;
    background: var(--bg-secondary);
    border-radius: 12px;
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
  }

  .step-item:hover {
    background: var(--bg-hover);
    transform: translateY(-2px);
  }

  .step-number {
    background: var(--primary-color);
    color: white;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .step-content {
    flex: 1;
  }

  .step-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .step-text {
    color: var(--text-secondary);
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  .step-link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
  }

  .step-link:hover {
    text-decoration: underline;
  }

  /* FAQ */
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .faq-item {
    border: 1px solid var(--border-color);
    border-radius: 8px;
    overflow: hidden;
  }

  .faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: var(--bg-secondary);
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .faq-question:hover {
    background: var(--bg-hover);
  }

  .question-text {
    margin: 0;
    color: var(--text-primary);
    font-size: 1.1rem;
  }

  .question-toggle {
    font-size: 1.5rem;
    color: var(--primary-color);
    font-weight: bold;
  }

  .faq-answer {
    padding: 1rem;
    background: var(--bg-primary);
    border-top: 1px solid var(--border-color);
  }

  .faq-answer p {
    margin: 0;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  .faq-answer a {
    color: var(--primary-color);
    text-decoration: none;
  }

  .faq-answer a:hover {
    text-decoration: underline;
  }

  /* Features Guide */
  .features-guide {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .feature-guide-item {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 1.5rem;
    background: var(--bg-secondary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
  }

  .feature-icon {
    font-size: 3rem;
    flex-shrink: 0;
  }

  .feature-content {
    flex: 1;
  }

  .feature-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .feature-description {
    color: var(--text-secondary);
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .feature-tips {
    margin: 0;
    padding-left: 1.5rem;
  }

  .feature-tips li {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  /* Tips */
  .tips-card {
    background: var(--warning-light);
    border: 1px solid var(--warning-color);
  }

  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .tip-item {
    background: var(--bg-primary);
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: var(--shadow-md);
    border: 1px solid var(--border-color);
  }

  .tip-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    display: block;
  }

  .tip-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
  }

  .tip-text {
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.6;
  }

  /* Support */
  .support-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .support-option {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: var(--bg-secondary);
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
    border: 1px solid var(--border-color);
  }

  .support-option:hover {
    background: var(--bg-hover);
    transform: translateY(-2px);
  }

  .support-icon {
    font-size: 2rem;
    color: var(--primary-color);
  }

  .support-title {
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 0.2rem;
  }

  .support-text {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin: 0;
  }

  /* Requirements */
  .requirements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }

  .requirement-item {
    background: var(--bg-secondary);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid var(--border-color);
  }

  .requirement-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .requirement-list {
    margin: 0;
    padding-left: 1.5rem;
  }

  .requirement-list li {
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .page-title {
      font-size: 2.5rem;
      flex-direction: column;
      gap: 0.5rem;
    }

    .step-item,
    .feature-guide-item {
      flex-direction: column;
      text-align: center;
    }

    .step-number {
      align-self: center;
    }

    .tips-grid {
      grid-template-columns: 1fr;
    }

    .requirements-grid {
      grid-template-columns: 1fr;
    }

    .support-options {
      grid-template-columns: 1fr;
    }

    .content-card {
      padding: 1.5rem;
    }
  }
</style>
