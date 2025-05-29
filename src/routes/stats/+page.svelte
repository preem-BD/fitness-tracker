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
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
  }

  .page-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .page-header h1 {
    color: #333;
    margin-bottom: 10px;
    font-size: 2.5rem;
  }

  .page-header p {
    color: #666;
    font-size: 1.2rem;
    margin-bottom: 10px;
  }

  .last-updated {
    color: #888;
    font-size: 0.9rem;
  }

  /* ERROR HANDLING */
  .error-banner {
    background: #f8d7da;
    color: #721c24;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .error-banner button {
    background: #721c24;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
  }

  /* OVERVIEW SECTION */
  .overview-section {
    margin-bottom: 40px;
  }

  .overview-section h2 {
    margin-bottom: 25px;
    color: #333;
    font-size: 1.8rem;
  }

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
  }

  /* STAT CARDS */
  .stat-card {
    background: white;
    border-radius: 16px;
    padding: 25px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
    border: 1px solid rgba(0,0,0,0.05);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
  }

  .stat-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.12);
  }

  .stat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .stat-header h3 {
    margin: 0;
    color: #333;
    font-size: 1.2rem;
  }

  .stat-icon {
    font-size: 2rem;
    opacity: 0.8;
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
    font-size: 3rem;
    font-weight: bold;
    color: #667eea;
    line-height: 1;
  }

  .stat-label {
    color: #666;
    font-size: 0.9rem;
    margin-top: 5px;
  }

  .sub-stats {
    display: flex;
    justify-content: space-around;
    gap: 15px;
  }

  .sub-stat {
    text-align: center;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 8px;
    flex: 1;
  }

  .sub-stat.success {
    background: #d4edda;
    color: #155724;
  }

  .sub-stat.info {
    background: #d1ecf1;
    color: #0c5460;
  }

  .sub-number {
    display: block;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .sub-label {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  /* PROGRESS INDICATORS */
  .progress-indicator {
    margin-top: 15px;
  }

  .progress-bar {
    width: 100%;
    height: 8px;
    background: #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #667eea, #764ba2);
    transition: width 0.3s ease;
  }

  .progress-label {
    display: block;
    text-align: center;
    margin-top: 8px;
    font-size: 0.9rem;
    font-weight: 500;
    color: #667eea;
  }

  /* CIRCULAR PROGRESS */
  .circular-progress {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
  }

  .progress-ring {
    transform: rotate(-90deg);
  }

  .progress-ring-circle {
    transition: stroke-dashoffset 0.5s ease;
  }

  .progress-text {
    position: absolute;
    text-align: center;
  }

  .progress-percentage {
    font-size: 1.2rem;
    font-weight: bold;
    color: #667eea;
  }

  /* BREAKDOWN SECTION */
  .breakdown-section {
    margin-bottom: 40px;
  }

  .breakdown-section h2 {
    margin-bottom: 25px;
    color: #333;
    font-size: 1.8rem;
  }

  .breakdown-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
  }

  .breakdown-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    border: 1px solid rgba(0,0,0,0.05);
  }

  .breakdown-card h3 {
    margin-bottom: 20px;
    color: #333;
    font-size: 1.1rem;
  }

  /* CHART STYLING */
  .chart-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .chart-bar {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .bar-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
  }

  .bar-label {
    font-weight: 500;
    color: #333;
  }

  .bar-value {
    color: #666;
    font-weight: bold;
  }

  .bar-visual {
    width: 100%;
    height: 12px;
    background: #f1f3f4;
    border-radius: 6px;
    overflow: hidden;
    position: relative;
  }

  .bar-fill {
    height: 100%;
    border-radius: 6px;
    transition: width 0.5s ease;
  }

  .bar-fill.difficulty-leicht { background: #10b981; }
  .bar-fill.difficulty-mittel { background: #f59e0b; }
  .bar-fill.difficulty-schwer { background: #ef4444; }
  .bar-fill.goal-type { background: #667eea; }
  .bar-fill.muscle-group { background: #8b5cf6; }

  .bar-fill-achieved {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background: #10b981;
    border-radius: 6px;
    transition: width 0.5s ease;
  }

  /* CATEGORIES GRID */
  .categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }

  .category-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .category-color {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .category-name {
    flex: 1;
    font-weight: 500;
    color: #333;
  }

  .category-count {
    font-weight: bold;
    color: #667eea;
    background: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.8rem;
  }

  /* ACTIVITY SECTION */
  .activity-section {
    margin-bottom: 40px;
  }

  .activity-section h2 {
    margin-bottom: 25px;
    color: #333;
    font-size: 1.8rem;
  }

  .activity-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 25px;
  }

  .activity-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    border: 1px solid rgba(0,0,0,0.05);
  }

  .activity-card h3 {
    margin-bottom: 20px;
    color: #333;
    font-size: 1.1rem;
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .activity-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 10px;
    position: relative;
  }

  .activity-icon {
    font-size: 1.5rem;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }

  .activity-content {
    flex: 1;
  }

  .activity-title {
    font-weight: 600;
    color: #333;
    margin-bottom: 5px;
  }

  .activity-meta {
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 0.8rem;
    color: #666;
  }

  .activity-progress {
    background: #667eea;
    color: white;
    padding: 2px 8px;
    border-radius: 12px;
    font-weight: 500;
  }

  .difficulty-tag {
    padding: 2px 8px;
    border-radius: 12px;
    font-weight: 500;
    font-size: 0.7rem;
  }

  .difficulty-tag.difficulty-leicht { background: #d4edda; color: #155724; }
  .difficulty-tag.difficulty-mittel { background: #fff3cd; color: #856404; }
  .difficulty-tag.difficulty-schwer { background: #f8d7da; color: #721c24; }

  .activity-date {
    color: #888;
  }

  .activity-action {
    background: #667eea;
    color: white;
    padding: 6px 12px;
    text-decoration: none;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 500;
    transition: background 0.2s;
  }

  .activity-action:hover {
    background: #5a67d8;
  }

  .activity-progress-bar {
    position: absolute;
    bottom: 0;
    left: 15px;
    right: 15px;
    height: 3px;
    background: #e5e7eb;
    border-radius: 2px;
    overflow: hidden;
  }

  .activity-progress-fill {
    height: 100%;
    background: #667eea;
    transition: width 0.3s ease;
  }

  /* ACTIONS SECTION */
  .actions-section {
    margin-bottom: 40px;
  }

  .actions-section h2 {
    margin-bottom: 25px;
    color: #333;
    font-size: 1.8rem;
  }

  .actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }

  .action-card {
    background: white;
    border: 2px solid #f1f3f4;
    border-radius: 12px;
    padding: 25px;
    text-decoration: none;
    color: inherit;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    display: block;
  }

  .action-card:hover {
    border-color: #667eea;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  }

  .action-icon {
    font-size: 3rem;
    margin-bottom: 15px;
    display: block;
  }

  .action-card h3 {
    margin-bottom: 10px;
    color: #333;
    font-size: 1.1rem;
  }

  .action-card p {
    color: #666;
    font-size: 0.9rem;
    line-height: 1.4;
    margin: 0;
  }

  .goal-action:hover { border-color: #667eea; }
  .workout-action:hover { border-color: #10b981; }
  .exercise-action:hover { border-color: #8b5cf6; }
  .refresh-action:hover { border-color: #f59e0b; }

  /* LOADING STATE */
  .loading-state {
    text-align: center;
    padding: 80px 20px;
    color: #666;
  }

  .loading-spinner {
    width: 60px;
    height: 60px;
    border: 4px solid #f1f3f4;
    border-left: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 30px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loading-state h3 {
    margin-bottom: 15px;
    font-size: 1.5rem;
  }

  /* GOAL TYPES - ACHIEVEMENT RATE STYLING */
.chart-subtitle {
  display: block;
  color: #6c757d;
  font-style: italic;
  margin-bottom: 15px;
  font-size: 0.85rem;
}

.goal-type-item {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 10px;
  border-left: 4px solid #667eea;
  margin-bottom: 15px;
  transition: all 0.2s ease;
}

.goal-type-item:hover {
  background: #e9ecef;
  transform: translateX(3px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.bar-visual-new {
  margin-top: 8px;
}

.progress-container {
  width: 100%;
  height: 16px;
  background-color: #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  border: 1px solid #dee2e6;
}

.progress-bar-achievement {
  height: 100%;
  border-radius: 8px;
  transition: width 0.7s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Achievement Rate Colors */
.achievement-excellent { 
  background: linear-gradient(90deg, #28a745, #20c997);
}

.achievement-good { 
  background: linear-gradient(90deg, #17a2b8, #20c997);
}

.achievement-fair { 
  background: linear-gradient(90deg, #ffc107, #fd7e14);
}

.achievement-poor { 
  background: linear-gradient(90deg, #dc3545, #e83e8c);
}

.achievement-text {
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

.achievement-rate-text {
  display: block;
  text-align: right;
  font-weight: 600;
  font-size: 0.8rem;
  margin-top: 4px;
}

/* Achievement Breakdown */
.achievement-breakdown {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid #dee2e6;
}

.breakdown-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.breakdown-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.breakdown-dot.achieved {
  background: #28a745;
}

.breakdown-dot.in-progress {
  background: #ffc107;
}

.breakdown-text {
  font-size: 0.75rem;
  color: #6c757d;
  font-weight: 500;
}

.breakdown-total {
  font-size: 0.75rem;
  color: #495057;
  font-weight: 600;
  background: white;
  padding: 2px 6px;
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

/* Fallback styling for old data structure */
.achievement-rate-bar {
  background: linear-gradient(90deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bar-text {
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
}

/* Empty state for 0% achievement */
.progress-bar-achievement[style*="width: 0%"] {
  background: #f8f9fa !important;
  border: 1px dashed #dee2e6;
}

.progress-bar-achievement[style*="width: 0%"]::after {
  content: "0%";
  color: #6c757d;
  font-size: 0.75rem;
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
}

/* Responsive improvements */
@media (max-width: 768px) {
  .achievement-breakdown {
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
  }
  
  .breakdown-item {
    justify-content: space-between;
    width: 100%;
  }
}

  /* RESPONSIVE DESIGN */
  @media (max-width: 768px) {
    .stats-page {
      padding: 15px;
    }
    
    .overview-grid,
    .breakdown-grid {
      grid-template-columns: 1fr;
    }
    
    .activity-grid {
      grid-template-columns: 1fr;
    }
    
    .actions-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .page-header h1 {
      font-size: 2rem;
    }
    
    .stat-number {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 480px) {
    .actions-grid {
      grid-template-columns: 1fr;
    }
    
    .sub-stats {
      flex-direction: column;
      gap: 10px;
    }
  }
</style>