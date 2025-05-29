<!-- src/routes/goals/+page.svelte - COMPLETE WORKING VERSION -->

<svelte:head>
  <title>🎯 Goals - Fitness Tracker</title>
  <meta name="description" content="Verfolge und verwalte deine Fitness-Goals" />
</svelte:head>

<script>
  // SVELTE 5 RUNES: Props von +page.server.js
  let { data } = $props();
  
  // SVELTE 5 RUNE: $state() für reaktive Variablen
  let filterType = $state('all'); // 'all', 'active', 'achieved'
  let searchTerm = $state('');
  
  // WORKING: Use $state instead of $derived
  let filteredGoals = $state([]);
  
  // FUNCTION: Apply filters manually
  function updateFilteredGoals() {
    console.log('🔄 Updating filtered goals...');
    
    if (!data?.goals || !Array.isArray(data.goals)) {
      console.log('❌ No valid goals array');
      filteredGoals = [];
      return;
    }
    
    console.log('✅ Starting with', data.goals.length, 'goals');
    let result = [...data.goals]; // Copy array
    
    // Status Filter
    if (filterType === 'active') {
      result = result.filter(goal => !goal.achieved);
      console.log('🔍 After active filter:', result.length);
    } else if (filterType === 'achieved') {
      result = result.filter(goal => goal.achieved);
      console.log('🔍 After achieved filter:', result.length);
    }
    
    // Search Filter
    if (searchTerm?.trim()) {
      const search = searchTerm.trim().toLowerCase();
      result = result.filter(goal => 
        goal.title?.toLowerCase().includes(search) ||
        goal.description?.toLowerCase().includes(search)
      );
      console.log('🔍 After search filter:', result.length);
    }
    
    console.log('🔍 FINAL RESULT:', result.length, 'goals');
    filteredGoals = result;
  }
  
  // EFFECTS: Watch for changes
  $effect(() => {
    // Initial load + data changes
    updateFilteredGoals();
  });
  
  $effect(() => {
    // Filter changes
    filterType; // Access the variable to track it
    searchTerm;  // Access the variable to track it
    updateFilteredGoals();
  });
  
  // DEBUG: Safe logging
  $effect(() => {
    console.log('📊 SAFE CHECK:', {
      filteredGoalsLength: filteredGoals?.length || 0,
      filteredGoalsType: typeof filteredGoals,
      isArray: Array.isArray(filteredGoals)
    });
  });

  // Helper Functions
  function getProgressColor(current, target) {
    const percentage = (current / target) * 100;
    if (percentage >= 100) return 'success';
    if (percentage >= 75) return 'info';
    if (percentage >= 50) return 'warning';
    return 'danger';
  }
  
  function getProgressPercentage(current, target) {
    return Math.min(Math.round((current / target) * 100), 100);
  }
  
  function getGoalTypeLabel(goalType) {
    switch (goalType) {
      case 'weight_loss': return 'Gewichtsverlust';
      case 'weight_gain': return 'Gewichtszunahme';
      case 'muscle_gain': return 'Muskelaufbau';
      case 'strength': return 'Krafttraining';
      case 'endurance': return 'Ausdauer';
      case 'flexibility': return 'Flexibilität';
      case 'habit': return 'Gewohnheit';
      default: return 'Allgemein';
    }
  }

  console.log('📊 Goals Page loaded:', {
    totalGoals: data.stats?.total,
    hasStats: !!data.stats
  });
</script>

