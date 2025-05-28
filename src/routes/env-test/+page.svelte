<h1>🔍 Environment Variables Test</h1>

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
  <h2>Environment Status:</h2>
  <ul>
    <li><strong>MONGODB_URI:</strong> {data.env.MONGODB_URI}</li>
    <li><strong>DB_NAME:</strong> {data.env.DB_NAME}</li>
    <li><strong>NODE_ENV:</strong> {data.env.nodeEnv}</li>
  </ul>
</div>

<script>
  let { data } = $props();
</script>