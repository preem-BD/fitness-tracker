/* 
  STATISTICS MODEL - MONGODB AGGREGATIONS
  Konsistent mit bestehenden Model-Patterns
  Verwendet connectToDatabase() wie WorkoutModel und ExerciseModel
*/

import { connectToDatabase } from '../mongodb.js';
import { MongoClient } from 'mongodb';

class StatisticsModel {
  
  /*
    GET DATABASE CONNECTION
  */
  static async getDb() {
    await connectToDatabase();
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    return client.db('fitness_tracker');
  }

  /*
    DASHBOARD OVERVIEW STATISTICS
    Sammelt Kernmetriken für das Dashboard
  */
  static async getDashboardStats() {
    try {
      await connectToDatabase();
      
      console.log('📊 Calculating dashboard statistics...');
      
      // MongoDB Client Connection (wie in anderen Models)
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');
      
      // Parallel Queries für bessere Performance
      const [
        workoutStats,
        exerciseStats,
        goalStats,
        categoryStats
      ] = await Promise.all([
        this.getWorkoutStatistics(db),
        this.getExerciseStatistics(db),
        this.getGoalStatistics(db),
        this.getCategoryStatistics(db)
      ]);

      await client.close();

      return {
        success: true,
        stats: {
          workouts: workoutStats,
          exercises: exerciseStats,
          goals: goalStats,
          categories: categoryStats,
          lastUpdated: new Date()
        }
      };

    } catch (error) {
      console.error('❌ Error getting dashboard stats:', error);
      return {
        success: false,
        error: error.message,
        stats: null
      };
    }
  }

  /*
    WORKOUT STATISTICS
    MongoDB Aggregation für Workout-Metriken
  */
  static async getWorkoutStatistics(db) {
    try {
      // Workout Count und Average Duration
      const workoutAggregation = await db.collection('workouts').aggregate([
        {
          $group: {
            _id: null,
            totalWorkouts: { $sum: 1 },
            avgDuration: { $avg: '$duration' },
            totalDuration: { $sum: '$duration' }
          }
        }
      ]).toArray();

      // Workouts by Difficulty
      const difficultyBreakdown = await db.collection('workouts').aggregate([
        {
          $group: {
            _id: '$difficulty',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } }
      ]).toArray();

      // Workouts by Target Muscle
      const muscleBreakdown = await db.collection('workouts').aggregate([
        {
          $group: {
            _id: '$target_muscle',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } }
      ]).toArray();

      const baseStats = workoutAggregation[0] || { 
        totalWorkouts: 0, 
        avgDuration: 0, 
        totalDuration: 0 
      };

      return {
        total: baseStats.totalWorkouts,
        avgDuration: Math.round(baseStats.avgDuration || 0),
        totalDuration: baseStats.totalDuration || 0,
        byDifficulty: difficultyBreakdown.reduce((acc, item) => {
          if (item._id) acc[item._id] = item.count;
          return acc;
        }, {}),
        byMuscle: muscleBreakdown.reduce((acc, item) => {
          if (item._id) acc[item._id] = item.count;
          return acc;
        }, {})
      };

    } catch (error) {
      console.error('❌ Error getting workout statistics:', error);
      return {
        total: 0,
        avgDuration: 0,
        totalDuration: 0,
        byDifficulty: {},
        byMuscle: {}
      };
    }
  }

  /*
    EXERCISE STATISTICS  
    Exercise-Datenbank Metriken
  */
  static async getExerciseStatistics(db) {
    try {
      const exerciseAggregation = await db.collection('exercises').aggregate([
        {
          $group: {
            _id: null,
            totalExercises: { $sum: 1 }
          }
        }
      ]).toArray();

      // Exercises by Muscle Group
      const muscleGroupBreakdown = await db.collection('exercises').aggregate([
        {
          $group: {
            _id: '$muscle_group',
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } }
      ]).toArray();

      // Exercises by Difficulty
      const difficultyBreakdown = await db.collection('exercises').aggregate([
        {
          $group: {
            _id: '$difficulty',
            count: { $sum: 1 }
          }
        }
      ]).toArray();

      const total = exerciseAggregation[0]?.totalExercises || 0;

      return {
        total,
        byMuscleGroup: muscleGroupBreakdown.reduce((acc, item) => {
          if (item._id) acc[item._id] = item.count;
          return acc;
        }, {}),
        byDifficulty: difficultyBreakdown.reduce((acc, item) => {
          if (item._id) acc[item._id] = item.count;
          return acc;
        }, {})
      };

    } catch (error) {
      console.error('❌ Error getting exercise statistics:', error);
      return {
        total: 0,
        byMuscleGroup: {},
        byDifficulty: {}
      };
    }
  }

