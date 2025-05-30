<!-- 
  EXERCISE LISTE PAGE - SVELTE 5 RUNES VERSION
  Zeigt alle verfügbaren Übungen mit Filteroptionen
  Demonstriert komplexe UI-Interaktionen und URL-Parameter Handling
-->

<svelte:head>
  <title>💪 Exercise Database - Fitness Tracker</title>
  <meta name="description" content="Durchsuche und filtere Fitness-Übungen nach Muskelgruppe, Schwierigkeit und mehr.">
</svelte:head>

<div class="exercises-page">
  <header class="page-header">
    <h1>🏋️ Exercise Database</h1>
    <p>Entdecke {data.totalCount} Übungen für dein Training</p>
  </header>

  <!-- 
    ERROR HANDLING
    Zeigt Fehlermeldungen vom Server
  -->
  {#if data.error}
    <div class="error-banner">
      ⚠️ {data.error}
      <button onclick={() => window.location.reload()}>
        🔄 Neu laden
      </button>
    </div>
  {/if}

  <!-- 
    STATISTICS DASHBOARD
    Zeigt Exercise-Statistiken aus Load Function
  -->
  {#if data.stats && data.stats.total > 0}
    <section class="stats-dashboard">
      <h2>📊 Exercise Statistiken</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <h3>{data.stats.total}</h3>
          <p>Übungen verfügbar</p>
        </div>
        <div class="stat-card">
          <h3>{Object.keys(data.stats.byMuscleGroup).length}</h3>
          <p>Muskelgruppen</p>
        </div>
        <div class="stat-card">
          <h3>{Object.keys(data.stats.byDifficulty).length}</h3>
          <p>Schwierigkeitsgrade</p>
        </div>
        <div class="stat-card">
          <h3>{data.filteredCount}</h3>
          <p>Gefilterte Ergebnisse</p>
        </div>
      </div>
    </section>
  {/if}

  <!-- 
    FILTER CONTROLS
    Interaktive Filter mit URL-Parameter Updates
    Zeigt Svelte 5 Event Handling und Form Control
  -->
  <section class="filter-section">
    <h2>🔍 Filter & Suche</h2>
    
    <form class="filter-form" method="GET">
      <!-- 
        SEARCH INPUT
        Bind:value mit Svelte 5 Runes für Reactivity
      -->
      <div class="search-group">
        <label for="search">Suche:</label>
        <input 
          type="text" 
          id="search"
          name="search"
          bind:value={searchValue}
          placeholder="Übungsname, Muskelgruppe..."
          class="search-input"
        />
      </div>

      <!-- 
        FILTER DROPDOWNS
        Dynamisch generiert aus Server-Daten
      -->
      <div class="filter-controls">
        <!-- Muskelgruppe Filter -->
        <div class="filter-group">
          <label for="muscle_group">Muskelgruppe:</label>
          <select 
            id="muscle_group" 
            name="muscle_group"
            bind:value={muscleGroupFilter}
            class="filter-select"
          >
            <option value="">Alle Muskelgruppen</option>
            {#each data.filters.muscleGroups as muscleGroup}
              <option value={muscleGroup}>{muscleGroup}</option>
            {/each}
          </select>
        </div>

        <!-- Schwierigkeit Filter -->
        <div class="filter-group">
          <label for="difficulty">Schwierigkeit:</label>
          <select 
            id="difficulty" 
            name="difficulty"
            bind:value={difficultyFilter}
            class="filter-select"
          >
            <option value="">Alle Schwierigkeiten</option>
            {#each data.filters.difficulties as difficulty}
              <option value={difficulty}>{difficulty}</option>
            {/each}
          </select>
        </div>

        <!-- Kategorie Filter -->
        <div class="filter-group">
          <label for="category">Kategorie:</label>
          <select 
            id="category" 
            name="category"
            bind:value={categoryFilter}
            class="filter-select"
          >
            <option value="">Alle Kategorien</option>
            {#each data.categories as category}
              <option value={category.id}>{category.name}</option>
            {/each}
          </select>
        </div>
      </div>

      <!-- 
        FILTER ACTION BUTTONS
        Svelte 5 Event Handlers
      -->
      <div class="filter-actions">
        <button type="button" class="apply-btn" onclick={applyFilters}>
          🔍 Filter anwenden
        </button>
        <button type="button" class="clear-btn" onclick={clearFilters}>
          🗑️ Filter zurücksetzen
        </button>
      </div>
    </form>
  </section>

  <!-- 
    EXERCISES GRID
    Responsive Layout für Exercise Cards
  -->
  <section class="exercises-section">
    <h2>💪 Übungen ({data.filteredCount})</h2>
    
    <!-- Exercise Grid -->
    <div class="exercises-grid">
      {#each data.exercises as exercise}
        <article class="exercise-card">
          <!-- Exercise Header -->
          <div class="exercise-header">
            <h3 class="exercise-name">{exercise.name}</h3>
            <span class="difficulty-badge difficulty-{exercise.difficulty.toLowerCase()}">
              {exercise.difficulty}
            </span>
          </div>

          <!-- Exercise Meta Info -->
          <div class="exercise-meta">
            <span class="muscle-group">🎯 {exercise.muscle_group}</span>
            <span class="equipment">🏋️ {exercise.equipment}</span>
          </div>

          <!-- Exercise Description -->
          <p class="exercise-description">{exercise.description}</p>

          <!-- Instructions Preview -->
          <div class="instructions-preview">
            <h4>📋 Ausführung:</h4>
            <p>{exercise.instructions.substring(0, 100)}...</p>
          </div>

          <!-- Exercise Actions -->
          <div class="exercise-actions">
            <a href="/exercises/{exercise.id}" class="details-btn">
              📖 Details
            </a>
            <button 
              type="button" 
              class="add-to-workout-btn"
              onclick={() => addToWorkout(exercise)}
            >
              ➕ Zu Workout
            </button>
          </div>

          <!-- Category Badge -->
          <div class="category-badge">
            {#each data.categories as category}
              {#if category.id === exercise.category_id}
                <span class="category-tag" style="background-color: {category.color};">
                  {category.name}
                </span>
              {/if}
            {/each}
          </div>
        </article>
      {/each}
    </div>

    <!-- Empty State -->
    {#if data.exercises.length === 0 && !data.error}
      <div class="empty-state">
        <h3>🔍 Keine Übungen gefunden</h3>
        <p>Probiere andere Filter oder erstelle eine neue Übung.</p>
        <a href="/exercises/create" class="create-btn">
          ➕ Neue Übung erstellen
        </a>
      </div>
    {/if}
  </section>

  <!-- 
    FLOATING ACTION BUTTON
    Immer sichtbarer Button zum Erstellen
  -->
  <a href="/exercises/create" class="fab">
    ➕
  </a>
</div>

<script>
  /* 
    SVELTE 5 RUNES für EXERCISE LIST MANAGEMENT
    Zeigt moderne Svelte 5 Patterns für komplexe UI
  */

  // SvelteKit Imports
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  // Props von Load Function (Svelte 5 Syntax)
  let { data } = $props();

  /* 
    SVELTE 5 STATE MANAGEMENT
    Reactive Variablen für Filter-Zustand
  */
  let searchValue = $state(data.filters.applied.search || '');
  let muscleGroupFilter = $state(data.filters.applied.muscle_group || '');
  let difficultyFilter = $state(data.filters.applied.difficulty || '');
  let categoryFilter = $state(data.filters.applied.category || '');

  /* 
    DERIVED VALUES (Svelte 5)
    Berechnete Werte basierend auf State
    Ersetzt die alte $: Syntax
  */
  let hasActiveFilters = $derived(
    searchValue || muscleGroupFilter || difficultyFilter || categoryFilter
  );

  let filteredExerciseCount = $derived(data.exercises?.length || 0);

  /* 
    FILTER FUNCTIONS
    URL-basierte Navigation für Filter-Persistenz
  */
  
  // Filter anwenden durch URL-Update
  function applyFilters() {
    console.log('🔍 Filter angewendet:', {
      search: searchValue,
      muscle_group: muscleGroupFilter,
      difficulty: difficultyFilter,
      category: categoryFilter
    });

    // URL Search Params erstellen
    const params = new URLSearchParams();
    
    if (searchValue) params.set('search', searchValue);
    if (muscleGroupFilter) params.set('muscle_group', muscleGroupFilter);
    if (difficultyFilter) params.set('difficulty', difficultyFilter);
    if (categoryFilter) params.set('category', categoryFilter);

    // Navigation mit neuen Parametern
    const newUrl = params.toString() ? `/exercises?${params.toString()}` : '/exercises';
    goto(newUrl);
  }

  // Alle Filter zurücksetzen
  function clearFilters() {
    console.log('🗑️ Filter zurückgesetzt');
    
    // State zurücksetzen
    searchValue = '';
    muscleGroupFilter = '';
    difficultyFilter = '';
    categoryFilter = '';

    // Zur ungefilterten URL navigieren
    goto('/exercises');
  }

  /* 
    EXERCISE INTERACTION FUNCTIONS
    Zeigt Komponentenkommunikation
  */
  
  // Exercise zu Workout hinzufügen
  function addToWorkout(exercise) {
    console.log('➕ Exercise zu Workout hinzufügen:', exercise.name);
    
    // TODO: Modal oder Dropdown für Workout-Auswahl
    // Aktuell: Einfache Browser-Benachrichtigung
    alert(`"${exercise.name}" wird zu deinem Workout hinzugefügt! (Feature kommt bald)`);
  }

  /* 
    SVELTE 5 EFFECTS
    Side Effects für Debugging und Analytics
  */
  $effect(() => {
    console.log('📊 Exercise Page State:', {
      totalExercises: data.totalCount,
      filteredCount: filteredExerciseCount,
      hasActiveFilters,
      currentFilters: {
        search: searchValue,
        muscle_group: muscleGroupFilter,
        difficulty: difficultyFilter,
        category: categoryFilter
      }
    });
  });

  // Page View Analytics (simuliert)
  $effect(() => {
    // Simuliert Analytics Tracking
    console.log('📈 Page View: Exercises List', {
      timestamp: new Date().toISOString(),
      filterCount: hasActiveFilters ? 1 : 0
    });
  });
</script>

<style>
  /* 
    MAIN LAYOUT
    CSS Grid für responsive Exercise-Layout
  */
  .exercises-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .page-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .page-header h1 {
    margin-bottom: 8px;
    color: var(--text-primary);
  }

  .page-header p {
    color: var(--text-secondary);
    font-size: 1.1em;
  }

  /* 
    STATISTICS DASHBOARD
    Grid Layout für Stats-Cards
  */
  .stats-dashboard {
    background: var(--gradient-primary);
    color: white;
    padding: 25px;
    border-radius: var(--radius-xl);
    margin-bottom: 30px;
    box-shadow: var(--shadow-md);
  }

  .stats-dashboard h2 {
    margin-bottom: 20px;
    text-align: center;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
  }

  .stat-card {
    background: rgba(255,255,255,0.1);
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    backdrop-filter: blur(10px);
  }

  .stat-card h3 {
    margin: 0;
    font-size: 2.5em;
    font-weight: bold;
  }

  .stat-card p {
    margin: 10px 0 0 0;
    opacity: 0.9;
  }

  /* 
    FILTER SECTION
    Flexbox Layout für Filter-Controls
  */
  .filter-section {
    background-color: var(--bg-secondary);
    padding: 20px;
    border-radius: var(--radius-lg);
    margin-bottom: 30px;
  }

  .filter-section h2 {
    color: var(--text-primary);
    margin-top: 0;
    margin-bottom: 20px;
  }

  .filter-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .search-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .search-input {
    width: 100%;
    padding: 10px 15px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }

  .search-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }

  .filter-controls {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .filter-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: var(--text-primary);
  }

  .filter-select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    font-size: var(--font-size-base);
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }

  .filter-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
  }

  .apply-btn {
    background: #667eea;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: var(--radius-md);
    cursor: pointer;
    font-weight: 600;
    transition: background-color var(--transition-normal);
  }

  .apply-btn:hover {
    background: #5a67d8;
  }

  .clear-btn {
    background: #6c757d;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background 0.2s;
  }

  .clear-btn:hover {
    background: #5a6268;
  }
  /* 
    EXERCISES GRID
    Responsive Card Layout
  */
  .exercises-section h2 {
    margin-bottom: 25px;
    color: var(--text-primary);
  }

  .exercises-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }

  /* 
    EXERCISE CARD STYLING
    Card Design mit Hover-Effekten
  */
  .exercise-card {
    background-color: var(--card-bg);
    border-radius: var(--radius-lg);
    padding: 20px;
    box-shadow: var(--shadow-sm);
    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
    border: 1px solid var(--border-color);
  }

  .exercise-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
  }

  .exercise-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
  }

  .exercise-header h3 {
    margin: 0 0 5px 0;
    font-size: var(--font-size-lg);
    color: var(--text-primary);
  }

  /* Difficulty Badges */
  .difficulty-badge {
    padding: 4px 10px;
    border-radius: 15px;
    font-size: var(--font-size-xs);
    font-weight: 600;
  }

  .difficulty-leicht { background: var(--success-light); color: var(--success-dark); }
  .difficulty-mittel { background: var(--warning-light); color: var(--warning-dark); }
  .difficulty-schwer { background: var(--danger-light); color: var(--danger-dark); }

  .exercise-meta {
    font-size: var(--font-size-sm);
    color: var(--text-muted);
    margin-bottom: 12px;
  }

  .exercise-description {
    font-size: var(--font-size-base);
    line-height: 1.5;
    color: var(--text-secondary);
    margin-bottom: 15px;
  }
  .instructions-preview {
    background: var(--bg-secondary);
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    border: 1px solid var(--border-color);
  }

  .instructions-preview h4 {
    margin: 0 0 8px 0;
    color: var(--text-primary);
    font-size: 0.9em;
  }

  .instructions-preview p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.9em;
    line-height: 1.4;
  }  /* Exercise Actions */
  .exercise-actions {
    display: flex;
    gap: 10px;
    margin-bottom: 0;
  }

  .details-btn {
    flex: 1;
    background-color: var(--primary-color);
    color: white;
    padding: 10px 16px;
    text-align: center;
    text-decoration: none;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: 500;
    transition: all var(--transition-normal);
    border: none;
    cursor: pointer;
  }

  .details-btn:hover {
    background-color: var(--primary-dark-color);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  .add-to-workout-btn {
    flex: 1;
    background-color: var(--success-color);
    color: white;
    padding: 10px 16px;
    text-align: center;
    border-radius: var(--radius-md);
    font-size: var(--font-size-sm);
    font-weight: 500;
    transition: all var(--transition-normal);
    border: none;
    cursor: pointer;
  }
  .add-to-workout-btn:hover {
    background-color: #218838;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  }

  /* Category Badge */
  .category-badge {
    margin-top: 15px;
    display: flex;
    justify-content: flex-end;
  }

  .category-tag {
    display: inline-block;
    padding: 4px 8px;
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    font-weight: 500;
    color: white;
    opacity: 0.9;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    gap: 8px;
  }

  .page-btn {
    padding: 8px 12px;
    background-color: var(--bg-secondary);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background-color var(--transition-normal);
  }

  .page-btn:hover:not(.active) {
    background-color: var(--bg-tertiary);
  }

  .page-btn.active {
    background-color: var(--primary);
    color: white;
    border-color: var(--primary);
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--text-secondary);
  }

  .empty-state h3 {
    margin-bottom: 15px;
    color: var(--text-primary);
  }
  .create-btn {
    background: var(--success-color);
    color: white;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 6px;
    display: inline-block;
    margin-top: 20px;
    font-weight: bold;
    transition: background-color var(--transition-normal);
  }

  .create-btn:hover {
    background: var(--success-dark);
  }

  /* Floating Action Button */
  .fab {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    text-decoration: none;
    box-shadow: var(--shadow-lg);
    transition: all 0.2s;
    z-index: 1000;
  }

  .fab:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-xl);
  }

  /* Error Banner */
  .error-banner {
    background-color: var(--error-bg);
    color: var(--error-text);
    padding: 15px;
    border-radius: var(--radius-lg);
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .error-banner button {
    background-color: var(--error-text);
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: var(--radius-sm);
    cursor: pointer;
  }

  /* 
    RESPONSIVE DESIGN
    Mobile-optimierte Layouts
  */
  @media (max-width: 768px) {
    .exercises-page {
      padding: 15px;
    }
    
    .exercises-grid {
      grid-template-columns: 1fr;
    }
    
    .filter-controls {
      grid-template-columns: 1fr;
    }
    
    .filter-actions {
      flex-direction: column;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .fab {
      bottom: 20px;
      right: 20px;
      width: 50px;
      height: 50px;
      font-size: 20px;
    }
  }
</style>