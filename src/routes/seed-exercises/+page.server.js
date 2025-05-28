import ExerciseModel from '$lib/database/models/Exercise.js';

export async function load() {
  const exercises = [
    {
      name: "Bankdrücken",
      description: "Klassische Brustübung",
      instructions: "Lege dich auf die Bank, drücke die Hantel nach oben.",
      muscle_group: "Brust",
      equipment: "Langhantel",
      difficulty: "Mittel",
      primary_muscles: ["Brustmuskel", "Trizeps"],
      benefits: ["Stärkt die Brust", "Verbessert Druckkraft"]
    },
    {
      name: "Klimmzüge", 
      description: "Rückenübung am Klimmzugturm",
      instructions: "Ziehe deinen Körper nach oben bis das Kinn über der Stange ist.",
      muscle_group: "Rücken",
      equipment: "Klimmzugstange", 
      difficulty: "Schwer",
      primary_muscles: ["Latissimus", "Bizeps"],
      benefits: ["V-Form", "Oberkörper-Kraft"]
    },
    {
      name: "Kniebeugen",
      description: "Grundübung für Beine",
      instructions: "Gehe in die Kniebeuge und drücke dich wieder hoch.", 
      muscle_group: "Beine",
      equipment: "Körpergewicht",
      difficulty: "Leicht", 
      primary_muscles: ["Quadrizeps", "Gesäß"],
      benefits: ["Beinmuskulatur", "Funktionale Bewegung"]
    }
  ];

  let created = 0;
  for (const ex of exercises) {
    const existing = await ExerciseModel.findByName(ex.name);
    if (!existing) {
      const result = await ExerciseModel.create(ex);
      if (result.success) created++;
    }
  }

  return { success: true, message: `${created} Exercises erstellt!` };
}