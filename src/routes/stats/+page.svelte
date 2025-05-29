<!-- 
  STATISTICS DASHBOARD - SVELTE 5 RUNES VERSION
  Zeigt umfassende Fitness-Statistiken und Analytics
  Demonstriert komplexe Data Visualization und State Management
-->

<svelte:head>
  <title>📊 Statistiken - Fitness Tracker</title>
  <meta name="description" content="Deine Fitness-Statistiken und Fortschritt im Überblick">
</svelte:head>

<div class="stats-page">
  <header class="page-header">
    <h1>📊 Deine Fitness-Statistiken</h1>
    <p>Behalte den Überblick über deinen Trainingsfortschritt</p>
    {#if data.lastUpdated}
      <small class="last-updated">
        Letzte Aktualisierung: {new Date(data.lastUpdated).toLocaleString('de-DE')}
      </small>
    {/if}
  </header>

  <!-- 
    ERROR HANDLING
    Zeigt Fehlermeldungen bei Loading-Problemen
  -->
  {#if data.error}
    <div class="error-banner">
      ⚠️ {data.error}
      <button onclick={() => window.location.reload()}>
        🔄 Neu laden
      </button>
    </div>
  {:else if data.stats}
    
    <!-- 
      OVERVIEW STATISTICS
      Hauptmetriken in Card-Layout
    -->
    <section class="overview-section">
      <h2>🎯 Überblick</h2>
      <div class="overview-grid">
        
        <!-- Workouts Overview -->
        <div class="stat-card workout-stats">
          <div class="stat-header">
            <h3>💪 Workouts</h3>
            <span class="stat-icon">💪</span>
          </div>
          <div class="stat-content">
            <div class="main-stat">
              <span class="stat-number">{data.stats.workouts.total}</span>
              <span class="stat-label">Workouts verfügbar</span>
            </div>
            <div class="sub-stats">
              <div class="sub-stat">
                <span class="sub-number">{data.stats.workouts.avgDuration}min</span>
                <span class="sub-label">Ø Dauer</span>
              </div>
              <div class="sub-stat">
                <span class="sub-number">{Math.round(data.stats.workouts.totalDuration / 60)}h</span>
                <span class="sub-label">Gesamt</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Goals Overview -->
        <div class="stat-card goal-stats">
          <div class="stat-header">
            <h3>🎯 Goals</h3>
            <span class="stat-icon">🎯</span>
          </div>
          <div class="stat-content">
            <div class="main-stat">
              <span class="stat-number">{data.stats.goals.total}</span>
              <span class="stat-label">Goals gesetzt</span>
            </div>
            <div class="sub-stats">
              <div class="sub-stat success">
                <span class="sub-number">{data.stats.goals.achieved}</span>
                <span class="sub-label">Erreicht</span>
              </div>
              <div class="sub-stat info">
                <span class="sub-number">{data.stats.goals.inProgress}</span>
                <span class="sub-label">In Arbeit</span>
              </div>
            </div>
            <!-- Goal Achievement Rate -->
            <div class="progress-indicator">
              <div class="progress-bar">
                <div 
                  class="progress-fill"
                  style="width: {data.stats.goals.achievementRate}%"
                ></div>
              </div>
              <span class="progress-label">{data.stats.goals.achievementRate}% Erfolgsrate</span>
            </div>
          </div>
        </div>

        <!-- Exercises Overview -->
        <div class="stat-card exercise-stats">
          <div class="stat-header">
            <h3>🏋️ Exercises</h3>
            <span class="stat-icon">🏋️</span>
          </div>
          <div class="stat-content">
            <div class="main-stat">
              <span class="stat-number">{data.stats.exercises.total}</span>
              <span class="stat-label">Exercises verfügbar</span>
            </div>
            <div class="sub-stats">
              <div class="sub-stat">
                <span class="sub-number">{Object.keys(data.stats.exercises.byMuscleGroup).length}</span>
                <span class="sub-label">Muskelgruppen</span>
              </div>
              <div class="sub-stat">
                <span class="sub-number">{data.stats.categories.length}</span>
                <span class="sub-label">Kategorien</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Overview -->
        <div class="stat-card progress-stats">
          <div class="stat-header">
            <h3>📈 Fortschritt</h3>
            <span class="stat-icon">📈</span>
          </div>
          <div class="stat-content">
            <div class="main-stat">
              <span class="stat-number">{data.stats.goals.avgProgress}%</span>
              <span class="stat-label">Ø Goal-Fortschritt</span>
            </div>
            <div class="circular-progress">
              <svg class="progress-ring" width="80" height="80">
                <circle
                  class="progress-ring-circle"
                  stroke="#e5e7eb"
                  stroke-width="8"
                  fill="transparent"
                  r="30"
                  cx="40"
                  cy="40"
                />
                <circle
                  class="progress-ring-circle progress-ring-fill"
                  stroke="#667eea"
                  stroke-width="8"
                  fill="transparent"
                  r="30"
                  cx="40"
                  cy="40"
                  style="stroke-dasharray: {circumference}; stroke-dashoffset: {circumference - (circumference * data.stats.goals.avgProgress) / 100}"
                />
              </svg>
              <div class="progress-text">
                <span class="progress-percentage">{data.stats.goals.avgProgress}%</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- 
      DETAILED BREAKDOWN SECTIONS
      Aufschlüsselung nach Kategorien
    -->
    <section class="breakdown-section">
      <h2>📋 Detaillierte Aufschlüsselung</h2>
      
      <div class="breakdown-grid">
        
        <!-- Workouts by Difficulty -->
        <div class="breakdown-card">
          <h3>💪 Workouts nach Schwierigkeit</h3>
          <div class="chart-container">
            {#each Object.entries(data.stats.workouts.byDifficulty) as [difficulty, count]}
              <div class="chart-bar">
                <div class="bar-info">
                  <span class="bar-label">{difficulty}</span>
                  <span class="bar-value">{count}</span>
                </div>
                <div class="bar-visual">
                  <div 
                    class="bar-fill difficulty-{difficulty.toLowerCase()}"
                    style="width: {(count / Math.max(...Object.values(data.stats.workouts.byDifficulty))) * 100}%"
                  ></div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Goals by Type - CORRECTED ACHIEVEMENT RATE -->
        <div class="breakdown-card">
          <h3>🎯 Goals nach Typ</h3>
          <small class="chart-subtitle">Bars zeigen Erfolgsquote pro Typ</small>
          <div class="chart-container">
            {#if data.stats.goalTypeStats && data.stats.goalTypeStats.length > 0}
              <!-- NEW: Use goalTypeStats with German labels and achievement rates -->
              {#each data.stats.goalTypeStats as stat}
                <div class="goal-type-item mb-3">
                  <div class="bar-info">
                    <span class="bar-label">{stat.label}</span>
                    <span class="bar-value">{stat.count} ({stat.achieved} ✅)</span>
                  </div>
                  
                  <!-- CORRECTED: Bar shows Achievement Rate, not Total Count -->
                  <div class="bar-visual-new">
                    <div class="progress-container">
                      <div 
                        class="progress-bar-achievement"
                        class:achievement-excellent={stat.completionRate >= 80}
                        class:achievement-good={stat.completionRate >= 60 && stat.completionRate < 80}
                        class:achievement-fair={stat.completionRate >= 40 && stat.completionRate < 60}
                        class:achievement-poor={stat.completionRate < 40}
                        style="width: {stat.completionRate}%"
                      >
                        <!-- Show percentage in bar if > 15% -->
                        {#if stat.completionRate > 15}
                          <span class="achievement-text">{stat.completionRate}%</span>
                        {/if}
                      </div>
                    </div>
                    <!-- Achievement rate as text -->
                    <small class="achievement-rate-text {stat.completionRate >= 50 ? 'text-success' : 'text-muted'}">
                      {stat.completionRate}% Erfolgsquote
                    </small>
                  </div>
                  
                  <!-- Achievement breakdown -->
                  <div class="achievement-breakdown">
                    <div class="breakdown-item">
                      <span class="breakdown-dot achieved"></span>
                      <span class="breakdown-text">{stat.achieved} erreicht</span>
                    </div>
                    <div class="breakdown-item">
                      <span class="breakdown-dot in-progress"></span>
                      <span class="breakdown-text">{stat.count - stat.achieved} in Arbeit</span>
                    </div>
                    <div class="breakdown-item">
                      <span class="breakdown-total">Gesamt: {stat.count}</span>
                    </div>
                  </div>
                </div>
              {/each}
            {:else}
              <!-- FALLBACK: Use old data structure if goalTypeStats not available -->
              {#each Object.entries(data.stats.goals.byType) as [type, typeData]}
                <div class="chart-bar">
                  <div class="bar-info">
                    <span class="bar-label">{type}</span>
                    <span class="bar-value">{typeData.total} ({typeData.achieved} ✅)</span>
                  </div>
                  <div class="bar-visual">
                    <!-- CORRECTED: Show achievement rate instead of total count -->
                    <div 
                      class="bar-fill achievement-rate-bar"
                      style="width: {typeData.total > 0 ? (typeData.achieved / typeData.total) * 100 : 0}%"
                    >
                      {#if typeData.total > 0 && (typeData.achieved / typeData.total) * 100 > 15}
                        <span class="bar-text">{Math.round((typeData.achieved / typeData.total) * 100)}%</span>
                      {/if}
                    </div>
                  </div>
                </div>
              {/each}
            {/if}
          </div>
        </div>

        <!-- Exercises by Muscle Group -->
        <div class="breakdown-card">
          <h3>🏋️ Exercises nach Muskelgruppe</h3>
          <div class="chart-container">
            {#each Object.entries(data.stats.exercises.byMuscleGroup) as [muscle, count]}
              <div class="chart-bar">
                <div class="bar-info">
                  <span class="bar-label">{muscle}</span>
                  <span class="bar-value">{count}</span>
                </div>
                <div class="bar-visual">
                  <div 
                    class="bar-fill muscle-group"
                    style="width: {(count / Math.max(...Object.values(data.stats.exercises.byMuscleGroup))) * 100}%"
                  ></div>
                </div>
              </div>
            {/each}
          </div>
        </div>

        <!-- Categories Overview -->
        <div class="breakdown-card">
          <h3>📂 Exercise Kategorien</h3>
          <div class="categories-grid">
            {#each data.stats.categories as category}
              <div class="category-item">
                <div 
                  class="category-color"
                  style="background-color: {category.color}"
                ></div>
                <span class="category-name">{category.name}</span>
                <span class="category-count">{category.exerciseCount}</span>
              </div>
            {/each}
          </div>
        </div>

      </div>
    </section>

    <!-- 
      RECENT ACTIVITY SECTION
      Timeline der letzten Aktivitäten
    -->
    {#if data.recentActivity}
      <section class="activity-section">
        <h2>🕒 Letzte Aktivitäten</h2>
        
        <div class="activity-grid">
          
          <!-- Recent Goals -->
          <div class="activity-card">
            <h3>🎯 Letzte Goal-Updates</h3>
            <div class="activity-list">
              {#each data.recentActivity.goals as goal}
                <div class="activity-item">
                  <div class="activity-icon">🎯</div>
                  <div class="activity-content">
                    <div class="activity-title">{goal.title}</div>
                    <div class="activity-meta">
                      <span class="activity-progress">{goal.progress}% Fortschritt</span>
                      <span class="activity-date">
                        {new Date(goal.updated).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                  </div>
                  <div class="activity-progress-bar">
                    <div 
                      class="activity-progress-fill"
                      style="width: {goal.progress}%"
                    ></div>
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <!-- Recent Workouts -->
          <div class="activity-card">
            <h3>💪 Neue Workouts</h3>
            <div class="activity-list">
              {#each data.recentActivity.workouts as workout}
                <div class="activity-item">
                  <div class="activity-icon">💪</div>
                  <div class="activity-content">
                    <div class="activity-title">{workout.name}</div>
                    <div class="activity-meta">
                      <span class="difficulty-tag difficulty-{workout.difficulty.toLowerCase()}">
                        {workout.difficulty}
                      </span>
                      <span class="activity-date">
                        {new Date(workout.created).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                  </div>
                  <a href="/workouts/{workout.id}" class="activity-action">
                    Ansehen
                  </a>
                </div>
              {/each}
            </div>
          </div>

        </div>
      </section>
    {/if}

    <!-- 
      QUICK ACTIONS
      Schnellzugriff für häufige Aktionen
    -->
    <section class="actions-section">
      <h2>⚡ Quick Actions</h2>
      <div class="actions-grid">
        <a href="/goals/create" class="action-card goal-action">
          <div class="action-icon">🎯</div>
          <h3>Neues Goal</h3>
          <p>Setze dir ein neues Fitness-Ziel</p>
        </a>
        
        <a href="/workouts/create" class="action-card workout-action">
          <div class="action-icon">💪</div>
          <h3>Workout erstellen</h3>
          <p>Erstelle einen neuen Trainingsplan</p>
        </a>
        
        <a href="/exercises" class="action-card exercise-action">
          <div class="action-icon">🏋️</div>
          <h3>Exercises durchsuchen</h3>
          <p>Entdecke neue Übungen</p>
        </a>
        
        <button onclick={refreshStats} class="action-card refresh-action">
          <div class="action-icon">🔄</div>
          <h3>Statistiken aktualisieren</h3>
          <p>Lade die neuesten Daten</p>
        </button>
      </div>
    </section>

  {:else}
    <!-- Loading State -->
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <h3>📊 Statistiken werden geladen...</h3>
      <p>Einen Moment bitte, während wir deine Daten analysieren.</p>
    </div>
  {/if}

</div>

<script>
  /* 
    SVELTE 5 RUNES für STATISTICS DASHBOARD
    Moderne State Management und Interaktivität
  */

  // SvelteKit Imports
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  // Props von Load Function (Svelte 5 Syntax)
  let { data } = $props();

  /* 
    SVELTE 5 STATE für UI-Interaktionen
    Dashboard-spezifische State Variablen
  */
  let isRefreshing = $state(false);
  let selectedTimeframe = $state('all');
  let showDetails = $state(false);

  /* 
    DERIVED VALUES (Svelte 5)
    Berechnete Werte für UI-Elemente
  */
  let circumference = $derived(2 * Math.PI * 30); // Für Circular Progress

  let hasData = $derived(
    data.stats && 
    (data.stats.workouts.total > 0 || data.stats.goals.total > 0 || data.stats.exercises.total > 0)
  );

  let totalActivities = $derived(
    data.recentActivity ? 
    data.recentActivity.goals.length + data.recentActivity.workouts.length : 0
  );

  /* 
    DASHBOARD FUNCTIONS
    Interaktive Dashboard-Funktionen
  */
  
  // Statistiken neu laden
  async function refreshStats() {
    console.log('🔄 Refreshing statistics...');
    isRefreshing = true;
    
    try {
      // Simuliere Refresh-Delay für UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Page reload für neue Daten
      window.location.reload();
      
    } catch (error) {
      console.error('❌ Error refreshing stats:', error);
      alert('Fehler beim Aktualisieren der Statistiken');
    } finally {
      isRefreshing = false;
    }
  }

  // Zeitraum Filter (für zukünftige Implementierung)
  function changeTimeframe(timeframe) {
    console.log('📅 Changing timeframe to:', timeframe);
    selectedTimeframe = timeframe;
    
    // TODO: Implementiere Zeitraum-Filter
    // goto(`/stats?timeframe=${timeframe}`);
  }

  // Details Toggle
  function toggleDetails() {
    showDetails = !showDetails;
    console.log('👁️ Details toggle:', showDetails);
  }

  /* 
    SVELTE 5 EFFECTS
    Analytics und Debugging
  */
  $effect(() => {
    console.log('📊 Statistics Dashboard State:', {
      hasData,
      totalWorkouts: data.stats?.workouts.total,
      totalGoals: data.stats?.goals.total,
      totalExercises: data.stats?.exercises.total,
      totalActivities,
      selectedTimeframe
    });
  });

  // Dashboard Analytics (simuliert)
  $effect(() => {
    if (hasData) {
      console.log('📈 Dashboard Analytics:', {
        timestamp: new Date().toISOString(),
        user_engagement: 'high',
        features_used: ['overview', 'breakdowns', 'recent_activity']
      });
    }
  });
</script>

<style>
  /* 
    STATISTICS DASHBOARD STYLING
    Professional Analytics Dashboard Design
  */
  
  .stats-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .page-header {
    text-align: center;
    margin-bottom: 30px;
  }

  .page-header h1 {
    margin-bottom: 10px;
    color: var(--text-primary);
  }

  .page-header p {
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
  }

  .last-updated {
    display: block;
    color: var(--text-muted);
    font-size: 0.8rem;
    margin-top: 5px;
  }

  /* Error Banner */
  .error-banner {
    background-color: var(--error-bg);
    color: var(--error-text);
    padding: 15px;
    border-radius: 8px;
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
    border-radius: 4px;
    cursor: pointer;
  }

  /* Loading State */
  .loading-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--text-secondary);
  }

  .loading-state h3 {
    margin: 15px 0;
    color: var(--text-primary);
  }

  .loading-spinner {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 4px solid var(--border-color);
    border-radius: 50%;
    border-top-color: var(--primary);
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Sections */
  .overview-section, .breakdown-section, .activity-section, .actions-section {
    margin-bottom: 40px;
  }

  .overview-section h2, .breakdown-section h2, .activity-section h2, .actions-section h2 {
    margin-bottom: 20px;
    color: var(--text-primary);
  }

  /* Overview Grid and Cards */
  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }

  .stat-card {
    background-color: var(--card-bg);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px var(--shadow-color);
    border: 1px solid var(--border-color);
    transition: transform 0.2s;
  }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px var(--shadow-color);
  }

  .workout-stats {
    border-top: 4px solid var(--primary);
  }

  .goal-stats {
    border-top: 4px solid var(--success);
  }

  .exercise-stats {
    border-top: 4px solid var(--warning);
  }

  .progress-stats {
    border-top: 4px solid var(--info);
  }

  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .stat-header h3 {
    margin: 0;
    font-size: 1.2rem;
    color: var(--text-primary);
  }

  .stat-icon {
    font-size: 1.5rem;
  }

  .stat-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .main-stat {
    text-align: center;
  }

  .stat-number {
    display: block;
    font-size: 2.2rem;
    font-weight: bold;
    color: var(--text-primary);
  }

  .stat-label {
    display: block;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  .sub-stats {
    display: flex;
    justify-content: space-around;
    text-align: center;
  }

  .sub-stat {
    flex: 1;
  }

  .sub-number {
    display: block;
    font-size: 1.4rem;
    font-weight: bold;
    color: var(--text-primary);
  }

  .sub-stat.success .sub-number {
    color: var(--success);
  }

  .sub-stat.info .sub-number {
    color: var(--info);
  }

  .sub-label {
    display: block;
    color: var(--text-secondary);
    font-size: 0.85rem;
  }

  /* Progress Indicator */
  .progress-indicator {
    margin-top: 5px;
  }

  .progress-bar {
    height: 8px;
    background-color: var(--bg-tertiary);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 5px;
  }

  .progress-fill {
    height: 100%;
    background-color: var(--primary);
    border-radius: 4px;
  }

  .progress-label {
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  /* Circular Progress */
  .circular-progress {
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }

  .progress-ring-circle {
    transition: stroke-dashoffset 0.3s;
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
  }

  .progress-ring-fill {
    stroke: var(--primary);
  }

  .progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }

  .progress-percentage {
    font-weight: bold;
    font-size: 1.2rem;
    color: var(--primary);
  }

  /* Breakdown Cards */
  .breakdown-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 20px;
  }

  .breakdown-card {
    background-color: var(--card-bg);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px var(--shadow-color);
    border: 1px solid var(--border-color);
  }

  .breakdown-card h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--text-primary);
  }

  .chart-subtitle {
    display: block;
    color: var(--text-muted);
    margin-bottom: 15px;
    font-size: 0.85rem;
  }

  /* Chart Bars */
  .chart-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .chart-bar {
    margin-bottom: 5px;
  }

  .bar-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  .bar-label {
    color: var(--text-primary);
  }

  .bar-value {
    color: var(--text-secondary);
    font-weight: 500;
  }

  .bar-visual {
    height: 8px;
    background-color: var(--bg-tertiary);
    border-radius: 4px;
    overflow: hidden;
  }

  .bar-fill {
    height: 100%;
    background-color: var(--primary);
  }

  .bar-fill.muscle-group {
    background-color: var(--info);
  }

  .bar-fill.difficulty-leicht {
    background-color: var(--success);
  }

  .bar-fill.difficulty-mittel {
    background-color: var(--warning);
  }

  .bar-fill.difficulty-schwer {
    background-color: var(--error);
  }

  .bar-fill.achievement-rate-bar {
    background-color: var(--success);
  }

  .bar-text {
    font-size: 0.8rem;
    color: white;
    padding: 0 6px;
  }

  /* Categories Grid */
  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 10px;
  }

  .category-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background-color: var(--bg-secondary);
    border-radius: 6px;
  }

  .category-color {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .category-name {
    flex: 1;
    font-size: 0.9rem;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .category-count {
    font-size: 0.8rem;
    color: var(--text-secondary);
    font-weight: 600;
  }

  /* Activity Section */
  .activity-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  .activity-card {
    background-color: var(--card-bg);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px var(--shadow-color);
    border: 1px solid var(--border-color);
  }

  .activity-card h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: var(--text-primary);
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .activity-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 8px;
    background-color: var(--bg-secondary);
    position: relative;
  }

  .activity-icon {
    font-size: 1.5rem;
  }

  .activity-content {
    flex: 1;
    min-width: 0; /* for text overflow ellipsis to work */
  }

  .activity-title {
    font-weight: 500;
    margin-bottom: 5px;
    color: var(--text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .activity-meta {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 0.85rem;
    color: var(--text-secondary);
  }

  .activity-date {
    color: var(--text-muted);
  }

  .activity-progress {
    color: var(--primary);
    font-weight: 500;
  }

  .activity-progress-bar {
    height: 4px;
    background-color: var(--bg-tertiary);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: hidden;
  }

  .activity-progress-fill {
    height: 100%;
    background-color: var(--primary);
  }

  .activity-action {
    padding: 4px 10px;
    background-color: var(--bg-tertiary);
    border-radius: 4px;
    color: var(--text-primary);
    text-decoration: none;
    font-size: 0.85rem;
    white-space: nowrap;
  }

  .activity-action:hover {
    background-color: var(--primary);
    color: white;
  }

  /* Difficulty Tags */
  .difficulty-tag {
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .difficulty-leicht {
    background-color: var(--success-light);
    color: var(--success-dark);
  }

  .difficulty-mittel {
    background-color: var(--warning-light);
    color: var(--warning-dark);
  }

  .difficulty-schwer {
    background-color: var(--error-light);
    color: var(--error-dark);
  }

  /* Quick Actions */
  .actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .action-card {
    background-color: var(--card-bg);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 2px 8px var(--shadow-color);
    transition: transform 0.2s;
    text-decoration: none;
    border: 1px solid var(--border-color);
    cursor: pointer;
    display: block;
  }

  .action-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px var(--shadow-color);
  }

  .action-icon {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  .action-card h3 {
    margin: 0 0 10px;
    color: var(--text-primary);
    font-size: 1.1rem;
  }

  .action-card p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin: 0;
  }

  .goal-action .action-icon {
    color: var(--success);
  }

  .workout-action .action-icon {
    color: var(--primary);
  }

  .exercise-action .action-icon {
    color: var(--warning);
  }

  .refresh-action {
    border: none;
    font-family: inherit;
    width: 100%;
  }

  .refresh-action .action-icon {
    color: var(--info);
  }

  /* New Goal Type Chart */
  .goal-type-item {
    margin-bottom: 20px;
  }

  .bar-visual-new {
    margin: 10px 0;
  }

  .progress-container {
    height: 20px;
    background-color: var(--bg-tertiary);
    border-radius: 10px;
    overflow: hidden;
  }

  .progress-bar-achievement {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    transition: width 0.5s ease;
  }

  .achievement-excellent { background-color: var(--success); }
  .achievement-good { background-color: var(--primary); }
  .achievement-fair { background-color: var(--warning); }
  .achievement-poor { background-color: var(--error); }

  .achievement-rate-text {
    display: block;
    text-align: right;
    font-size: 0.8rem;
    margin-top: 5px;
  }

  .text-success { color: var(--success); }
  .text-muted { color: var(--text-muted); }

  .achievement-breakdown {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
    font-size: 0.85rem;
  }

  .breakdown-item {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .breakdown-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .breakdown-dot.achieved {
    background-color: var(--success);
  }

  .breakdown-dot.in-progress {
    background-color: var(--info);
  }

  .breakdown-text {
    color: var(--text-secondary);
  }

  .breakdown-total {
    font-weight: 600;
    color: var(--text-primary);
  }

  /* Media Queries */
  @media (max-width: 768px) {
    .overview-grid,
    .breakdown-grid,
    .activity-grid,
    .actions-grid {
      grid-template-columns: 1fr;
    }
    
    .categories-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>