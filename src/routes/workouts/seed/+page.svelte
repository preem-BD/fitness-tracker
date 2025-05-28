<h1>🌱 Workout Database Seeding</h1>

{#if data.success}
  <div style="background: #d4edda; padding: 20px; border-radius: 8px; color: #155724;">
    <h2>✅ {data.message}</h2>
    <p><strong>Timestamp:</strong> {data.timestamp}</p>
    <a href="/workouts" style="color: #155724; font-weight: bold;">
      → Gehe zur Workout-Liste
    </a>
  </div>
{:else}
  <div style="background: #f8d7da; padding: 20px; border-radius: 8px; color: #721c24;">
    <h2>❌ Seeding fehlgeschlagen</h2>
    <p><strong>Error:</strong> {data.error}</p>
    <p><strong>Timestamp:</strong> {data.timestamp}</p>
  </div>
{/if}

<script>
  let { data } = $props();
</script>