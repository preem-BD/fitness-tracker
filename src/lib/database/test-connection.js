// Test-Datei für MongoDB Verbindung
import { connectToDatabase, checkDatabaseHealth } from './mongodb.js';

export async function testConnection() {
  try {
    console.log('🧪 Testing MongoDB connection...');
    
    const { client, db } = await connectToDatabase();
    console.log('✅ Connected to MongoDB');
    
    const health = await checkDatabaseHealth();
    console.log('📊 Database Health:', health);
    
    // Collections auflisten
    const collections = await db.listCollections().toArray();
    console.log('📁 Available Collections:', collections.map(c => c.name));
    
    return { success: true, health };
    
  } catch (error) {
    console.error('❌ Connection Test Failed:', error);
    return { success: false, error: error.message };
  }
}