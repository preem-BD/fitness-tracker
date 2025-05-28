/* 
  MONGODB CONNECTION SETUP - CLEAN VERSION
  Zentrale Datenbankverbindung für SvelteKit
*/

import { MongoClient } from 'mongodb';
import { dev } from '$app/environment';

// Environment Variables mit Fallbacks
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'fitness_tracker';

console.log('🔍 MongoDB Connection Setup:');
console.log('📍 MONGODB_URI:', MONGODB_URI ? 'SET' : 'NOT SET');
console.log('📍 DB_NAME:', DB_NAME);

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable ist nicht definiert');
}

/* 
  MONGODB CLIENT MANAGEMENT
  Singleton Pattern für effiziente Verbindungsverwaltung
*/
let client;
let db;
let isConnected = false;

/* 
  CONNECT TO MONGODB
  Stellt Verbindung zur MongoDB her
*/
export async function connectToDatabase() {
  try {
    if (isConnected && client) {
      console.log('✅ Existing MongoDB connection reused');
      return { client, db };
    }

    console.log('🔄 Connecting to MongoDB...');

    // MongoDB Client erstellen
    client = new MongoClient(MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxIdleTimeMS: 30000
    });

    // Verbindung herstellen
    await client.connect();
    
    // Database auswählen
    db = client.db(DB_NAME);
    
    // Connection testen
    await db.admin().ping();
    
    isConnected = true;
    console.log('✅ MongoDB Connected successfully!');
    console.log('🗄️ Database:', DB_NAME);

    return { client, db };

  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    isConnected = false;
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
}

/* 
  GET DATABASE INSTANCE
*/
export async function getDatabase() {
  if (!isConnected || !db) {
    const connection = await connectToDatabase();
    return connection.db;
  }
  return db;
}

/* 
  CLOSE CONNECTION
*/
export async function closeDatabaseConnection() {
  if (client && isConnected) {
    await client.close();
    isConnected = false;
    client = null;
    db = null;
    console.log('🔒 MongoDB connection closed');
  }
}

/* 
  DATABASE HEALTH CHECK
*/
export async function checkDatabaseHealth() {
  try {
    const database = await getDatabase();
    await database.admin().ping();
    return {
      status: 'healthy',
      connected: true,
      database: DB_NAME,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      connected: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

/* 
  INITIALIZE DATABASE
*/
export async function initializeDatabase() {
  try {
    const database = await getDatabase();
    
    console.log('🔧 Initializing database schema...');

    // Collections erstellen (falls nicht vorhanden)
    const collections = await database.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);

    // Workouts Collection
    if (!collectionNames.includes('workouts')) {
      await database.createCollection('workouts');
      console.log('📁 Created workouts collection');
    }

    // Exercises Collection  
    if (!collectionNames.includes('exercises')) {
      await database.createCollection('exercises');
      console.log('📁 Created exercises collection');
    }

    // Exercise Categories Collection
    if (!collectionNames.includes('exercise_categories')) {
      await database.createCollection('exercise_categories');
      console.log('📁 Created exercise_categories collection');
    }

    // Indexes erstellen
    await database.collection('workouts').createIndex({ name: 1 });
    await database.collection('workouts').createIndex({ difficulty: 1 });
    await database.collection('workouts').createIndex({ created_at: -1 });

    await database.collection('exercises').createIndex({ name: 1 });
    await database.collection('exercises').createIndex({ muscle_group: 1 });
    await database.collection('exercises').createIndex({ difficulty: 1 });

    console.log('📊 Database indexes created');
    console.log('✅ Database initialization complete!');

    return true;

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
}

/* 
  HELPER FUNCTIONS
*/
export async function getCollection(collectionName) {
  const database = await getDatabase();
  return database.collection(collectionName);
}

/* 
  ERROR HANDLING
*/
export function handleDatabaseError(error, operation = 'database operation') {
  console.error(`❌ Database Error during ${operation}:`, error);
  
  if (error.code === 11000) {
    return {
      error: 'Duplicate entry',
      message: 'Ein Eintrag mit diesen Daten existiert bereits',
      code: 'DUPLICATE_KEY'
    };
  }
  
  if (error.name === 'MongoNetworkError') {
    return {
      error: 'Network error',
      message: 'Verbindung zur Datenbank fehlgeschlagen',
      code: 'NETWORK_ERROR'
    };
  }
  
  return {
    error: 'Database error',
    message: 'Ein unerwarteter Datenbankfehler ist aufgetreten',
    code: 'UNKNOWN_ERROR',
    details: error.message
  };
}

/* 
  GRACEFUL SHUTDOWN
*/
if (dev && typeof process !== 'undefined') {
  process.on('SIGINT', async () => {
    console.log('\n🔄 Shutting down gracefully...');
    await closeDatabaseConnection();
    process.exit(0);
  });
}