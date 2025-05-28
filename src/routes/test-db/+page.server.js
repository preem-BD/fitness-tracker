import { testConnection } from '$lib/database/test-connection.js';

export async function load() {
  console.log('🧪 Testing database connection...');
  
  const result = await testConnection();
  
  return {
    connectionTest: result
  };
}