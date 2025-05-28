<h1>🔍 Workout Debug Info</h1>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; font-family: monospace;">
  <h2>Connection: {data.connection}</h2>
  
  {#if data.error}
    <div style="background: #f8d7da; padding: 10px; border-radius: 4px; color: #721c24;">
      <strong>Error:</strong> {data.error}
    </div>
  {/if}
  
  {#if data.directCount !== undefined}
    <p><strong>Direct Collection Count:</strong> {data.directCount}</p>
  {/if}
  
  {#if data.rawWorkouts}
    <h3>Raw Workouts:</h3>
    <pre>{JSON.stringify(data.rawWorkouts, null, 2)}</pre>
  {/if}
  
  {#if data.modelResult}
    <h3>Model Result:</h3>
    <pre>{JSON.stringify(data.modelResult, null, 2)}</pre>
  {/if}
</div>

<script>
  let { data } = $props();
</script>