<div class="goals-page">
  <header class="page-header">
    <h1>🎯 Meine Goals</h1>
    <p>Verwalte deine Fitness-Ziele</p>
  </header>

  <!-- Error Handling -->
  {#if data?.error}
    <div class="error-banner">
      ⚠️ {data.error}
      <button onclick={() => window.location.reload()}>
        🔄 Neu laden
      </button>
    </div>
  {/if}

  <!-- WORKING DEBUG SECTION 
  <div class="alert alert-success mb-4">
      <strong>✅ Working Debug:</strong> 
      <br><strong>Data Goals:</strong> {data.goals?.length || 0} 
      <br><strong>Filtered Goals:</strong> {filteredGoals?.length || 0}
      <br><strong>Filtered Type:</strong> {typeof filteredGoals}
      <br><strong>Filter Type:</strong> {filterType}
      <br><strong>Search Term:</strong> "{searchTerm}"
  </div> -->

  <!-- Statistics Section -->
  {#if data.stats}
    <section class="stats-section">
      <h2>📊 Deine Statistiken</h2>
      <div class="stats-grid">
        <div class="stat-card">
          <h3>{data.stats.total || 0}</h3>
          <p>Goals</p>
        </div>
        <div class="stat-card">
          <h3>{data.stats.achieved || 0}</h3>
          <p>Erreicht</p>
        </div>
        <div class="stat-card">
          <h3>{(data.stats.total && data.stats.total > 0) ? Math.round((data.stats.achieved / data.stats.total) * 100) : 0}%</h3>
          <p>Erfolgsquote</p>
        </div>
        <div class="stat-card">
          <h3>{Math.round((data.stats.avgProgress || 0) * 100)}%</h3>
          <p>Ø Fortschritt</p>
        </div>
      </div>
    </section>
  {/if}

  <!-- Filter Section -->
  <section class="filter-section">
    <h2>🔍 Filter & Suche</h2>
    
    <div class="filter-form">
      <!-- Search Input -->
      <div class="search-group">
        <input 
          type="text" 
          class="search-input" 
          placeholder="Goals durchsuchen..."
          bind:value={searchTerm}
        />
      </div>

      <!-- Filter Controls -->
      <div class="filter-controls">
        <div class="filter-group">
          <div class="filter-buttons">
            <button 
              class="filter-btn"
              class:active={filterType === 'all'}
              onclick={() => filterType = 'all'}
            >
              Alle Goals
            </button>
            <button 
              class="filter-btn"
              class:active={filterType === 'active'}
              onclick={() => filterType = 'active'}
            >
              Aktiv
            </button>
            <button 
              class="filter-btn"
              class:active={filterType === 'achieved'}
              onclick={() => filterType = 'achieved'}
            >
              Erreicht
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Goals Section -->
  <section class="goals-section">
    <div class="section-header">
      <h2>🎯 Deine Goals ({filteredGoals?.length || 0})</h2>
      <a href="/goals/create" class="create-btn">
        ➕ Neues Goal
      </a>
    </div>
    
    {#if filteredGoals && filteredGoals.length > 0}
      <div class="goals-grid">
        {#each filteredGoals as goal (goal._id)}
          <article class="goal-card">
            <div class="goal-header">
              <h3>{goal.title}</h3>
              <span class="status-badge {goal.achieved ? 'status-achieved' : 'status-active'}">
                {goal.achieved ? 'Erreicht' : 'Aktiv'}
              </span>
            </div>
            
            <p class="goal-description">{goal.description}</p>
            
            <div class="goal-meta">
              <span class="meta-item">📈 {goal.current_value} / {goal.target_value} {goal.unit}</span>
              {#if goal.goal_type}
                <span class="meta-item">🎯 {getGoalTypeLabel(goal.goal_type)}</span>
              {/if}
              {#if goal.target_date}
                <span class="meta-item">📅 {new Date(goal.target_date).toLocaleDateString('de-DE')}</span>
              {/if}
            </div>

            <!-- Progress Bar - IMPROVED READABILITY -->
<div class="progress-section">
  <div class="progress-info">
    <span class="progress-label">Fortschritt</span>
    <span class="progress-value">{getProgressPercentage(goal.current_value, goal.target_value)}%</span>
  </div>
  <div class="progress-bar-container">
    <div class="progress-bar">
      <div 
        class="progress-fill progress-{getProgressColor(goal.current_value, goal.target_value)}"
        style="width: {getProgressPercentage(goal.current_value, goal.target_value)}%"
      >
        <!-- Progress Text inside bar - BETTER VISIBILITY -->
        <span class="progress-text">
          {getProgressPercentage(goal.current_value, goal.target_value)}%
        </span>
      </div>
    </div>
  </div>
  <!-- Progress Details - CLEAR NUMBERS -->
  <div class="progress-details">
    <span class="current-value">{goal.current_value} {goal.unit}</span>
    <span class="separator">von</span>
    <span class="target-value">{goal.target_value} {goal.unit}</span>
  </div>
</div>
            
            <div class="goal-actions">
              <a href="/goals/{goal._id}" class="details-btn">
                📋 Details
              </a>
              <a href="/goals/{goal._id}/edit" class="edit-btn">
                ✏️ Bearbeiten
              </a>
            </div>
          </article>
        {/each}
      </div>
    {:else}
      <div class="empty-state">
        <h3>🎯 Keine Goals gefunden!</h3>
        <p>
          {#if searchTerm}
            Keine Goals gefunden für "{searchTerm}". Versuche andere Suchbegriffe.
          {:else if filterType !== 'all'}
            Keine {filterType === 'active' ? 'aktiven' : 'erreichten'} Goals gefunden.
          {:else}
            Erstelle dein erstes Fitness-Goal um loszulegen.
          {/if}
        </p>
        <a href="/goals/create" class="create-btn">
          ➕ Erstes Goal erstellen
        </a>
      </div>
    {/if}
  </section>
</div>

<style>
  /* EXAKT IDENTISCHES STYLING wie Workout Page */
  .goals-page {
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

  /* Success Banner - NEU FÜR DARK MODE */
.success-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--success-light);
    border: 1px solid var(--success);
    color: var(--success-dark);
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  /* Alert Debug */
  .alert {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 8px;
  }

  .alert-success {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
  }

  .mb-4 {
    margin-bottom: 1.5rem;
  }

  /* Statistics Section */
  .stats-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 30px;
  }

  .stats-section h2 {
    margin-bottom: 15px;
    margin-top: 0;
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

  /* Filter Section */
  .filter-section {
    background: var(--bg-secondary);
    padding: 25px;
    border-radius: 12px;
    margin-bottom: 30px;
  }

  .filter-section h2 {
    margin-bottom: 20px;
    color: var(--text-primary);
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
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.2s;
    background-color: var(--bg-primary);
    color: var(--text-primary);
  }

  .search-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--primary-transparent);
  }

  .filter-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 8px 16px;
    border: 1px solid var(--border-color);
    background: var(--bg-primary);
    color: var(--text-primary);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 14px;
  }

  .filter-btn:hover {
    background: var(--bg-secondary);
  }

  .filter-btn.active {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }

  /* Goals Dashboard */
  .dashboard-section {
    margin-bottom: 40px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .section-title {
    margin: 0;
    font-size: 1.5rem;
    color: var(--text-primary);
  }

  /* Section Header */
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
  }

  .section-header h2 {
    margin: 0;
    color: var(--text-primary);
  }

  .create-btn {
    background: var(--success);
    color: white;
    padding: 12px 24px;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
    transition: background 0.2s;
  }

  .create-btn:hover {
    background: var(--success-dark);
  }

  /* Goals Grid */
  .goals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 20px;
  }

  /* Goal Card */
  .goal-card {
    background-color: var(--card-bg);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px var(--shadow-color);
    border: 1px solid var(--border-color);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .goal-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px var(--shadow-color);
  }

  .goal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 15px;
  }

  .goal-header h3 {
    margin: 0;
    color: var(--text-primary);
  }

  .status-badge {
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .status-achieved { background: var(--success-light); color: var(--success-dark); }
  .status-active { background: var(--info-light); color: var(--info-dark); }

  .goal-description {
    color: var(--text-secondary);
    margin-bottom: 15px;
    line-height: 1.5;
  }

  .goal-meta {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 20px;
  }

  /* Progress Bar */
  .progress-container {
    margin: 15px 0;
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }

  .progress-label {
    color: var(--text-primary);
    font-weight: 500;
  }

  .progress-value {
    color: var(--primary);
    font-weight: bold;
  }

  .progress-bar {
    height: 8px;
    background-color: var(--bg-tertiary);
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background-color: var(--primary);
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  /* Goal Actions - EXAKT wie Workout Actions */
  .goal-actions {
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

  .edit-btn {
    flex: 1;
    background: #6c757d;
    color: white;
    padding: 10px;
    text-decoration: none;
    border-radius: 6px;
    text-align: center;
    transition: background 0.2s;
  }

  .edit-btn:hover {
    background: #5a6268;
  }

  /* Empty State - EXAKT wie Workout Page */
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    color: var(--text-secondary);
  }

  .empty-state h3 {
    margin-bottom: 15px;
    color: var(--text-primary);
  }

  /* Responsive Design - EXAKT wie Workout Page */
  @media (max-width: 768px) {
    .goals-page {
      padding: 15px;
    }
    
    .goals-grid {
      grid-template-columns: 1fr;
    }
    
    .section-header {
      flex-direction: column;
      gap: 15px;
    }

    .filter-buttons {
      justify-content: center;
    }
    
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .goal-meta {
      flex-direction: column;
      gap: 8px;
    }
  }
</style>