  /*
    GOAL STATISTICS
    Goals Progress und Achievement Tracking  
  */
  static async getGoalStatistics(db) {
    try {
      const goalAggregation = await db.collection('goals').aggregate([
        {
          $group: {
            _id: null,
            totalGoals: { $sum: 1 },
            achievedGoals: {
              $sum: { $cond: [{ $eq: ['$achieved', true] }, 1, 0] }
            },
            avgProgress: {
              $avg: {
                $cond: [
                  { $gt: ['$target_value', 0] },
                  { $multiply: [{ $divide: ['$current_value', '$target_value'] }, 100] },
                  0
                ]
              }
            }
          }
        }
      ]).toArray();

      // Goals by Type
      const typeBreakdown = await db.collection('goals').aggregate([
        {
          $group: {
            _id: '$goal_type',
            count: { $sum: 1 },
            achieved: {
              $sum: { $cond: [{ $eq: ['$achieved', true] }, 1, 0] }
            }
          }
        }
      ]).toArray();

      const baseStats = goalAggregation[0] || {
        totalGoals: 0,
        achievedGoals: 0,
        avgProgress: 0
      };

      return {
        total: baseStats.totalGoals,
        achieved: baseStats.achievedGoals,
        inProgress: baseStats.totalGoals - baseStats.achievedGoals,
        avgProgress: Math.round(baseStats.avgProgress || 0),
        achievementRate: baseStats.totalGoals > 0 
          ? Math.round((baseStats.achievedGoals / baseStats.totalGoals) * 100)
          : 0,
        byType: typeBreakdown.reduce((acc, item) => {
          if (item._id) {
            acc[item._id] = {
              total: item.count,
              achieved: item.achieved
            };
          }
          return acc;
        }, {})
      };

    } catch (error) {
      console.error('❌ Error getting goal statistics:', error);
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
    CATEGORY STATISTICS
    Exercise Categories Breakdown
  */
  static async getCategoryStatistics(db) {
    try {
      const categoryAggregation = await db.collection('exercise_categories').aggregate([
        {
          $lookup: {
            from: 'exercises',
            localField: '_id',
            foreignField: 'category_id',
            as: 'exercises'
          }
        },
        {
          $project: {
            name: 1,
            color: 1,
            exerciseCount: { $size: '$exercises' }
          }
        },
        { $sort: { exerciseCount: -1 } }
      ]).toArray();

      return categoryAggregation.map(cat => ({
        name: cat.name,
        color: cat.color || '#667eea',
        exerciseCount: cat.exerciseCount
      }));

    } catch (error) {
      console.error('❌ Error getting category statistics:', error);
      return [];
    }
  }

  /*
    RECENT ACTIVITY STATISTICS
    Letzte Aktivitäten für Timeline
  */
  static async getRecentActivity(limit = 5) {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');

      // Recent Goals (last updated)
      const recentGoals = await db.collection('goals')
        .find({})
        .sort({ updated_at: -1 })
        .limit(limit)
        .toArray();

      // Recent Workouts (by creation date)
      const recentWorkouts = await db.collection('workouts')
        .find({})
        .sort({ created_at: -1 })
        .limit(limit)
        .toArray();

      await client.close();
      

      return {
        goals: recentGoals.map(goal => ({
          id: goal._id.toString(),
          title: goal.title,
          type: 'goal',
          progress: goal.target_value > 0 
            ? Math.round((goal.current_value / goal.target_value) * 100)
            : 0,
          updated: goal.updated_at
        })),
        workouts: recentWorkouts.map(workout => ({
          id: workout._id.toString(),
          name: workout.name,
          type: 'workout',
          difficulty: workout.difficulty,
          created: workout.created_at
        }))
      };
    } catch (error) {
      console.error('❌ Error getting recent activity:', error);
      return {
        goals: [],
        workouts: []
      };
    }
  }

  /*
    GET GOAL TYPE STATS - NEW FUNCTION
    Separate Funktion für bessere Goal-Type Darstellung mit deutschen Labels
  */
  static async getGoalTypeStats() {
    try {
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('fitness_tracker');
      
      console.log('📊 Calculating goal type statistics...');
      
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
      
      // Deutsche Goal Type Labels
      const goalTypeLabels = {
        'weight_loss': 'Gewichtsverlust',
        'weight_gain': 'Gewichtszunahme', 
        'muscle_gain': 'Muskelaufbau',
        'strength': 'Krafttraining',
        'endurance': 'Ausdauer',
        'flexibility': 'Flexibilität',
        'habit': 'Gewohnheit',
        'health': 'Gesundheit',
        'other': 'Sonstiges'
      };
      
      const result = typeStats.map(stat => ({
        type: stat._id || 'other',
        label: goalTypeLabels[stat._id] || stat._id || 'Unbekannt',
        count: stat.count,
        achieved: stat.achieved,
        completionRate: Math.round(stat.completionRate || 0)
      }));
      
      console.log('✅ Calculated goal type stats with German labels:', result.length);
      return result;
      
    } catch (error) {
      console.error('❌ Error getting goal type stats:', error);
      return [];
    }
  }
}

export default StatisticsModel;