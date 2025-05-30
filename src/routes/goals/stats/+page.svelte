<!-- +page.svelte - SVELTE 5 RUNES Ziel Statistiken Dashboard -->
<!-- DASHBOARD: Umfassende Statistik-Visualisierung mit CSS Charts -->

<script>
    // SVELTE 5 RUNES: Props von +page.server.js
    let { data } = $props();
    
    // SVELTE 5 RUNE: $state() für Dashboard Interaktionen
    let selectedTimeframe = $state('all'); // 'all', '3months', '6months'
    let selectedMetric = $state('progress'); // 'progress', 'completion', 'activity'
    
    // SVELTE 5 RUNE: $derived() für berechnete Dashboard Werte
    let totalDistributionCount = $derived(() => {
        return data.progressDistribution.reduce((sum, bucket) => sum + bucket.count, 0);
    });
    
    // Progress Distribution mit Percentages
    let progressDistributionWithPercentages = $derived(() => {
        return data.progressDistribution.map(bucket => ({
            ...bucket,
            percentage: totalDistributionCount > 0 ? 
                Math.round((bucket.count / totalDistributionCount) * 100) : 0
        }));
    });
    
    // Goal Type Stats mit verbesserter Darstellung
    let enhancedGoalTypeStats = $derived(() => {
        const totalGoals = data.goalTypeStats.reduce((sum, stat) => sum + stat.count, 0);
        return data.goalTypeStats.map(stat => ({
            ...stat,
            percentage: totalGoals > 0 ? Math.round((stat.count / totalGoals) * 100) : 0
        }));
    });
    
    // Erfolgsquote Farbe basierend auf Wert
    function getSuccessRateColor(rate) {
        if (rate >= 80) return 'success';
        if (rate >= 60) return 'info';
        if (rate >= 40) return 'warning';
        return 'danger';
    }
    
    // Progress Color für verschiedene Bereiche
    function getProgressColor(progress) {
        if (progress >= 100) return '#28a745'; // success
        if (progress >= 75) return '#17a2b8';  // info
        if (progress >= 50) return '#ffc107';  // warning
        return '#dc3545'; // danger
    }
</script>

<!-- SVELTE HEAD: SEO Meta Tags -->
<svelte:head>
    <title>Ziel-Statistiken - Fitness Tracker</title>
    <meta name="description" content="Umfassende Statistiken und Analysen deiner Fitness-Ziele" />
</svelte:head>

