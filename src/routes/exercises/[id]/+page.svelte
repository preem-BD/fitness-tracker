<!-- 
  EXERCISE DETAILS PAGE - SVELTE 5 RUNES VERSION
  Zeigt detaillierte Informationen einer einzelnen Exercise
  Demonstriert Dynamic Routing, Error Handling und komplexe UI-Layouts
-->

<svelte:head>
  <!-- 
    DYNAMIC SEO META TAGS
    Basierend auf Exercise-Daten für bessere Suchmaschinenoptimierung
  -->
  {#if data.exercise}
    <title>{data.exercise.name} - Exercise Details | Fitness Tracker</title>
    <meta name="description" content={data.exercise.description}>
    <meta name="keywords" content={data.meta?.keywords || ''}>
  {:else}
    <title>Exercise nicht gefunden | Fitness Tracker</title>
  {/if}
</svelte:head>

<div class="exercise-details-page">
  
  <!-- 
    ERROR HANDLING
    Zeigt Fehlermeldungen falls Exercise nicht geladen werden kann
  -->
  {#if data.error}
    <div class="error-section">
      <div class="error-card">
        <h1>⚠️ Fehler beim Laden der Übung</h1>
        <p class="error-message">{data.error}</p>
        {#if data.details}
          <p class="error-details">Details: {data.details}</p>
        {/if}
        <div class="error-actions">
          <a href="/exercises" class="back-btn">← Zurück zur Übungsliste</a>
          <button onclick={() => window.location.reload()} class="retry-btn">
            🔄 Neu versuchen
          </button>
        </div>
      </div>
    </div>

  <!-- 
    MAIN CONTENT - Exercise Details
    Conditional Rendering: Nur wenn Exercise existiert
  -->
  {:else if data.exercise}
    
    <!-- Breadcrumb Navigation -->
    <nav class="breadcrumb">
      <a href="/">🏠 Home</a>
      <span class="separator">›</span>
      <a href="/exercises">🏋️ Exercises</a>
      <span class="separator">›</span>
      <span class="current">{data.exercise.name}</span>
    </nav>

    <!-- Exercise Header Section -->
    <header class="exercise-header">
      <div class="header-content">
        <div class="title-section">
          <h1 class="exercise-title">{data.exercise.name}</h1>
          <p class="exercise-description">{data.exercise.description}</p>
        </div>
        
        <!-- Exercise Meta Info -->
        <div class="meta-badges">
          <span class="difficulty-badge difficulty-{data.exercise.difficulty.toLowerCase()}">
            {data.exercise.difficulty}
          </span>
          
          {#if data.category}
            <span 
              class="category-badge" 
              style="background-color: {data.category.color};"
            >
              {data.category.name}
            </span>
          {/if}
          
          <span class="muscle-badge">
            🎯 {data.exercise.muscle_group}
          </span>
        </div>
      </div>

      <!-- Exercise Image Placeholder -->
      <div class="exercise-image">
        <div class="image-placeholder">
          <span class="placeholder-icon">🏋️</span>
          <p>Exercise Bild</p>
          <!-- TODO: Echtes Bild von data.exercise.image_url -->
        </div>
      </div>
    </header>

    <!-- Main Content Grid -->
    <main class="content-grid">
      
      <!-- Instructions Section -->
      <section class="instructions-section">
        <h2>📋 Ausführung</h2>
        <div class="instructions-content">
          <p class="instructions-text">{data.exercise.instructions}</p>
          
          <!-- Equipment Info -->
          <div class="equipment-info">
            <h3>🏋️ Benötigtes Equipment:</h3>
            <p>{data.exercise.equipment}</p>
          </div>
        </div>
      </section>

      <!-- Muscles Section -->
      <section class="muscles-section">
        <h2>💪 Beanspruchte Muskeln</h2>
        
        <!-- Primary Muscles -->
        {#if data.exercise.primary_muscles}
          <div class="muscle-group">
            <h3>Primäre Muskeln:</h3>
            <div class="muscle-tags">
              {#each data.exercise.primary_muscles as muscle}
                <span class="muscle-tag primary">{muscle}</span>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Secondary Muscles -->
        {#if data.exercise.secondary_muscles}
          <div class="muscle-group">
            <h3>Sekundäre Muskeln:</h3>
            <div class="muscle-tags">
              {#each data.exercise.secondary_muscles as muscle}
                <span class="muscle-tag secondary">{muscle}</span>
              {/each}
            </div>
          </div>
        {/if}
      </section>

      <!-- Benefits Section -->
      {#if data.exercise.benefits}
        <section class="benefits-section">
          <h2>✨ Vorteile</h2>
          <ul class="benefits-list">
            {#each data.exercise.benefits as benefit}
              <li class="benefit-item">
                <span class="benefit-icon">✓</span>
                {benefit}
              </li>
            {/each}
          </ul>
        </section>
      {/if}

      <!-- Tips Section -->
      {#if data.exercise.tips}
        <section class="tips-section">
          <h2>💡 Tipps & Hinweise</h2>
          <div class="tips-grid">
            {#each data.exercise.tips as tip, index}
              <div class="tip-card">
                <span class="tip-number">{index + 1}</span>
                <p class="tip-text">{tip}</p>
              </div>
            {/each}
          </div>
        </section>
      {/if}

      <!-- Training Recommendations -->
      {#if data.exercise.sets_recommendation}
        <section class="recommendations-section">
          <h2>🎯 Trainingsempfehlungen</h2>
          <div class="recommendations-grid">
            
            <!-- Sets/Reps Recommendations -->
            <div class="recommendation-card">
              <h3>Sets & Wiederholungen</h3>
              <div class="level-recommendations">
                {#if data.exercise.sets_recommendation.beginner}
                  <div class="level-item">
                    <span class="level-label">Anfänger:</span>
                    <span class="level-value">{data.exercise.sets_recommendation.beginner}</span>
                  </div>
                {/if}
                {#if data.exercise.sets_recommendation.intermediate}
                  <div class="level-item">
                    <span class="level-label">Fortgeschritten:</span>
                    <span class="level-value">{data.exercise.sets_recommendation.intermediate}</span>
                  </div>
                {/if}
                {#if data.exercise.sets_recommendation.advanced}
                  <div class="level-item">
                    <span class="level-label">Profi:</span>
                    <span class="level-value">{data.exercise.sets_recommendation.advanced}</span>
                  </div>
                {/if}
              </div>
            </div>

            <!-- Rest Time -->
            {#if data.exercise.rest_time}
              <div class="recommendation-card">
                <h3>⏱️ Pausenzeit</h3>
                <p class="rest-time">{data.exercise.rest_time}</p>
              </div>
            {/if}

            <!-- Difficulty Stats -->
            {#if data.difficultyStats}
              <div class="recommendation-card">
                <h3>📊 Schwierigkeitsgrad</h3>
                <div class="difficulty-progress">
                  <div class="progress-bar">
                    <div 
                      class="progress-fill" 
                      style="width: {data.difficultyStats.percentage}%"
                    ></div>
                  </div>
                  <p class="difficulty-description">
                    {data.difficultyStats.description}
                  </p>
                </div>
              </div>
            {/if}

          </div>
        </section>
      {/if}

      <!-- Variations Section -->
      {#if data.exercise.variations && data.exercise.variations.length > 0}
        <section class="variations-section">
          <h2>🔄 Variationen</h2>
          <div class="variations-grid">
            {#each data.exercise.variations as variation}
              <div class="variation-card">
                <h3 class="variation-name">{variation.name}</h3>
                <p class="variation-description">{variation.description}</p>
              </div>
            {/each}
          </div>
        </section>
      {/if}

    </main>

    <!-- Related Exercises Section -->
    {#if data.relatedExercises && data.relatedExercises.length > 0}
      <section class="related-section">
        <h2>🔗 Ähnliche Übungen</h2>
        <div class="related-grid">
          {#each data.relatedExercises as related}
            <div class="related-card">
              <h3 class="related-name">
                <a href="/exercises/{related.id}">{related.name}</a>
              </h3>
              <p class="related-description">{related.description}</p>
              <div class="related-meta">
                <span class="related-muscle">🎯 {related.muscle_group}</span>
                <span class="related-difficulty difficulty-{related.difficulty.toLowerCase()}">
                  {related.difficulty}
                </span>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Action Buttons -->
    <section class="action-section">
      <div class="action-buttons">
        <a href="/exercises" class="back-btn">
          ← Zurück zur Liste
        </a>
        
        <button 
          type="button" 
          class="add-to-workout-btn"
          onclick={() => addToWorkout(data.exercise)}
        >
          ➕ Zu Workout hinzufügen
        </button>
        
        <a href="/exercises/create" class="create-btn">
          ✏️ Neue Übung erstellen
        </a>
      </div>
    </section>

  <!-- 
    FALLBACK für unbekannte Zustände
  -->
  {:else}
    <div class="loading-section">
      <h1>🔄 Lade Exercise...</h1>
      <p>Bitte warten...</p>
    </div>
  {/if}

</div>

<script>
  /* 
    SVELTE 5 RUNES für EXERCISE DETAILS
    Zeigt moderne Svelte 5 Patterns für Detail-Pages
  */

  // SvelteKit Navigation Import
  import { goto } from '$app/navigation';

  // Props von Load Function (Svelte 5 Syntax)
  let { data } = $props();

  /* 
    DERIVED VALUES (Svelte 5)
    Berechnete Werte basierend auf Props
  */
  let hasExercise = $derived(!!data.exercise);
  let exerciseTitle = $derived(data.exercise?.name || 'Exercise nicht gefunden');
  let hasTips = $derived(data.exercise?.tips && data.exercise.tips.length > 0);
  let hasVariations = $derived(data.exercise?.variations && data.exercise.variations.length > 0);

  /* 
    INTERACTION FUNCTIONS
    Zeigt Event Handling und Komponentenkommunikation
  */
  
  // Exercise zu Workout hinzufügen
  function addToWorkout(exercise) {
    console.log('➕ Exercise zu Workout hinzufügen:', exercise.name);
    
    // TODO: Modal für Workout-Auswahl öffnen
    // Aktuell: Einfache Bestätigung
    const confirmed = confirm(
      `"${exercise.name}" zu einem Workout hinzufügen?\n\n` +
      `Diese Funktion wird in einem späteren Update implementiert.`
    );
    
    if (confirmed) {
      // Simuliert Navigation zu Workout-Creator
      goto('/workouts/create?exercise=' + exercise.id);
    }
  }

  // Bewertung abgeben (für später)
  function rateExercise(exerciseId, rating) {
    console.log('⭐ Exercise bewerten:', { exerciseId, rating });
    // TODO: API Call für Bewertung
  }

  // Exercise als Favorit markieren (für später)
  function toggleFavorite(exerciseId) {
    console.log('❤️ Favorit umschalten:', exerciseId);
    // TODO: Lokaler State + API Call
  }

  /* 
    SVELTE 5 EFFECTS
    Side Effects für Analytics und Debugging
  */
  $effect(() => {
    if (hasExercise) {
      console.log('📖 Exercise Details geladen:', {
        name: data.exercise.name,
        difficulty: data.exercise.difficulty,
        muscleGroup: data.exercise.muscle_group,
        hasRelated: data.relatedExercises?.length > 0,
        hasTips,
        hasVariations
      });
      
      // Simuliert Page View Analytics
      console.log('📈 Analytics: Exercise Detail View', {
        exerciseId: data.exercise.id,
        timestamp: new Date().toISOString()
      });
    }
  });
</script>

<style>
  /* 
    MAIN LAYOUT
    CSS Grid für responsive Detail-Page Layout
  */
  .exercise-details-page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    line-height: 1.6;
  }

  /* 
    BREADCRUMB NAVIGATION
    Verbesserter UX für Navigation
  */
  .breadcrumb {
    margin-bottom: 30px;
    padding: 10px 0;
    font-size: 0.9em;
    color: #666;
  }

  .breadcrumb a {
    color: #667eea;
    text-decoration: none;
  }

  .breadcrumb a:hover {
    text-decoration: underline;
  }

  .separator {
    margin: 0 10px;
    color: #999;
  }

  .current {
    color: #333;
    font-weight: 500;
  }

  /* 
    EXERCISE HEADER
    Hero-Section für Exercise-Grundinfos
  */
  .exercise-header {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
    margin-bottom: 40px;
    padding: 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;
  }

  .header-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .exercise-title {
    margin: 0;
    font-size: 2.5em;
    font-weight: bold;
  }

  .exercise-description {
    font-size: 1.2em;
    opacity: 0.9;
    margin: 0;
  }

  .meta-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .difficulty-badge, .category-badge, .muscle-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.9em;
    font-weight: bold;
  }

  .difficulty-leicht { background: rgba(40, 167, 69, 0.8); }
  .difficulty-mittel { background: rgba(255, 193, 7, 0.8); }
  .difficulty-schwer { background: rgba(220, 53, 69, 0.8); }

  .muscle-badge {
    background: rgba(255, 255, 255, 0.2);
  }

  /* Exercise Image */
  .exercise-image {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-placeholder {
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
  }

  .placeholder-icon {
    font-size: 3em;
    margin-bottom: 10px;
  }

  /* 
    CONTENT GRID
    Responsive Layout für Hauptcontent
  */
  .content-grid {
    display: grid;
    gap: 30px;
    margin-bottom: 40px;
  }

  /* Section Styling */
  section {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  section h2 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #333;
    font-size: 1.5em;
    border-bottom: 2px solid #667eea;
    padding-bottom: 10px;
  }

  /* 
    INSTRUCTIONS SECTION
  */
  .instructions-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .instructions-text {
    font-size: 1.1em;
    line-height: 1.7;
    color: #333;
  }

  .equipment-info {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #667eea;
  }

  .equipment-info h3 {
    margin: 0 0 8px 0;
    color: #333;
  }

  /* 
    MUSCLES SECTION
  */
  .muscle-group {
    margin-bottom: 20px;
  }

  .muscle-group h3 {
    margin-bottom: 10px;
    color: #555;
    font-size: 1.1em;
  }

  .muscle-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .muscle-tag {
    padding: 6px 12px;
    border-radius: 15px;
    font-size: 0.9em;
    font-weight: 500;
  }

  .muscle-tag.primary {
    background: #667eea;
    color: white;
  }

  .muscle-tag.secondary {
    background: #e9ecef;
    color: #495057;
  }

  /* 
    BENEFITS SECTION
  */
  .benefits-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .benefit-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .benefit-icon {
    background: #28a745;
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
    font-weight: bold;
    flex-shrink: 0;
  }

  /* 
    TIPS SECTION
  */
  .tips-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
  }

  .tip-card {
    background: #fff3cd;
    border: 1px solid #ffeaa7;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    gap: 12px;
  }

  .tip-number {
    background: #ff6b35;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
    font-weight: bold;
    flex-shrink: 0;
  }

  .tip-text {
    margin: 0;
    font-size: 0.9em;
    line-height: 1.5;
  }

  /* 
    RECOMMENDATIONS SECTION
  */
  .recommendations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .recommendation-card {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }

  .recommendation-card h3 {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 1.1em;
  }

  .level-recommendations {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .level-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #dee2e6;
  }

  .level-label {
    font-weight: 500;
    color: #666;
  }

  .level-value {
    background: #667eea;
    color: white;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.9em;
    font-weight: bold;
  }

  .rest-time {
    font-size: 1.3em;
    font-weight: bold;
    color: #667eea;
    text-align: center;
    margin: 0;
  }

  /* Difficulty Progress */
  .difficulty-progress {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background: #e9ecef;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #28a745, #ffc107, #dc3545);
    transition: width 0.3s ease;
  }

  .difficulty-description {
    font-size: 0.9em;
    color: #666;
    margin: 0;
    text-align: center;
  }

  /* 
    VARIATIONS SECTION
  */
  .variations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 15px;
  }

  .variation-card {
    background: #e3f2fd;
    border: 1px solid #bbdefb;
    border-radius: 8px;
    padding: 15px;
  }

  .variation-name {
    margin: 0 0 8px 0;
    color: #1565c0;
    font-size: 1.1em;
  }

  .variation-description {
    margin: 0;
    color: #424242;
    font-size: 0.9em;
  }

  /* 
    RELATED EXERCISES
  */
  .related-section {
    background: #f8f9fa;
    border: 2px dashed #dee2e6;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
  }

  .related-card {
    background: white;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }

  .related-name a {
    color: #667eea;
    text-decoration: none;
    font-weight: 500;
  }

  .related-name a:hover {
    text-decoration: underline;
  }

  .related-description {
    font-size: 0.9em;
    color: #666;
    margin: 8px 0;
  }

  .related-meta {
    display: flex;
    gap: 10px;
    font-size: 0.8em;
  }

  .related-muscle {
    color: #666;
  }

  /* 
    ACTION BUTTONS
  */
  .action-section {
    background: none;
    box-shadow: none;
    padding: 20px 0;
  }

  .action-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .back-btn {
    background: #6c757d;
    color: white;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 6px;
    transition: background 0.2s;
  }

  .back-btn:hover {
    background: #5a6268;
  }

  .add-to-workout-btn {
    background: #28a745;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
  }

  .add-to-workout-btn:hover {
    background: #218838;
  }

  .create-btn {
    background: #667eea;
    color: white;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 6px;
    transition: background 0.2s;
  }

  .create-btn:hover {
    background: #5a67d8;
  }

  /* 
    ERROR HANDLING
  */
  .error-section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
  }

  .error-card {
    background: white;
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    text-align: center;
    max-width: 500px;
  }

  .error-card h1 {
    color: #dc3545;
    margin-bottom: 15px;
  }

  .error-message {
    color: #721c24;
    font-size: 1.1em;
    margin-bottom: 10px;
  }

  .error-details {
    color: #666;
    font-size: 0.9em;
    margin-bottom: 20px;
  }

  .error-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
  }

  .retry-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
  }

  /* Loading State */
  .loading-section {
    text-align: center;
    padding: 60px 20px;
    color: #666;
  }

  /* 
    RESPONSIVE DESIGN
    Mobile-optimierte Layouts
  */
  @media (max-width: 768px) {
    .exercise-details-page {
      padding: 15px;
    }
    
    .exercise-header {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .exercise-title {
      font-size: 2em;
    }
    
    .tips-grid,
    .recommendations-grid,
    .variations-grid,
    .related-grid {
      grid-template-columns: 1fr;
    }
    
    .action-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .breadcrumb {
      font-size: 0.8em;
    }
  }
</style>