<!-- 
  WORKOUT DETAILS PAGE - MONGODB VERSION
  Zeigt detaillierte Informationen eines einzelnen Workouts aus MongoDB
  Demonstriert Dynamic Routing, Error Handling und Database Integration
-->

<svelte:head>
  <!-- Dynamic SEO Meta Tags -->
  {#if data.workout}
    <title>{data.workout.name} - Workout Details | Fitness Tracker</title>
    <meta name="description" content={data.workout.description}>
    <meta name="keywords" content={data.meta?.keywords || ''}>
  {:else}
    <title>Workout nicht gefunden | Fitness Tracker</title>
  {/if}
</svelte:head>

<div class="workout-details-page">
  
  <!-- 
    ERROR HANDLING
    Zeigt Fehlermeldungen falls Workout nicht geladen werden kann
  -->
  {#if data.error}
    <div class="error-section">
      <div class="error-card">
        <h1>⚠️ Fehler beim Laden des Workouts</h1>
        <p class="error-message">{data.error}</p>
        {#if data.details}
          <p class="error-details">Details: {data.details}</p>
        {/if}
        <div class="error-actions">
          <a href="/workouts" class="back-btn">← Zurück zur Workout-Liste</a>
          <button onclick={() => window.location.reload()} class="retry-btn">
            🔄 Neu versuchen
          </button>
        </div>
      </div>
    </div>

  <!-- 
    MAIN CONTENT - Workout Details
    Conditional Rendering: Nur wenn Workout existiert
  -->
  {:else if data.workout}
    
    <!-- Breadcrumb Navigation -->
    <nav class="breadcrumb">
      <a href="/">🏠 Home</a>
      <span class="separator">›</span>
      <a href="/workouts">💪 Workouts</a>
      <span class="separator">›</span>
      <span class="current">{data.workout.name}</span>
    </nav>

    <!-- Workout Header Section -->
    <header class="workout-header">
      <div class="header-content">
        <div class="title-section">
          <h1 class="workout-title">{data.workout.name}</h1>
          <p class="workout-description">{data.workout.description}</p>
        </div>
        
        <!-- Workout Meta Info -->
        <div class="meta-badges">
          <span class="difficulty-badge difficulty-{data.workout.difficulty.toLowerCase()}">
            {data.workout.difficulty}
          </span>
          
          <span class="muscle-badge">
            🎯 {data.workout.target_muscle}
          </span>
          
          <span class="duration-badge">
            ⏱️ {data.workout.duration} Min
          </span>
        </div>
      </div>

      <!-- Workout Image Placeholder -->
      <div class="workout-image">
        <div class="image-placeholder">
          <span class="placeholder-icon">💪</span>
          <p>Workout Bild</p>
        </div>
      </div>
    </header>

    <!-- 
      MONGODB WORKOUT STATISTICS
      Zeigt berechnete Statistiken aus der Datenbank
    -->
    {#if data.stats}
      <section class="workout-stats">
        <h2>📊 Workout-Statistiken</h2>
        <div class="stats-grid">
          <div class="stat-item">
            <h3>{data.stats.totalExercises}</h3>
            <p>Übungen</p>
          </div>
          <div class="stat-item">
            <h3>{data.stats.estimatedCalories}</h3>
            <p>Geschätzte Kalorien</p>
          </div>
          <div class="stat-item">
            <h3>{data.stats.intensityLevel}</h3>
            <p>Intensität</p>
          </div>
          <div class="stat-item">
            <h3>{data.stats.createdDate}</h3>
            <p>Erstellt am</p>
          </div>
        </div>
      </section>
    {/if}

    <!-- Main Content Grid -->
    <main class="content-grid">
      
      <!-- Workout Details Section -->
      <section class="workout-details-section">
        <h2>📋 Workout-Details</h2>
        <div class="details-content">
          
          <!-- Basic Information -->
          <div class="detail-group">
            <h3>📝 Grundinformationen</h3>
            <div class="detail-item">
              <strong>Name:</strong> {data.workout.name}
            </div>
            <div class="detail-item">
              <strong>Beschreibung:</strong> {data.workout.description}
            </div>
            <div class="detail-item">
              <strong>Dauer:</strong> {data.workout.duration} Minuten
            </div>
            <div class="detail-item">
              <strong>Schwierigkeit:</strong> {data.workout.difficulty}
            </div>
            <div class="detail-item">
              <strong>Ziel-Muskelgruppe:</strong> {data.workout.target_muscle}
            </div>
          </div>

          <!-- Exercise List -->
          {#if data.workout.exercises && data.workout.exercises.length > 0}
            <div class="detail-group">
              <h3>🏋️ Übungen in diesem Workout</h3>
              <div class="exercises-list">
                {#each data.workout.exercises as exercise, index}
                  <div class="exercise-item">
                    <h4>{index + 1}. {exercise.name || exercise.exercise_name || 'Übung ' + (index + 1)}</h4>
                    {#if exercise.sets && exercise.reps}
                      <p><strong>Sets/Reps:</strong> {exercise.sets} × {exercise.reps}</p>
                    {/if}
                    {#if exercise.rest_time}
                      <p><strong>Pause:</strong> {exercise.rest_time} Sekunden</p>
                    {/if}
                    {#if exercise.order}
                      <p><strong>Reihenfolge:</strong> {exercise.order}</p>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          {:else}
            <div class="detail-group">
              <h3>🏋️ Übungen</h3>
              <p class="no-exercises">Diesem Workout wurden noch keine Übungen hinzugefügt.</p>
              <a href="/exercises" class="add-exercises-btn">
                📖 Übungen durchsuchen
              </a>
            </div>
          {/if}

        </div>
      </section>

    </main>

    <!-- 
      RELATED WORKOUTS SECTION
      Zeigt ähnliche Workouts aus MongoDB
    -->
    {#if data.relatedWorkouts && data.relatedWorkouts.length > 0}
      <section class="related-workouts">
        <h2>🔗 Ähnliche Workouts</h2>
        <div class="related-grid">
          {#each data.relatedWorkouts as related}
            <div class="related-card">
              <h3>
                <a href="/workouts/{related.id}">{related.name}</a>
              </h3>
              <p>{related.description}</p>
              <div class="related-meta">
                <span class="duration">⏱️ {related.duration} Min</span>
                <span class="difficulty difficulty-{related.difficulty.toLowerCase()}">
                  {related.difficulty}
                </span>
                <span class="muscle">🎯 {related.target_muscle}</span>
              </div>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    <!-- Action Buttons -->
    <section class="action-section">
      <div class="action-buttons">
        <a href="/workouts" class="back-btn">
          ← Zurück zur Liste
        </a>
        
        <a href="/sessions/start/{data.workout.id}" class="start-btn">
          🚀 Workout starten
        </a>
        
        <a href="/workouts/create" class="create-btn">
          ✏️ Neues Workout erstellen
        </a>
      </div>
    </section>

    <!-- 
      ADMIN ACTIONS (Optional)
      Zusätzliche Admin-Funktionen für Workout-Management
    -->
    <section class="admin-actions">
      <details>
        <summary>🔧 Admin-Aktionen</summary>
        <div class="admin-buttons">
          <a href="/workouts/{data.workout.id}/edit" class="edit-btn">
            ✏️ Workout bearbeiten
          </a>
          <form method="POST" action="?/delete" onsubmit={handleDelete}>
            <button type="submit" class="delete-btn">
              🗑️ Workout löschen
            </button>
          </form>
        </div>
      </details>
    </section>

  <!-- 
    FALLBACK für unbekannte Zustände
  -->
  {:else}
    <div class="loading-section">
      <h1>🔄 Lade Workout...</h1>
      <p>Bitte warten...</p>
    </div>
  {/if}

</div>

<script>
  /* 
    SVELTE 5 RUNES für WORKOUT DETAILS
    Zeigt moderne Svelte 5 Patterns für Detail-Pages mit MongoDB-Daten
  */

  // SvelteKit Navigation Import
  import { goto } from '$app/navigation';

  // Props von Load Function (Svelte 5 Syntax)
  let { data } = $props();

  /* 
    DERIVED VALUES (Svelte 5)
    Berechnete Werte basierend auf Props
  */
  let hasWorkout = $derived(!!data.workout);
  let workoutTitle = $derived(data.workout?.name || 'Workout nicht gefunden');
  let hasExercises = $derived(data.workout?.exercises && data.workout.exercises.length > 0);
  let hasRelated = $derived(data.relatedWorkouts && data.relatedWorkouts.length > 0);
  let hasStats = $derived(!!data.stats);

  /* 
    INTERACTION FUNCTIONS
    Event Handlers und Navigation
  */

  // Workout löschen mit Bestätigung
  function handleDelete(event) {
    const confirmed = confirm(`Workout "${data.workout.name}" wirklich löschen?\n\nDiese Aktion kann nicht rückgängig gemacht werden.`);
    
    if (!confirmed) {
      event.preventDefault(); // Verhindert Form-Submit
      console.log('🚫 Workout-Löschung abgebrochen');
      return false;
    }
    
    console.log('🗑️ Workout wird gelöscht:', data.workout.name);
    return true; // Erlaubt Form-Submit
  }
  
  // Workout starten
  function startWorkout() {
    if (data.workout) {
      console.log('🚀 Starting workout:', data.workout.name);
      goto(`/sessions/start/${data.workout.id}`);
    }
  }

  // Exercise zu Workout hinzufügen (für später)
  function addExercise() {
    if (data.workout) {
      console.log('➕ Adding exercise to workout:', data.workout.id);
      goto(`/exercises?add_to=${data.workout.id}`);
    }
  }

  // Workout teilen (für später)
  function shareWorkout() {
    if (data.workout && navigator.share) {
      navigator.share({
        title: data.workout.name,
        text: data.workout.description,
        url: window.location.href
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Workout-Link in Zwischenablage kopiert!');
    }
  }

  /* 
    SVELTE 5 EFFECTS
    Side Effects für Analytics und Debugging
  */
  $effect(() => {
    if (hasWorkout) {
      console.log('📖 Workout Details geladen:', {
        name: data.workout.name,
        id: data.workout.id,
        difficulty: data.workout.difficulty,
        hasExercises,
        hasRelated,
        hasStats
      });
      
      // Simuliert Page View Analytics
      console.log('📈 Analytics: Workout Detail View', {
        workoutId: data.workout.id,
        workoutName: data.workout.name,
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
  .workout-details-page {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    line-height: 1.6;
  }

  /* 
    BREADCRUMB NAVIGATION
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
    WORKOUT HEADER
  */
  .workout-header {
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

  .workout-title {
    margin: 0;
    font-size: 2.5em;
    font-weight: bold;
  }

  .workout-description {
    font-size: 1.2em;
    opacity: 0.9;
    margin: 0;
  }

  .meta-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .difficulty-badge, .muscle-badge, .duration-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.9em;
    font-weight: bold;
    background: rgba(255, 255, 255, 0.2);
  }

  .difficulty-leicht { background: rgba(40, 167, 69, 0.8); }
  .difficulty-mittel { background: rgba(255, 193, 7, 0.8); }
  .difficulty-schwer { background: rgba(220, 53, 69, 0.8); }

  /* Workout Image */
  .workout-image {
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
    WORKOUT STATISTICS (MongoDB)
  */
  .workout-stats {
    background: #f8f9fa;
    padding: 25px;
    border-radius: 12px;
    margin-bottom: 30px;
  }

  .workout-stats h2 {
    margin-top: 0;
    color: #333;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    margin-top: 15px;
  }
  
  .stat-item {
    background: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .stat-item h3 {
    margin: 0;
    font-size: 2em;
    color: #667eea;
    font-weight: bold;
  }
  
  .stat-item p {
    margin: 5px 0 0 0;
    color: #666;
    font-size: 0.9em;
  }

  /* 
    CONTENT GRID
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
    WORKOUT DETAILS SECTION
  */
  .details-content {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .detail-group {
    background: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
  }

  .detail-group h3 {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 1.2em;
  }

  .detail-item {
    margin-bottom: 10px;
    padding: 8px 0;
    border-bottom: 1px solid #e9ecef;
  }

  .detail-item:last-child {
    border-bottom: none;
  }

  /* 
    EXERCISES LIST
  */
  .exercises-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .exercise-item {
    background: white;
    border: 1px solid #dee2e6;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }

  .exercise-item h4 {
    margin: 0 0 8px 0;
    color: #333;
  }

  .exercise-item p {
    margin: 4px 0;
    font-size: 0.9em;
    color: #666;
  }

  .no-exercises {
    text-align: center;
    color: #666;
    font-style: italic;
    margin: 20px 0;
  }

  .add-exercises-btn {
    display: inline-block;
    background: #28a745;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
    transition: background 0.2s;
  }

  .add-exercises-btn:hover {
    background: #218838;
  }

  /* 
    RELATED WORKOUTS
  */
  .related-workouts {
    background: #fff;
    border: 2px dashed #e9ecef;
    margin-bottom: 30px;
  }
  
  .related-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 15px;
  }
  
  .related-card {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }
  
  .related-card h3 {
    margin: 0 0 8px 0;
  }
  
  .related-card h3 a {
    color: #667eea;
    text-decoration: none;
  }
  
  .related-card h3 a:hover {
    text-decoration: underline;
  }
  
  .related-card p {
    margin: 0 0 10px 0;
    font-size: 0.9em;
    color: #666;
  }
  
  .related-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    font-size: 0.8em;
  }

  .related-meta span {
    padding: 2px 6px;
    border-radius: 10px;
    background: #e9ecef;
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

  .start-btn {
    background: #ff3e00;
    color: white;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
    transition: background 0.2s;
  }

  .start-btn:hover {
    background: #e63900;
  }

  .create-btn {
    background: #28a745;
    color: white;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 6px;
    transition: background 0.2s;
  }

  .create-btn:hover {
    background: #218838;
  }

  /* 
    ADMIN ACTIONS
  */
  .admin-actions {
    margin-top: 30px;
    padding: 20px;
    background: #fff3cd;
    border-radius: 8px;
    border: 1px solid #ffeaa7;
  }

  .admin-actions summary {
    cursor: pointer;
    font-weight: bold;
    color: #856404;
  }
  
  .admin-buttons {
    display: flex;
    gap: 15px;
    margin-top: 15px;
  }
  
  .edit-btn {
    background: #ffc107;
    color: #212529;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
    transition: background 0.2s;
  }

  .edit-btn:hover {
    background: #e0a800;
  }
  
  .delete-btn {
    background: #dc3545;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
  }
  
  .delete-btn:hover {
    background: #c82333;
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
  */
  @media (max-width: 768px) {
    .workout-details-page {
      padding: 15px;
    }
    
    .workout-header {
      grid-template-columns: 1fr;
      text-align: center;
    }
    
    .workout-title {
      font-size: 2em;
    }
    
    .stats-grid,
    .related-grid {
      grid-template-columns: 1fr;
    }
    
    .action-buttons {
      flex-direction: column;
      align-items: center;
    }
    
    .admin-buttons {
      flex-direction: column;
    }
  }
</style>