<div class="container mt-4">
    <!-- BREADCRUMB NAVIGATION -->
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Home</a></li>
            <li class="breadcrumb-item"><a href="/goals">Ziele</a></li>
            <li class="breadcrumb-item active">Statistiken</li>
        </ol>
    </nav>

    <!-- PAGE HEADER -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h1 class="h2 mb-2">📊 Ziel-Statistiken</h1>
                    <p class="text-muted mb-0">
                        Umfassende Analyse deiner Fitness-Ziele und Fortschritte
                    </p>
                </div>
                <div class="d-flex gap-2">
                    <a href="/goals" class="btn btn-outline-primary">
                        <i class="bi bi-list me-2"></i>Alle Ziele
                    </a>
                    <a href="/goals/create" class="btn btn-primary">
                        <i class="bi bi-plus me-2"></i>Neues Ziel
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- ERROR HANDLING -->
    {#if data.error}
        <div class="alert alert-warning">
            <i class="bi bi-exclamation-triangle me-2"></i>
            {data.error}
        </div>
    {/if}

    <!-- OVERALL STATISTICS CARDS -->
    <div class="row mb-4">
        <div class="col-md-2 mb-3">
            <div class="card stats-card text-center h-100">
                <div class="card-body">
                    <div class="stats-icon text-primary mb-2">🎯</div>
                    <h4 class="stats-number text-primary">{data.overallStats.total}</h4>
                    <p class="stats-label">Ziele gesamt</p>
                </div>
            </div>
        </div>
        
        <div class="col-md-2 mb-3">
            <div class="card stats-card text-center h-100">
                <div class="card-body">
                    <div class="stats-icon text-success mb-2">🏆</div>
                    <h4 class="stats-number text-success">{data.overallStats.achieved}</h4>
                    <p class="stats-label">Erreicht</p>
                </div>
            </div>
        </div>
        
        <div class="col-md-2 mb-3">
            <div class="card stats-card text-center h-100">
                <div class="card-body">
                    <div class="stats-icon text-info mb-2">📈</div>
                    <h4 class="stats-number text-info">{Math.round(data.overallStats.completionRate)}%</h4>
                    <p class="stats-label">Erfolgsquote</p>
                </div>
            </div>
        </div>
        
        <div class="col-md-2 mb-3">
            <div class="card stats-card text-center h-100">
                <div class="card-body">
                    <div class="stats-icon text-warning mb-2">⚡</div>
                    <h4 class="stats-number text-warning">{Math.round(data.overallStats.avgProgress * 100)}%</h4>
                    <p class="stats-label">Ø Fortschritt</p>
                </div>
            </div>
        </div>
        
        <div class="col-md-2 mb-3">
            <div class="card stats-card text-center h-100">
                <div class="card-body">
                    <div class="stats-icon text-secondary mb-2">📅</div>
                    <h4 class="stats-number text-secondary">{data.overallStats.withTargetDate}</h4>
                    <p class="stats-label">Mit Datum</p>
                </div>
            </div>
        </div>
        
        <div class="col-md-2 mb-3">
            <div class="card stats-card text-center h-100">
                <div class="card-body">
                    <div class="stats-icon text-danger mb-2">⏰</div>
                    <h4 class="stats-number text-danger">{data.overallStats.overdue}</h4>
                    <p class="stats-label">Überfällig</p>
                </div>
            </div>
        </div>
    </div>

    <!-- CHARTS ROW -->
    <div class="row mb-4">
        <!-- PROGRESS DISTRIBUTION CHART -->
        <div class="col-lg-6 mb-4">
            <div class="card h-100">
                <div class="card-header">
                    <h5 class="card-title mb-0">
                        <i class="bi bi-pie-chart me-2"></i>Fortschritts-Verteilung
                    </h5>
                </div>
                <div class="card-body">
                    {#if progressDistributionWithPercentages.length > 0}
                        <div class="progress-distribution">
                            {#each progressDistributionWithPercentages as bucket}
                                <div class="distribution-item mb-3">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <span class="distribution-label">{bucket.label}</span>
                                        <span class="distribution-count">
                                            {bucket.count} Ziele ({bucket.percentage}%)
                                        </span>
                                    </div>
                                    <div class="progress progress-sm">
                                        <div 
                                            class="progress-bar bg-{bucket._id >= 75 ? 'success' : bucket._id >= 50 ? 'info' : bucket._id >= 25 ? 'warning' : 'danger'}"
                                            style="width: {bucket.percentage}%"
                                        ></div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <div class="text-center text-muted py-4">
                            <i class="bi bi-pie-chart display-4 mb-3"></i>
                            <p>Keine Daten für Fortschritts-Verteilung verfügbar</p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        <!-- GOAL TYPES CHART -->
        <div class="col-lg-6 mb-4">
            <div class="card h-100">
                <div class="card-header">
                    <h5 class="card-title mb-0">
                        <i class="bi bi-graph-up me-2"></i>Zieltypen-Verteilung
                    </h5>
                </div>
                <div class="card-body">
                    {#if enhancedGoalTypeStats.length > 0}
                        <div class="goal-types-chart">
                            {#each enhancedGoalTypeStats as stat}
                                <div class="goal-type-item mb-3">
                                    <div class="d-flex justify-content-between align-items-center mb-1">
                                        <span class="goal-type-label">{stat.label}</span>
                                        <span class="goal-type-stats">
                                            {stat.count} ({stat.percentage}%)
                                        </span>
                                    </div>
                                    <div class="d-flex align-items-center gap-2">
                                        <div class="progress flex-1 progress-sm">
                                            <div 
                                                class="progress-bar bg-primary"
                                                style="width: {stat.percentage}%"
                                            ></div>
                                        </div>
                                        <small class="text-muted">
                                            {Math.round(stat.completionRate)}% erreicht
                                        </small>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <div class="text-center text-muted py-4">
                            <i class="bi bi-graph-up display-4 mb-3"></i>
                            <p>Keine Daten für Zieltypen verfügbar</p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>

    <!-- MONTHLY PROGRESS & RECENT ACTIVITY -->
    <div class="row mb-4">
        <!-- MONTHLY PROGRESS -->
        <div class="col-lg-8 mb-4">
            <div class="card h-100">
                <div class="card-header">
                    <h5 class="card-title mb-0">
                        <i class="bi bi-calendar-month me-2"></i>Monatlicher Fortschritt
                    </h5>
                </div>
                <div class="card-body">
                    {#if data.monthlyProgress.length > 0}
                        <div class="monthly-progress-chart">
                            {#each data.monthlyProgress as month}
                                <div class="month-item">
                                    <div class="month-header">
                                        <span class="month-label">{month.monthLabel}</span>
                                        <span class="month-stats">
                                            {month.goalsCreated} erstellt, {month.goalsAchieved} erreicht
                                        </span>
                                    </div>
                                    <div class="month-bars">
                                        <div class="bar-container">
                                            <div class="bar-label">Erstellt</div>
                                            <div class="progress progress-sm">
                                                <div 
                                                    class="progress-bar bg-primary"
                                                    style="width: {Math.min((month.goalsCreated / Math.max(...data.monthlyProgress.map(m => m.goalsCreated))) * 100, 100)}%"
                                                ></div>
                                            </div>
                                        </div>
                                        <div class="bar-container">
                                            <div class="bar-label">Erreicht</div>
                                            <div class="progress progress-sm">
                                                <div 
                                                    class="progress-bar bg-success"
                                                    style="width: {Math.min((month.goalsAchieved / Math.max(...data.monthlyProgress.map(m => m.goalsAchieved))) * 100, 100)}%"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                    {:else}
                        <div class="text-center text-muted py-4">
                            <i class="bi bi-calendar-month display-4 mb-3"></i>
                            <p>Keine monatlichen Daten verfügbar</p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        <!-- RECENT ACTIVITY -->
        <div class="col-lg-4 mb-4">
            <div class="card h-100">
                <div class="card-header">
                    <h5 class="card-title mb-0">
                        <i class="bi bi-clock-history me-2"></i>Letzte Aktivität
                    </h5>
                </div>
                <div class="card-body">
                    {#if data.recentGoals.length > 0}
                        <div class="recent-goals-list">
                            {#each data.recentGoals as goal}
                                <div class="recent-goal-item">
                                    <div class="d-flex justify-content-between align-items-start">
                                        <div class="flex-1">
                                            <h6 class="recent-goal-title">
                                                <a href="/goals/{goal._id}" class="text-decoration-none">
                                                    {goal.title}
                                                </a>
                                            </h6>
                                            <div class="recent-goal-progress mb-1">
                                                <div class="progress progress-sm">
                                                    <div 
                                                        class="progress-bar bg-{goal.achieved ? 'success' : 'primary'}"
                                                        style="width: {Math.min((goal.current_value / goal.target_value) * 100, 100)}%"
                                                    ></div>
                                                </div>
                                            </div>
                                            <small class="text-muted">
                                                {new Date(goal.updated_at || goal.created_at).toLocaleDateString('de-DE')}
                                            </small>
                                        </div>
                                        <div class="ms-2">
                                            {#if goal.achieved}
                                                <span class="badge bg-success">✓</span>
                                            {:else}
                                                <span class="badge bg-primary">
                                                    {Math.round((goal.current_value / goal.target_value) * 100)}%
                                                </span>
                                            {/if}
                                        </div>
                                    </div>
                                </div>
                            {/each}
                        </div>
                        
                        <div class="text-center mt-3">
                            <a href="/goals" class="btn btn-outline-primary btn-sm">
                                Alle Ziele anzeigen
                            </a>
                        </div>
                    {:else}
                        <div class="text-center text-muted py-4">
                            <i class="bi bi-clock-history display-4 mb-3"></i>
                            <p>Keine kürzlichen Aktivitäten</p>
                            <a href="/goals/create" class="btn btn-primary btn-sm">
                                Erstes Ziel erstellen
                            </a>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>

    <!-- QUICK INSIGHTS -->
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mb-0">
                        <i class="bi bi-lightbulb me-2"></i>Erkenntnisse & Empfehlungen
                    </h5>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <div class="insight-card">
                                <div class="insight-icon">🎯</div>
                                <h6>Ziel-Performance</h6>
                                <p class="text-muted">
                                    {#if data.overallStats.completionRate >= 70}
                                        Hervorragend! Du erreichst {Math.round(data.overallStats.completionRate)}% deiner Ziele.
                                    {:else if data.overallStats.completionRate >= 50}
                                        Gute Arbeit! {Math.round(data.overallStats.completionRate)}% Erfolgsquote - weiter so!
                                    {:else}
                                        Potenzial nach oben: {Math.round(data.overallStats.completionRate)}% erreicht. Setze kleinere, erreichbare Ziele.
                                    {/if}
                                </p>
                            </div>
                        </div>
                        
                        <div class="col-md-4 mb-3">
                            <div class="insight-card">
                                <div class="insight-icon">📈</div>
                                <h6>Fortschritts-Trend</h6>
                                <p class="text-muted">
                                    {#if data.overallStats.avgProgress >= 0.7}
                                        Fantastisch! Durchschnittlich {Math.round(data.overallStats.avgProgress * 100)}% Fortschritt.
                                    {:else if data.overallStats.avgProgress >= 0.4}
                                        Solide {Math.round(data.overallStats.avgProgress * 100)}% Fortschritt im Durchschnitt.
                                    {:else}
                                        {Math.round(data.overallStats.avgProgress * 100)}% Fortschritt. Überprüfe deine Zielwerte.
                                    {/if}
                                </p>
                            </div>
                        </div>
                        
                        <div class="col-md-4 mb-3">
                            <div class="insight-card">
                                <div class="insight-icon">⚡</div>
                                <h6>Nächste Schritte</h6>
                                <p class="text-muted">
                                    {#if data.overallStats.overdue > 0}
                                        {data.overallStats.overdue} überfällige Ziele aktualisieren.
                                    {:else if data.overallStats.total < 3}
                                        Erstelle mehr Ziele für bessere Motivation.
                                    {:else}
                                        Bleibe konsequent und tracke regelmäßig!
                                    {/if}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- COMPONENT STYLES -->
<style>
    /* Base styles for dark mode compatibility */
    :root {
      --bg-primary: #ffffff;
      --bg-secondary: #f8f9fa;
      --bg-tertiary: #e9ecef;
      --text-primary: #212529;
      --text-secondary: #6c757d;
      --text-muted: #888888;
      --primary: #0d6efd;
      --primary-dark: #0a58ca;
      --success: #4caf50;
      --info: #2196f3;
      --warning: #ff9800;
      --danger: #f44336;
      --border-color: #dee2e6;
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.1);
      --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
      --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    [data-theme="dark"] {
      --bg-primary: #121212;
      --bg-secondary: #1e1e1e;
      --bg-tertiary: #2c2c2c;
      --text-primary: #e0e0e0;
      --text-secondary: #b0b0b0;
      --text-muted: #888888;
      --primary: #bb86fc;
      --primary-dark: #9b59b6;
      --success: #4caf50;
      --info: #2196f3;
      --warning: #ff9800;
      --danger: #f44336;
      --border-color: #333333;
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.2);
      --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.2);
      --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.2);
    }
    
    /* Stats Cards */
    .stats-card {
        border: none;
        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .stats-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    
    .stats-icon {
        font-size: 2rem;
        line-height: 1;
    }
    
    .stats-number {
        font-size: 2.5rem;
        font-weight: bold;
        margin: 0;
        line-height: 1;
    }
    
    .stats-label {
        font-size: 0.9rem;
        color: #6c757d;
        margin: 0;
        font-weight: 500;
    }
    
    /* Progress Bars */
    .progress-sm {
        height: 6px;
    }
    
    .progress {
        border-radius: 3px;
        background-color: #e9ecef;
    }
    
    /* Distribution Charts */
    .distribution-item,
    .goal-type-item {
        padding: 0.5rem 0;
        border-bottom: 1px solid #f8f9fa;
    }
    
    .distribution-item:last-child,
    .goal-type-item:last-child {
        border-bottom: none;
    }
    
    .distribution-label,
    .goal-type-label {
        font-weight: 500;
        color: #495057;
    }
    
    .distribution-count,
    .goal-type-stats {
        font-size: 0.9rem;
        color: #6c757d;
    }
    
    /* Monthly Progress Chart */
    .monthly-progress-chart {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .month-item {
        padding: 0.75rem;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 4px solid #0d6efd;
    }
    
    .month-header {
        display: flex;
        justify-content: between;
        align-items: center;
        margin-bottom: 0.5rem;
    }
    
    .month-label {
        font-weight: 600;
        color: #495057;
    }
    
    .month-stats {
        font-size: 0.85rem;
        color: #6c757d;
    }
    
    .month-bars {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
    }
    
    .bar-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .bar-label {
        font-size: 0.8rem;
        color: #6c757d;
        min-width: 60px;
    }
    
    /* Recent Goals */
    .recent-goals-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .recent-goal-item {
        padding: 0.75rem;
        background: #f8f9fa;
        border-radius: 8px;
        border-left: 3px solid #0d6efd;
    }
    
    .recent-goal-title {
        font-size: 0.95rem;
        margin-bottom: 0.5rem;
        line-height: 1.3;
    }
    
    .recent-goal-title a {
        color: #495057;
    }
    
    .recent-goal-title a:hover {
        color: #0d6efd;
    }
    
    /* Insights */
    .insight-card {
        text-align: center;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
        height: 100%;
    }
    
    .insight-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        display: block;
    }
    
    .insight-card h6 {
        color: #495057;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
    
    .insight-card p {
        font-size: 0.9rem;
        margin: 0;
    }
    
    /* Subtle text colors */
      .text-muted {
        color: var(--text-muted);
      }
      
      /* Progress bar styling */
      .progress-container {
        height: 8px;
        background-color: var(--bg-tertiary);
        border-radius: 4px;
        overflow: hidden;
        margin: 5px 0;
      }
      
      .progress-container-with-label {
        display: flex;
        flex-direction: column;
      }
      
      .progress-label {
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        color: var(--text-secondary);
        margin-bottom: 3px;
      }
      
      /* Table styling */
      .stats-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 1rem;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: var(--shadow-sm);
      }
      
      .stats-table th {
        background-color: var(--bg-secondary);
        color: var(--text-primary);
        padding: 0.75rem;
        text-align: left;
        font-weight: 600;
        border-bottom: 2px solid var(--border-color);
      }
      
      .stats-table td {
        padding: 0.75rem;
        border-bottom: 1px solid var(--border-color);
        color: var(--text-secondary);
      }
      
      /* Color indicators for tags */
      .color-tag {
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-right: 5px;
      }
      
      /* Button styles */
      .action-btn {
        display: inline-flex;
        align-items: center;
        padding: 0.375rem 0.75rem;
        font-weight: 500;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        border: 1px solid transparent;
        border-radius: 0.25rem;
        cursor: pointer;
        color: var(--text-primary);
        background-color: var(--bg-tertiary);
      }
      
      .action-btn:hover {
        color: var(--primary);
      }
      
      .btn-primary {
        background-color: var(--primary);
        color: white;
      }
      
      .btn-primary:hover {
        background-color: var(--primary-dark);
        color: white;
      }
    
    /* Responsive Design */
    @media (max-width: 768px) {
        .stats-number {
            font-size: 2rem;
        }
        
        .stats-icon {
            font-size: 1.5rem;
        }
        
        .month-bars {
            grid-template-columns: 1fr;
        }
        
        .month-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
        }
        
        .d-flex.gap-2 {
            flex-direction: column;
        }
        
        .btn {
            width: 100%;
        }
    }
    
    /* Card Enhancements */
    .card {
        border: none;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: box-shadow 0.2s ease;
    }
    
    .card:hover {
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    
    .card-header {
        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        border-bottom: 1px solid #dee2e6;
    }
    
    /* Animation for progress bars */
    .progress-bar {
        transition: width 0.6s ease;
    }
</style>