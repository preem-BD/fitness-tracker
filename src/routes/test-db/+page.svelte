<h1>🧪 Database Connection Test</h1>

{#if data.connectionTest.success}
  <div style="background: #d4edda; padding: 20px; border-radius: 8px; color: #155724;">
    <h2>✅ Verbindung erfolgreich!</h2>
    <pre>{JSON.stringify(data.connectionTest.health, null, 2)}</pre>
  </div>
{:else}
  <div style="background: #f8d7da; padding: 20px; border-radius: 8px; color: #721c24;">
    <h2>❌ Verbindung fehlgeschlagen!</h2>
    <p><strong>Error:</strong> {data.connectionTest.error}</p>
  </div>
{/if}

<script>
  let { data } = $props();
</script>