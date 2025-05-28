<!-- 
  WORKOUTS LISTE PAGE - SVELTE 5 RUNES VERSION
  UI für Workout-Liste mit MongoDB-Daten
-->

<svelte:head>
  <title>💪 Workouts - Fitness Tracker</title>
</svelte:head>

<div class="workouts-page">
  <header class="page-header">
    <h1>💪 Meine Workouts</h1>
    <p>Verwalte deine Trainingsroutinen</p>
  </header>

  <!-- Error Handling -->
  {#if data.error}
    <div class="error-banner">
      ⚠️ {data.error}
      <button onclick={() => window.location.reload()}>
        🔄 Neu laden
      </button>
    </div>
  {/if}

  <!-- Statistics -->
  {#if data.stats && data.stats.total > 0}
    <section class="stats-section">
      <h2>📊 Deine Statistiken</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <h3>{data.stats.total}</h3>
          <p>Workouts</p>
        </div>
        <div class="stat-card">
          <h3>{data.stats.avgDuration}min</h3>
          <p>Ø Dauer</p>
        </div>
        <div class="stat-card">
          <h3>{Object.keys(data.stats.difficulties).length}</h3>
          <p>Schwierigkeitsgrade</p>
        </div>
      </div>
    </section>
  {/if}

  <!-- Workouts Liste -->
  <section class="workouts-section">
    <div class="section-header">
      <h2>💪 Deine Workouts ({data.totalCount})</h2>
      <a href="/workouts/create" class="create-btn">
        ➕ Neues Workout
      </a>
    </div>
    
    {#if data.workouts.length > 0}
      <div class="workouts-grid">
        {#each data.workouts as workout}
          <article class="workout-card">
            <div class="workout-header">
              <h3>{workout.name}</h3>
              <span class="difficulty-badge difficulty-{workout.difficulty.toLowerCase()}">
                {workout.difficulty}
              </span>
            </div>
            
            <p class="workout-description">{workout.description}</p>
            
            <div class="workout-meta">
              <span class="meta-item">⏱️ {workout.duration} Min</span>
              <span class="meta-item">🎯 {workout.target_muscle}</span>
            </div>
            
            <div class="workout-actions">
              <a href="/workouts/{workout.id}" class="details-btn">
                📋 Details
              </a>
              <a href="/sessions/start/{workout.id}" class="start-btn">
                🚀 Starten  
              </a>
            </div>
          </article>
        {/each}
      </div>
    {:else}
      <div class="empty-state">
        <h3>🏃‍♂️ Noch keine Workouts!</h3>
        <p>Erstelle dein erstes Workout um loszulegen.</p>
        <a href="/workouts/create" class="create-btn">
          ➕ Erstes Workout erstellen
        </a>
      </div>
    {/if}
  </section>
</div>

<script>
  let { data } = $props();
  
  console.log('📊 Workouts Page loaded:', {
    totalWorkouts: data.totalCount,
    hasStats: !!data.stats
  });
</script>

<style>
  .workouts-page {
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
    color: #333;
  }

  .error-banner {
    background: #f8d7da;
    color: #721c24;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .error-banner button {
    background: #721c24;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
  }

  .stats-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 30px;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    margin-top: 15px;
  }

  .stat-card {
    background: rgba(255,255,255,0.1);
    padding: 20px;
    border-radius: 8px;
    text-align: center;
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

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
  }

  .create-btn {
    background: #28a745;
    color: white;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
    transition: background 0.2s;
  }

  .create-btn:hover {
    background: #218838;
  }

  .workouts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
  }

  .workout-card {
    background: white;
    border: 1px solid #e9ecef;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: all 0.2s;
  }

  .workout-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }

  .workout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  .workout-header h3 {
    margin: 0;
    color: #333;
  }

  .difficulty-badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8em;
    font-weight: bold;
  }

  .difficulty-leicht { background: #d4edda; color: #155724; }
  .difficulty-mittel { background: #fff3cd; color: #856404; }
  .difficulty-schwer { background: #f8d7da; color: #721c24; }

  .workout-description {
    color: #555;
    line-height: 1.5;
    margin-bottom: 15px;
  }

  .workout-meta {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    font-size: 0.9em;
    color: #666;
  }

  .workout-actions {
    display: flex;
    gap: 10px;
  }

  .details-btn {
    flex: 1;
    background: #667eea;
    color: white;
    padding: 10px;
    text-decoration: none;
    border-radius: 6px;
    text-align: center;
    transition: background 0.2s;
  }

  .details-btn:hover {
    background: #5a67d8;
  }

  .start-btn {
    flex: 1;
    background: #ff3e00;
    color: white;
    padding: 10px;
    text-decoration: none;
    border-radius: 6px;
    text-align: center;
    font-weight: bold;
    transition: background 0.2s;
  }

  .start-btn:hover {
    background: #e63900;
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: #666;
  }

  .empty-state h3 {
    margin-bottom: 15px;
  }

  @media (max-width: 768px) {
    .workouts-page {
      padding: 15px;
    }
    
    .workouts-grid {
      grid-template-columns: 1fr;
    }
    
    .section-header {
      flex-direction: column;
      gap: 15px;
    }
  }
</style>