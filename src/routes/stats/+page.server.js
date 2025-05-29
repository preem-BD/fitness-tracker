
/* 
  STATISTICS PAGE LOAD FUNCTION - KORRIGIERT
  Konsistent mit bestehenden Load Functions
*/

import StatisticsModel from '$lib/database/models/Statistics.js';
import { connectToDatabase } from '$lib/database/mongodb.js';

export async function load() {
  console.log('📊 Loading statistics dashboard...');
  
  try {
    await connectToDatabase();
    
    // Dashboard Statistics laden
    const statsResult = await StatisticsModel.getDashboardStats();
    
    if (!statsResult.success) {
      return {
        stats: null,
        recentActivity: null,
        error: statsResult.error || 'Statistiken konnten nicht geladen werden'
      };
    }

    // Recent Activity laden
    const recentActivity = await StatisticsModel.getRecentActivity(5);

    return {
      stats: statsResult.stats,
      recentActivity,
      lastUpdated: new Date().toISOString()
    };

  } catch (error) {
    console.error('❌ Error loading statistics:', error);
    
    return {
      stats: null,
      recentActivity: null,
      error: `Fehler beim Laden der Statistiken: ${error.message}`
    };
  }
}