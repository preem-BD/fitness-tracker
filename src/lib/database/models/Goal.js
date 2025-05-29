
import { MongoClient, ObjectId } from 'mongodb';

export class GoalModel {
  
  /*
    GET ALL GOALS
    Lädt alle Goals mit optionalen Filtern
  */
  static async findAll(filters = {}) {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');
      
      // Build query object
      let query = {};
      
      if (filters.goal_type) {
        query.goal_type = filters.goal_type;
      }
      
      if (filters.achieved !== undefined) {
        query.achieved = filters.achieved;
      }
      
      if (filters.search) {
        query.$or = [
          { title: { $regex: filters.search, $options: 'i' } },
          { description: { $regex: filters.search, $options: 'i' } }
        ];
      }
      
      const goals = await db.collection('goals')
        .find(query)
        .sort({ created_at: -1 })
        .toArray();
      
      await client.close();
      
      console.log(`✅ Found ${goals.length} goals`);
      return {
        success: true,
        goals: goals,
        total: goals.length
      };
      
    } catch (error) {
      console.error('❌ Error finding goals:', error);
      return {
        success: false,
        goals: [],
        total: 0,
        error: error.message
      };
    }
  }

  /*
    GET GOAL BY ID
    Lädt ein spezifisches Goal
  */
  static async getGoalById(goalId) {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');
      
      const goal = await db.collection('goals').findOne({ 
        _id: new ObjectId(goalId) 
      });
      
      await client.close();
      
      if (!goal) {
        throw new Error(`Goal with ID ${goalId} not found`);
      }
      
      console.log(`✅ Found goal: ${goal.title}`);
      return goal;
      
    } catch (error) {
      console.error('❌ Error getting goal by ID:', error);
      throw error;
    }
  }

  /*
    CREATE GOAL
    Erstellt ein neues Goal
  */
  static async createGoal(goalData) {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');
      
      const newGoal = {
        title: goalData.title,
        description: goalData.description,
        goal_type: goalData.goal_type,
        target_value: Number(goalData.target_value),
        current_value: 0, // Start bei 0
        unit: goalData.unit,
        target_date: goalData.target_date ? new Date(goalData.target_date) : null,
        achieved: false,  // Start nicht achieved
        created_at: new Date(),
        updated_at: new Date()
      };
      
      const result = await db.collection('goals').insertOne(newGoal);
      await client.close();
      
      console.log(`✅ Created goal: ${newGoal.title}`);
      return result.insertedId.toString();
      
    } catch (error) {
      console.error('❌ Error creating goal:', error);
      throw error;
    }
  }

  /*
    UPDATE GOAL
    Aktualisiert Goal-Details (für Edit)
  */
  static async updateGoal(goalId, updateData) {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');
      
      // Prepare update data
      const updateFields = {
        title: updateData.title,
        description: updateData.description,
        goal_type: updateData.goal_type,
        target_value: Number(updateData.target_value),
        unit: updateData.unit,
        updated_at: new Date()
      };
      
      if (updateData.target_date) {
        updateFields.target_date = new Date(updateData.target_date);
      }
      
      const result = await db.collection('goals').updateOne(
        { _id: new ObjectId(goalId) },
        { $set: updateFields }
      );
      
      await client.close();
      
      console.log(`✅ Updated goal: ${goalId}`);
      return result.modifiedCount === 1;
      
    } catch (error) {
      console.error('❌ Error updating goal:', error);
      return false;
    }
  }

  /*
    UPDATE PROGRESS
    Aktualisiert den Fortschritt mit automatischem Achievement Check
  */
  static async updateProgress(goalId, newCurrentValue) {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');
      
      // Erst Goal laden um target_value zu prüfen
      const goal = await db.collection('goals').findOne({ 
        _id: new ObjectId(goalId) 
      });
      
      if (!goal) {
        await client.close();
        console.log(`❌ Goal ${goalId} not found`);
        return false;
      }
      
      // Check if achieved (current_value >= target_value)
      const isAchieved = newCurrentValue >= goal.target_value;
      
      // Update progress UND achievement status
      const result = await db.collection('goals').updateOne(
        { _id: new ObjectId(goalId) },
        { 
          $set: { 
            current_value: Number(newCurrentValue),
            achieved: isAchieved,
            updated_at: new Date()
          }
        }
      );
      
      await client.close();
      
      console.log(`✅ Goal ${goalId} updated: ${newCurrentValue}/${goal.target_value}, achieved: ${isAchieved}`);
      return result.modifiedCount === 1;
      
    } catch (error) {
      console.error('❌ Error updating progress:', error);
      return false;
    }
  }

  /*
    DELETE GOAL
    Löscht ein Goal
  */
  static async deleteGoal(goalId) {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');
      
      const result = await db.collection('goals').deleteOne({ 
        _id: new ObjectId(goalId) 
      });
      
      await client.close();
      
      console.log(`✅ Deleted goal: ${goalId}`);
      return result.deletedCount === 1;
      
    } catch (error) {
      console.error('❌ Error deleting goal:', error);
      return false;
    }
  }

  /*
    GET STATISTICS
    Berechnet Goal-Statistiken
  */
  static async getStatistics() {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');
      
      // Alle Goals laden für Statistiken
      const goals = await db.collection('goals').find({}).toArray();
      
      const total = goals.length;
      const achieved = goals.filter(g => g.achieved).length;
      
      let avgProgress = 0;
      if (total > 0) {
        const totalProgress = goals.reduce((sum, g) => {
          const progress = (g.current_value || 0) / (g.target_value || 1);
          return sum + Math.min(progress, 1);
        }, 0);
        avgProgress = totalProgress / total;
      }
      
      // Goals by Type
      const byType = {};
      goals.forEach(g => {
        const type = g.goal_type || 'other';
        if (!byType[type]) {
          byType[type] = { total: 0, achieved: 0 };
        }
        byType[type].total++;
        if (g.achieved) {
          byType[type].achieved++;
        }
      });
      
      await client.close();
      
      const stats = {
        total,
        achieved,
        inProgress: total - achieved,
        avgProgress,
        achievementRate: total > 0 ? Math.round((achieved / total) * 100) : 0,
        byType
      };
      
      console.log('✅ Calculated goal statistics:', stats);
      return stats;
      
    } catch (error) {
      console.error('❌ Error getting statistics:', error);
      return {
        total: 0,
        achieved: 0,
        inProgress: 0,
        avgProgress: 0,
        achievementRate: 0,
        byType: {}
      };
    }
  }

  /*
    CHECK ALL ACHIEVEMENTS
    Bulk-Update für Achievement Status aller Goals
  */
  static async checkAllAchievements() {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');
      
      // Alle Goals laden
      const goals = await db.collection('goals').find({}).toArray();
      
      let updatedCount = 0;
      
      for (const goal of goals) {
        const shouldBeAchieved = goal.current_value >= goal.target_value;
        
        if (goal.achieved !== shouldBeAchieved) {
          await db.collection('goals').updateOne(
            { _id: goal._id },
            { 
              $set: { 
                achieved: shouldBeAchieved,
                updated_at: new Date()
              }
            }
          );
          updatedCount++;
          console.log(`🔄 Updated "${goal.title}" achievement status to: ${shouldBeAchieved}`);
        }
      }
      
      await client.close();
      
      console.log(`✅ Updated achievement status for ${updatedCount} goals`);
      return updatedCount;
      
    } catch (error) {
      console.error('❌ Error checking all achievements:', error);
      return 0;
    }
  }

  /*
    GET RECENT GOALS
    Lädt die neuesten Goals für Dashboard
  */
  static async getRecentGoals(limit = 5) {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');
      
      const goals = await db.collection('goals')
        .find({})
        .sort({ updated_at: -1 })
        .limit(limit)
        .toArray();
      
      await client.close();
      
      console.log(`✅ Found ${goals.length} recent goals`);
      return goals;
      
    } catch (error) {
      console.error('❌ Error getting recent goals:', error);
      return [];
    }
  }

  /*
    ADVANCED STATISTICS for Dashboard
  */
  static async getOverallStats() {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');
      
      // Aggregation Pipeline für erweiterte Statistiken
      const stats = await db.collection('goals').aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            achieved: { $sum: { $cond: ['$achieved', 1, 0] } },
            avgProgress: {
              $avg: {
                $cond: [
                  { $gt: ['$target_value', 0] },
                  { $divide: ['$current_value', '$target_value'] },
                  0
                ]
              }
            },
            withTargetDate: {
              $sum: { $cond: [{ $ne: ['$target_date', null] }, 1, 0] }
            },
            overdue: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $ne: ['$target_date', null] },
                      { $lt: ['$target_date', new Date()] },
                      { $eq: ['$achieved', false] }
                    ]
                  },
                  1,
                  0
                ]
              }
            }
          }
        }
      ]).toArray();
      
      await client.close();
      
      const result = stats[0] || {
        total: 0,
        achieved: 0,
        avgProgress: 0,
        withTargetDate: 0,
        overdue: 0
      };
      
      result.completionRate = result.total > 0 ? (result.achieved / result.total) * 100 : 0;
      
      console.log('✅ Calculated overall stats:', result);
      return result;
      
    } catch (error) {
      console.error('❌ Error getting overall stats:', error);
      return {
        total: 0,
        achieved: 0,
        avgProgress: 0,
        completionRate: 0,
        withTargetDate: 0,
        overdue: 0
      };
    }
  }

  /*
    GET GOAL TYPE STATS
    Statistiken nach Goal-Typ
  */
  static async getGoalTypeStats() {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');
      
      const typeStats = await db.collection('goals').aggregate([
        {
          $group: {
            _id: '$goal_type',
            count: { $sum: 1 },
            achieved: { $sum: { $cond: ['$achieved', 1, 0] } }
          }
        },
        {
          $project: {
            _id: 1,
            count: 1,
            achieved: 1,
            completionRate: {
              $cond: [
                { $gt: ['$count', 0] },
                { $multiply: [{ $divide: ['$achieved', '$count'] }, 100] },
                0
              ]
            }
          }
        },
        { $sort: { count: -1 } }
      ]).toArray();
      
      await client.close();
      
      // Goal Type Labels
      const goalTypeLabels = {
        'weight_loss': 'Gewichtsverlust',
        'weight_gain': 'Gewichtszunahme', 
        'muscle_gain': 'Muskelaufbau',
        'strength': 'Krafttraining',
        'endurance': 'Ausdauer',
        'flexibility': 'Flexibilität',
        'habit': 'Gewohnheit',
        'other': 'Sonstiges'
      };
      
      const result = typeStats.map(stat => ({
        ...stat,
        label: goalTypeLabels[stat._id] || stat._id
      }));
      
      console.log('✅ Calculated goal type stats:', result.length);
      return result;
      
    } catch (error) {
      console.error('❌ Error getting goal type stats:', error);
      return [];
    }
  }

  /*
    GET PROGRESS DISTRIBUTION
    Verteilung der Fortschritte in Prozent-Buckets
  */
  static async getProgressDistribution() {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');
      
      const distribution = await db.collection('goals').aggregate([
        {
          $project: {
            progressPercent: {
              $cond: [
                { $gt: ['$target_value', 0] },
                { $multiply: [{ $divide: ['$current_value', '$target_value'] }, 100] },
                0
              ]
            }
          }
        },
        {
          $bucket: {
            groupBy: '$progressPercent',
            boundaries: [0, 25, 50, 75, 100, 999],
            default: 'other',
            output: {
              count: { $sum: 1 }
            }
          }
        }
      ]).toArray();
      
      await client.close();
      
      // Format results with labels
      const bucketLabels = {
        0: '0-24%',
        25: '25-49%', 
        50: '50-74%',
        75: '75-99%',
        100: '100%+',
        'other': 'Andere'
      };
      
      const result = distribution.map(bucket => ({
        _id: bucket._id,
        label: bucketLabels[bucket._id] || bucket._id,
        count: bucket.count
      }));
      
      console.log('✅ Calculated progress distribution:', result.length);
      return result;
      
    } catch (error) {
      console.error('❌ Error getting progress distribution:', error);
      return [];
    }
  }

  /*
    GET MONTHLY PROGRESS
    Monatliche Goal-Erstellung und -Vollendung
  */
  static async getMonthlyProgressStats() {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');
      
      const monthlyStats = await db.collection('goals').aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$created_at' },
              month: { $month: '$created_at' }
            },
            goalsCreated: { $sum: 1 },
            goalsAchieved: { $sum: { $cond: ['$achieved', 1, 0] } }
          }
        },
        {
          $project: {
            _id: 1,
            goalsCreated: 1,
            goalsAchieved: 1,
            monthLabel: {
              $concat: [
                { $toString: '$_id.month' },
                '/',
                { $toString: '$_id.year' }
              ]
            }
          }
        },
        { $sort: { '_id.year': -1, '_id.month': -1 } },
        { $limit: 6 }
      ]).toArray();
      
      await client.close();
      
      console.log('✅ Calculated monthly stats:', monthlyStats.length);
      return monthlyStats.reverse(); // Oldest first
      
    } catch (error) {
      console.error('❌ Error getting monthly stats:', error);
      return [];
    }
  }
}