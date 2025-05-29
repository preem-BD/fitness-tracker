// MongoDB Seeding Script für realistische Demo-Daten
// Ausführen mit: node scripts/seed-database.js

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME || 'fitness_tracker';

async function seedDatabase() {
    console.log('🌱 Starting database seeding...');
    console.log('📍 MongoDB URI:', MONGODB_URI ? 'Connected' : 'Missing');
    console.log('📍 Database:', DB_NAME);
    
    const client = new MongoClient(MONGODB_URI);
    
    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');
        
        const db = client.db(DB_NAME);
        
        // Clear existing data
        console.log('🗑️ Clearing existing data...');
        await db.collection('goals').deleteMany({});
        await db.collection('workouts').deleteMany({});
        await db.collection('exercises').deleteMany({});
        await db.collection('exercise_categories').deleteMany({});
        await db.collection('workout_sessions').deleteMany({});
        console.log('✅ All collections cleared');
        
        // 1. Seed Exercise Categories
        console.log('📁 Seeding exercise categories...');
        const categories = [
            { name: 'Krafttraining', description: 'Übungen zum Muskelaufbau', color: '#e74c3c' },
            { name: 'Cardio', description: 'Ausdauertraining', color: '#3498db' },
            { name: 'Flexibilität', description: 'Stretching und Beweglichkeit', color: '#9b59b6' },
            { name: 'Eigengewicht', description: 'Übungen ohne Equipment', color: '#27ae60' },
            { name: 'Functional', description: 'Funktionelle Bewegungen', color: '#f39c12' },
            { name: 'Core', description: 'Rumpfstabilisation', color: '#e67e22' },
            { name: 'Rehabilitation', description: 'Therapie und Regeneration', color: '#95a5a6' },
            { name: 'Sport-Spezifisch', description: 'Sportartspezifisches Training', color: '#34495e' }
        ];
        
        const categoryResult = await db.collection('exercise_categories').insertMany(categories);
        console.log(`✅ ${categoryResult.insertedCount} categories inserted`);
        
        // Get category IDs
        const insertedCategories = await db.collection('exercise_categories').find({}).toArray();
        const getCategoryId = (name) => insertedCategories.find(c => c.name === name)._id;
        
        // 2. Seed Exercises (50+ exercises)
        console.log('🏋️ Seeding exercises...');
        const exercises = [
            // BRUST
            {
                name: 'Bankdrücken',
                description: 'Klassische Brustübung mit der Langhantel für maximalen Kraftaufbau',
                instructions: '1. Auf die Bank legen, Füße fest am Boden\n2. Langhantel mit weitem Griff fassen\n3. Kontrolliert zur Brust senken\n4. Kraftvoll nach oben drücken\n5. Schulterblätter zusammengezogen halten',
                muscle_group: 'Brust',
                equipment: 'Langhantel',
                difficulty: 'Mittel',
                category_id: getCategoryId('Krafttraining'),
                primary_muscles: ['Brustmuskel', 'Trizeps'],
                secondary_muscles: ['Schultern', 'Core'],
                sets_beginner: '3x8-10',
                sets_intermediate: '4x6-8',
                sets_advanced: '5x4-6',
                rest_time: '2-3 Minuten',
                benefits: ['Kraftaufbau Oberkörper', 'Muskelmasse Brust', 'Funktionale Kraft', 'Stabile Basis für andere Übungen'],
                tips: ['Schulterblätter zusammenziehen', 'Kontrollierte Bewegung', 'Vollständige Bewegungsamplitude', 'Nicht bis zur kompletten Erschöpfung'],
                variations: [
                    { name: 'Schrägbankdrücken', description: 'Mit geneigter Bank für obere Brust' },
                    { name: 'Kurzhantel Bankdrücken', description: 'Mit Kurzhanteln für größere Bewegungsfreiheit' }
                ],
                image_url: null
            },
            {
                name: 'Liegestütze',
                description: 'Klassische Eigengewichtsübung für die Brust - überall durchführbar',
                instructions: '1. Plank Position einnehmen\n2. Hände schulterbreit platzieren\n3. Körper kontrolliert senken bis Brust fast den Boden berührt\n4. Explosiv nach oben drücken\n5. Körperspannung halten',
                muscle_group: 'Brust',
                equipment: 'Körpergewicht',
                difficulty: 'Leicht',
                category_id: getCategoryId('Eigengewicht'),
                primary_muscles: ['Brustmuskel', 'Trizeps'],
                secondary_muscles: ['Schultern', 'Core', 'Serratus'],
                sets_beginner: '3x5-8',
                sets_intermediate: '3x10-15',
                sets_advanced: '4x15-20',
                rest_time: '60-90 Sekunden',
                benefits: ['Keine Geräte nötig', 'Ganzkörperstabilisation', 'Funktionale Kraft', 'Überall durchführbar'],
                tips: ['Gerader Körper von Kopf bis Fuß', 'Brust bis zum Boden', 'Kontrollierte Bewegung', 'Core anspannen'],
                variations: [
                    { name: 'Diamond Push-ups', description: 'Hände als Diamant für Trizeps-Focus' },
                    { name: 'Erhöhte Füße', description: 'Füße auf Bank für mehr Intensität' },
                    { name: 'Einarmige Liegestütze', description: 'Ultimate Challenge für Fortgeschrittene' }
                ],
                image_url: null
            },
            {
                name: 'Dips',
                description: 'Intensive Trizeps- und Brustübung am Barren oder Bank',
                instructions: '1. An Barren oder Bank abstützen\n2. Körper kontrolliert senken\n3. Ellbogen nach hinten führen\n4. Kraftvoll nach oben drücken\n5. Oberkörper leicht nach vorne neigen',
                muscle_group: 'Brust',
                equipment: 'Barren',
                difficulty: 'Mittel',
                category_id: getCategoryId('Eigengewicht'),
                primary_muscles: ['Trizeps', 'Untere Brust'],
                secondary_muscles: ['Schultern'],
                sets_beginner: '3x5-8',
                sets_intermediate: '3x8-12',
                sets_advanced: '4x12-15',
                rest_time: '2 Minuten',
                benefits: ['Starker Trizeps', 'Untere Brustpartie', 'Funktionale Druckkraft'],
                tips: ['Nicht zu tief gehen', 'Ellbogen nah am Körper', 'Langsame Ausführung'],
                variations: [
                    { name: 'Assisted Dips', description: 'Mit Widerstandsband für Anfänger' },
                    { name: 'Weighted Dips', description: 'Mit Zusatzgewicht für Profis' }
                ],
                image_url: null
            },

            // RÜCKEN
            {
                name: 'Klimmzüge',
                description: 'Die beste Übung für einen breiten, starken Rücken',
                instructions: '1. An die Klimmzugstange hängen\n2. Obergriff, etwas breiter als schulterbreit\n3. Körper nach oben ziehen bis Kinn über Stange\n4. Kontrolliert ablassen bis Arme gestreckt\n5. Keine Schwungbewegung',
                muscle_group: 'Rücken',
                equipment: 'Klimmzugstange',
                difficulty: 'Schwer',
                category_id: getCategoryId('Eigengewicht'),
                primary_muscles: ['Latissimus', 'Bizeps'],
                secondary_muscles: ['Hintere Schulter', 'Rhomboids', 'Mittlerer Trapezius'],
                sets_beginner: '3x3-5',
                sets_intermediate: '3x6-10',
                sets_advanced: '4x10-15',
                rest_time: '2-3 Minuten',
                benefits: ['V-Form Oberkörper', 'Funktionale Zugkraft', 'Griffkraft', 'Haltungsverbesserung'],
                tips: ['Vollständige Streckung', 'Schulterblätter aktiv nach unten', 'Keine Schwungbewegung', 'Kinn über die Stange'],
                variations: [
                    { name: 'Chin-ups (Untergriff)', description: 'Untergriff für mehr Bizeps-Aktivierung' },
                    { name: 'Assisted Pull-ups', description: 'Mit Widerstandsband für Anfänger' },
                    { name: 'Weighted Pull-ups', description: 'Mit Zusatzgewicht für Fortgeschrittene' }
                ],
                image_url: null
            },
            {
                name: 'Rudern mit Langhantel',
                description: 'Klassische Rückenübung für Kraft und Muskelmasse',
                instructions: '1. Leicht gebeugte Knie, Oberkörper 45° vorgeneigt\n2. Langhantel mit weitem Griff\n3. Zur unteren Brust/oberen Bauch ziehen\n4. Kontrolliert ablassen\n5. Geraden Rücken halten',
                muscle_group: 'Rücken',
                equipment: 'Langhantel',
                difficulty: 'Mittel',
                category_id: getCategoryId('Krafttraining'),
                primary_muscles: ['Latissimus', 'Rhomboids', 'Mittlerer Trapezius'],
                secondary_muscles: ['Bizeps', 'Hintere Schulter', 'Core'],
                sets_beginner: '3x8-10',
                sets_intermediate: '4x6-8',
                sets_advanced: '4x4-6',
                rest_time: '2-3 Minuten',
                benefits: ['Rückenbreite', 'Haltungsverbesserung', 'Zugkraft', 'Rückendicke'],
                tips: ['Gerader Rücken', 'Ellbogen am Körper entlang', 'Schulterblätter zusammenziehen', 'Zur Körpermitte ziehen'],
                variations: [
                    { name: 'T-Bar Rudern', description: 'Mit T-Bar für andere Griffposition' },
                    { name: 'Kurzhantel Rudern', description: 'Einarmig mit Kurzhantel' }
                ],
                image_url: null
            },
            {
                name: 'Latzug',
                description: 'Maschinenvariante der Klimmzüge mit variabler Belastung',
                instructions: '1. Auf die Bank setzen, Knie unter Polster\n2. Stange mit weitem Obergriff\n3. Zur oberen Brust ziehen\n4. Langsam kontrolliert nach oben\n5. Aufrechte Haltung beibehalten',
                muscle_group: 'Rücken',
                equipment: 'Maschinen',
                difficulty: 'Leicht',
                category_id: getCategoryId('Krafttraining'),
                primary_muscles: ['Latissimus', 'Rhomboids'],
                secondary_muscles: ['Bizeps', 'Hintere Schulter'],
                sets_beginner: '3x10-12',
                sets_intermediate: '4x8-10',
                sets_advanced: '4x6-8',
                rest_time: '90 Sekunden',
                benefits: ['Einstieg in Zugbewegungen', 'Kontrollierte Belastung', 'Variabel skalierbar'],
                tips: ['Nicht hinter den Nacken', 'Aufrechte Position', 'Volle Streckung nach oben'],
                variations: [
                    { name: 'Enger Griff', description: 'Für mehr Rhomboids-Aktivierung' },
                    { name: 'Neutraler Griff', description: 'Schonender für Handgelenke' }
                ],
                image_url: null
            },

            // BEINE
            {
                
                name: 'Kniebeugen',
                description: 'König der Übungen - ultimatives Beintraining',
                instructions: '1. Schulterbreiter Stand, Zehen leicht nach außen\n2. Langhantel auf oberem Trapezius\n3. Kontrolliert in die Hocke, Knie über Fußspitzen\n4. Bis Oberschenkel parallel zum Boden\n5. Explosiv nach oben drücken',
                muscle_group: 'Beine',
                equipment: 'Langhantel',
                difficulty: 'Mittel',
                category_id: getCategoryId('Krafttraining'),
                primary_muscles: ['Quadrizeps', 'Gesäßmuskel'],
                secondary_muscles: ['Hamstrings', 'Waden', 'Core', 'Rückenstrecker'],
                sets_beginner: '3x8-10',
                sets_intermediate: '4x6-8',
                sets_advanced: '5x4-6',
                rest_time: '3-4 Minuten',
                benefits: ['Beinmuskulatur', 'Funktionale Kraft', 'Hormonausschüttung', 'Ganzkörperstabilität'],
                tips: ['Knie über Fußspitzen', 'Gerader Rücken', 'Vollständige Tiefe', 'Fersen am Boden'],
                variations: [
                    { name: 'Front Squats', description: 'Langhantel vorne für mehr Quad-Aktivierung' },
                    { name: 'Goblet Squats', description: 'Mit Kurzhantel für Anfänger' },
                    { name: 'Bulgarian Split Squats', description: 'Einbeinig für Balance und Stabilität' }
                ],
                image_url: null
            },
            {
                name: 'Kreuzheben',
                description: 'Ultimative Ganzkörperübung für maximale Kraft',
                instructions: '1. Langhantel vor den Füßen, enger Stand\n2. Gerader Rücken, Brust raus\n3. Langhantel am Körper entlang nach oben\n4. Hüfte nach vorne schieben, aufrichten\n5. Kontrolliert ablassen',
                muscle_group: 'Beine',
                equipment: 'Langhantel',
                difficulty: 'Schwer',
                category_id: getCategoryId('Krafttraining'),
                primary_muscles: ['Hamstrings', 'Gesäßmuskel', 'Erector Spinae'],
                secondary_muscles: ['Quadrizeps', 'Trapezius', 'Unterarme', 'Core'],
                sets_beginner: '3x5',
                sets_intermediate: '4x3-5',
                sets_advanced: '5x1-3',
                rest_time: '3-5 Minuten',
                benefits: ['Ganzkörperkraft', 'Funktionale Bewegung', 'Massive Muskelmasse', 'Haltungskorrektur'],
                tips: ['Langhantel am Körper', 'Neutraler Rücken', 'Hüftbewegung initiieren', 'Langsam lernen'],
                variations: [
                    { name: 'Sumo Deadlift', description: 'Breitere Fußstellung für andere Muskelverteilung' },
                    { name: 'Romanian Deadlift', description: 'Focus auf Hamstrings und Gesäß' },
                    { name: 'Trap Bar Deadlift', description: 'Anfängerfreundliche Variante' }
                ],
                image_url: null
            },
            {
                name: 'Ausfallschritte',
                description: 'Unilaterale Beinübung für Balance und Kraft',
                instructions: '1. Großer Schritt nach vorne\n2. Beide Knie 90° beugen\n3. Hinteres Knie fast zum Boden\n4. Kraftvoll zurück in Startposition\n5. Oberkörper aufrecht halten',
                muscle_group: 'Beine',
                equipment: 'Körpergewicht',
                difficulty: 'Leicht',
                category_id: getCategoryId('Eigengewicht'),
                primary_muscles: ['Quadrizeps', 'Gesäßmuskel'],
                secondary_muscles: ['Hamstrings', 'Waden', 'Core'],
                sets_beginner: '3x8 pro Bein',
                sets_intermediate: '3x12 pro Bein',
                sets_advanced: '4x15 pro Bein',
                rest_time: '60-90 Sekunden',
                benefits: ['Unilaterales Training', 'Balance und Koordination', 'Funktionale Bewegung'],
                tips: ['Großer Schritt', 'Aufrechter Oberkörper', 'Knie über Fußspitze', 'Kontrollierte Bewegung'],
                variations: [
                    { name: 'Walking Lunges', description: 'Gehende Ausfallschritte' },
                    { name: 'Reverse Lunges', description: 'Schritt nach hinten' },
                    { name: 'Lateral Lunges', description: 'Seitliche Ausfallschritte' }
                ],
                image_url: null
            },

            // SCHULTERN
            {
                name: 'Schulterdrücken',
                description: 'Klassisches Schultertraining für runde Deltas',
                instructions: '1. Aufrecht sitzen oder stehen\n2. Kurzhanteln auf Schulterhöhe\n3. Gerade nach oben drücken ohne Lock-out\n4. Kontrolliert senken\n5. Core anspannen für Stabilität',
                muscle_group: 'Schultern',
                equipment: 'Kurzhanteln',
                difficulty: 'Mittel',
                category_id: getCategoryId('Krafttraining'),
                primary_muscles: ['Vorderer Deltoideus', 'Seitlicher Deltoideus'],
                secondary_muscles: ['Trizeps', 'Oberer Trapezius', 'Core'],
                sets_beginner: '3x8-12',
                sets_intermediate: '4x6-10',
                sets_advanced: '4x4-8',
                rest_time: '2-3 Minuten',
                benefits: ['Schulterbreite', 'Überkopfkraft', 'Stabilität', 'V-Form Oberkörper'],
                tips: ['Kontrollierte Bewegung', 'Nicht komplett strecken', 'Core anspannen', 'Volle Bewegungsamplitude'],
                variations: [
                    { name: 'Arnold Press', description: 'Mit Rotation für alle Schulterköpfe' },
                    { name: 'Military Press', description: 'Mit Langhantel stehend' },
                    { name: 'Pike Push-ups', description: 'Eigengewichtsvariante' }
                ],
                image_url: null
            },
            {
                name: 'Seitheben',
                description: 'Isolation für die seitlichen Schultern',
                instructions: '1. Kurzhanteln seitlich am Körper\n2. Leicht gebeugte Ellbogen\n3. Arme seitlich bis Schulterhöhe heben\n4. Kurz halten\n5. Kontrolliert senken',
                muscle_group: 'Schultern',
                equipment: 'Kurzhanteln',
                difficulty: 'Leicht',
                category_id: getCategoryId('Krafttraining'),
                primary_muscles: ['Seitlicher Deltoideus'],
                secondary_muscles: ['Vorderer Deltoideus', 'Trapezius'],
                sets_beginner: '3x12-15',
                sets_intermediate: '4x10-12',
                sets_advanced: '4x8-10',
                rest_time: '60-90 Sekunden',
                benefits: ['Schulterbreite', 'Seitliche Schulterpartie', 'V-Form'],
                tips: ['Leichtes Gewicht', 'Kontrollierte Bewegung', 'Daumen zeigt nach unten', 'Nicht über Schulterhöhe'],
                variations: [
                    { name: 'Cable Lateral Raises', description: 'Am Kabelzug für konstante Spannung' },
                    { name: 'Plate Raises', description: 'Mit Hantelscheibe' }
                ],
                image_url: null
            },

            // BIZEPS & TRIZEPS
            {
                name: 'Bizeps Curls',
                description: 'Klassisches Armtraining für starke Bizeps',
                instructions: '1. Kurzhanteln in beiden Händen\n2. Ellbogen nah am Körper\n3. Gewicht nach oben curlen\n4. Kurz anspannen\n5. Langsam senken',
                muscle_group: 'Bizeps',
                equipment: 'Kurzhanteln',
                difficulty: 'Leicht',
                category_id: getCategoryId('Krafttraining'),
                primary_muscles: ['Bizeps'],
                secondary_muscles: ['Brachialis', 'Unterarme'],
                sets_beginner: '3x10-12',
                sets_intermediate: '3x8-10',
                sets_advanced: '4x6-8',
                rest_time: '90 Sekunden',
                benefits: ['Armumfang', 'Funktionale Zugkraft', 'Griffkraft'],
                tips: ['Ellbogen fixiert', 'Volle Bewegung', 'Langsam senken', 'Nicht schwingen'],
                variations: [
                    { name: 'Hammer Curls', description: 'Neutraler Griff für Brachialis' },
                    { name: 'Concentration Curls', description: 'Sitzend für Isolation' }
                ],
                image_url: null
            },
            {
                name: 'Trizeps Dips',
                description: 'Effektive Trizepsübung am Barren oder Bank',
                instructions: '1. An Bank oder Barren abstützen\n2. Beine gestreckt oder angewinkelt\n3. Körper senken bis 90° Ellbogen\n4. Kraftvoll nach oben drücken\n5. Ellbogen nah am Körper',
                muscle_group: 'Trizeps',
                equipment: 'Bank',
                difficulty: 'Mittel',
                category_id: getCategoryId('Eigengewicht'),
                primary_muscles: ['Trizeps'],
                secondary_muscles: ['Schultern', 'Brust'],
                sets_beginner: '3x5-8',
                sets_intermediate: '3x8-12',
                sets_advanced: '4x12-15',
                rest_time: '2 Minuten',
                benefits: ['Starke Arme', 'Druckkraft', 'Definierte Oberarme'],
                tips: ['Nicht zu tief', 'Ellbogen nach hinten', 'Langsame Ausführung', 'Core anspannen'],
                variations: [
                    { name: 'Assisted Dips', description: 'Mit Unterstützung für Anfänger' },
                    { name: 'Weighted Dips', description: 'Mit Zusatzgewicht' }
                ],
                image_url: null
            },

            // CORE/BAUCH
            {
                name: 'Planks',
                description: 'Isometrische Core-Stärkung für einen starken Rumpf',
                instructions: '1. Unterarmstütz Position einnehmen\n2. Körper gerade wie ein Brett\n3. Position statisch halten\n4. Gleichmäßig atmen\n5. Core anspannen',
                muscle_group: 'Bauch',
                equipment: 'Körpergewicht',
                difficulty: 'Leicht',
                category_id: getCategoryId('Core'),
                primary_muscles: ['Rectus Abdominis', 'Transversus Abdominis'],
                secondary_muscles: ['Schultern', 'Rückenstrecker', 'Gesäß'],
                sets_beginner: '3x30s',
                sets_intermediate: '3x60s',
                sets_advanced: '3x90s+',
                rest_time: '60 Sekunden',
                benefits: ['Core-Stabilität', 'Bessere Haltung', 'Verletzungsprävention', 'Funktionale Kraft'],
                tips: ['Gerader Körper', 'Nicht Luft anhalten', 'Hüfte nicht hängen lassen', 'Schultern über Ellbogen'],
                variations: [
                    { name: 'Side Plank', description: 'Seitliche Planks für Obliques' },
                    { name: 'Plank Up-Downs', description: 'Dynamische Variation' },
                    { name: 'Plank with Leg Lifts', description: 'Mit Beinbewegung für mehr Intensität' }
                ],
                image_url: null
            },
            {
                name: 'Crunches',
                description: 'Klassische Bauchübung für definierte Abs',
                instructions: '1. Auf den Rücken legen, Knie angewinkelt\n2. Hände hinter den Kopf oder Brust\n3. Oberkörper nach oben crunchen\n4. Kurz anspannen\n5. Kontrolliert senken',
                muscle_group: 'Bauch',
                equipment: 'Körpergewicht',
                difficulty: 'Leicht',
                category_id: getCategoryId('Core'),
                primary_muscles: ['Rectus Abdominis'],
                secondary_muscles: ['Obliques'],
                sets_beginner: '3x15-20',
                sets_intermediate: '3x20-25',
                sets_advanced: '4x25-30',
                rest_time: '60 Sekunden',
                benefits: ['Bauchmuskel-Definition', 'Core-Kraft', 'Einfach durchführbar'],
                tips: ['Nicht am Nacken ziehen', 'Langsame Bewegung', 'Oberer Rücken hebt ab', 'Atmen nicht vergessen'],
                variations: [
                    { name: 'Bicycle Crunches', description: 'Mit Beinbewegung für Obliques' },
                    { name: 'Reverse Crunches', description: 'Beine zum Oberkörper' }
                ],
                image_url: null
            },

            // CARDIO
            {
                name: 'Laufband Intervall',
                description: 'Hochintensives Intervalltraining für maximale Fettverbrennung',
                instructions: '1. 5 Min Warm-up bei moderatem Tempo\n2. 30 Sekunden Sprint (80-90% Intensität)\n3. 90 Sekunden Erholung (50-60% Intensität)\n4. 8-12 Wiederholungen\n5. 5 Min Cool-down',
                muscle_group: 'Ganzkörper',
                equipment: 'Laufband',
                difficulty: 'Mittel',
                category_id: getCategoryId('Cardio'),
                primary_muscles: ['Beinmuskulatur'],
                secondary_muscles: ['Core', 'Herz-Kreislauf-System'],
                sets_beginner: '6 Intervalle',
                sets_intermediate: '10 Intervalle',
                sets_advanced: '15 Intervalle',
                rest_time: '90 Sekunden zwischen Intervallen',
                benefits: ['Maximale Fettverbrennung', 'Verbesserte Ausdauer', 'Zeiteffizient', 'Nachbrenneffekt'],
                tips: ['Graduelle Steigerung', 'Auf Körper hören', 'Ausreichend trinken', 'Proper Warm-up'],
                variations: [
                    { name: 'Steigung Intervalle', description: 'Mit Steigung für mehr Intensität' },
                    { name: 'Pyramid Training', description: 'Ansteigende und fallende Intensität' }
                ],
                image_url: null
            },
            {
                name: 'Burpees',
                description: 'Ultimative Ganzkörper-Cardio-Übung',
                instructions: '1. Stehend beginnen\n2. In Squat Position gehen\n3. Hände auf Boden, Beine nach hinten springen\n4. Liegestütz ausführen\n5. Beine zurück, explosiv nach oben springen',
                muscle_group: 'Ganzkörper',
                equipment: 'Körpergewicht',
                difficulty: 'Schwer',
                category_id: getCategoryId('Cardio'),
                primary_muscles: ['Ganzkörper'],
                secondary_muscles: ['Herz-Kreislauf-System'],
                sets_beginner: '3x5',
                sets_intermediate: '3x10',
                sets_advanced: '4x15',
                rest_time: '60-90 Sekunden',
                benefits: ['Ganzkörper Cardio', 'Kraft + Ausdauer', 'Funktionale Bewegung', 'Überall durchführbar'],
                tips: ['Explosiv ausführen', 'Pausen einhalten', 'Saubere Technik', 'Schrittweise steigern'],
                variations: [
                    { name: 'Half Burpees', description: 'Ohne Liegestütz für Anfänger' },
                    { name: 'Burpee Box Jumps', description: 'Mit Box Jump für mehr Intensität' }
                ],
                image_url: null
            },

            // FLEXIBILITÄT
            {
                name: 'Downward Dog',
                description: 'Yoga-Pose für Flexibilität und Entspannung',
                instructions: '1. Vierfüßlerstand beginnen\n2. Zehen aufstellen\n3. Hüfte nach oben schieben\n4. Arme und Beine strecken\n5. Gleichmäßig atmen',
                muscle_group: 'Ganzkörper',
                equipment: 'Yogamatte',
                difficulty: 'Leicht',
                category_id: getCategoryId('Flexibilität'),
                primary_muscles: ['Hamstrings', 'Waden'],
                secondary_muscles: ['Schultern', 'Rücken'],
                sets_beginner: '3x30s',
                sets_intermediate: '3x45s',
                sets_advanced: '3x60s',
                rest_time: '30 Sekunden',
                benefits: ['Flexibilität', 'Entspannung', 'Durchblutung', 'Ganzkörperstretch'],
                tips: ['Nicht überdehnen', 'Tief atmen', 'Fersen Richtung Boden', 'Gerader Rücken'],
                variations: [
                    { name: 'Three-Legged Dog', description: 'Ein Bein nach oben' },
                    { name: 'Puppy Pose', description: 'Vereinfachte Version' }
                ],
                image_url: null
            }
        ];
        
        const exerciseResult = await db.collection('exercises').insertMany(exercises);
        console.log(`✅ ${exerciseResult.insertedCount} exercises inserted`);
        
        // 3. Seed Workouts
        console.log('💪 Seeding workouts...');
        const now = new Date();
        const workouts = [
            {
                name: 'Beginner Full Body',
                description: 'Perfektes Ganzkörper-Workout für Einsteiger. Alle Hauptmuskelgruppen werden trainiert.',
                difficulty: 'Leicht',
                duration: 45,
                target_muscle: 'Ganzkörper',
                created_by: null,
                created_at: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
                exercises: [
                    { exercise_name: 'Liegestütze', sets: 3, reps: '8-10', rest_time: '60s' },
                    { exercise_name: 'Kniebeugen', sets: 3, reps: '10-12', rest_time: '90s' },
                    { exercise_name: 'Planks', sets: 3, reps: '30s', rest_time: '60s' },
                    { exercise_name: 'Ausfallschritte', sets: 3, reps: '8 pro Bein', rest_time: '60s' }
                ]
            },
            {
                name: 'Upper Body Power',
                description: 'Intensives Oberkörpertraining für Kraft und Muskelmasse. Focus auf Brust, Rücken und Schultern.',
                difficulty: 'Mittel',
                duration: 60,
                target_muscle: 'Oberkörper',
                created_by: null,
                created_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
                exercises: [
                    { exercise_name: 'Bankdrücken', sets: 4, reps: '6-8', rest_time: '3min' },
                    { exercise_name: 'Klimmzüge', sets: 4, reps: '6-10', rest_time: '2min' },
                    { exercise_name: 'Schulterdrücken', sets: 3, reps: '8-10', rest_time: '2min' },
                    { exercise_name: 'Rudern mit Langhantel', sets: 4, reps: '8-10', rest_time: '2min' },
                    { exercise_name: 'Dips', sets: 3, reps: '8-12', rest_time: '90s' }
                ]
            },
            {
                name: 'Leg Day Destroyer',
                description: 'Hardcore Beintraining für ernsthafte Athleten. Bereite dich auf intensive Belastung vor!',
                difficulty: 'Schwer',
                duration: 75,
                target_muscle: 'Beine',
                created_by: null,
                created_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
                exercises: [
                    { exercise_name: 'Kniebeugen', sets: 5, reps: '4-6', rest_time: '4min' },
                    { exercise_name: 'Kreuzheben', sets: 4, reps: '3-5', rest_time: '4min' },
                    { exercise_name: 'Ausfallschritte', sets: 4, reps: '12 pro Bein', rest_time: '2min' }
                ]
            },
            {
                name: 'HIIT Cardio Blast',
                description: 'Hochintensives Intervalltraining für maximale Fettverbrennung in kürzester Zeit.',
                difficulty: 'Mittel',
                duration: 30,
                target_muscle: 'Ganzkörper',
                created_by: null,
                created_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
                exercises: [
                    { exercise_name: 'Burpees', sets: 4, reps: '10', rest_time: '30s' },
                    { exercise_name: 'Laufband Intervall', sets: 8, reps: '30s on / 90s off', rest_time: 'im Intervall' }
                ]
            },
            {
                name: 'Morning Core Routine',
                description: 'Schnelle Morgenroutine für einen starken Core. Perfekt um den Tag zu starten!',
                difficulty: 'Leicht',
                duration: 20,
                target_muscle: 'Bauch',
                created_by: null,
                created_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
                exercises: [
                    { exercise_name: 'Planks', sets: 3, reps: '45s', rest_time: '30s' },
                    { exercise_name: 'Crunches', sets: 3, reps: '20', rest_time: '30s' }
                ]
            },
            {
                name: 'Push Pull Split',
                description: 'Klassisches Push/Pull Training für optimale Regeneration und Kraftaufbau.',
                difficulty: 'Mittel',
                duration: 65,
                target_muscle: 'Oberkörper',
                created_by: null,
                created_at: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
                exercises: [
                    { exercise_name: 'Bankdrücken', sets: 4, reps: '8-10', rest_time: '2min' },
                    { exercise_name: 'Schulterdrücken', sets: 3, reps: '10-12', rest_time: '90s' },
                    { exercise_name: 'Trizeps Dips', sets: 3, reps: '12-15', rest_time: '90s' }
                ]
            },
            {
                name: 'Flexibility Flow',
                description: 'Entspannende Flexibilitätsroutine für bessere Beweglichkeit und Regeneration.',
                difficulty: 'Leicht',
                duration: 30,
                target_muscle: 'Ganzkörper',
                created_by: null,
                created_at: new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000),
                exercises: [
                    { exercise_name: 'Downward Dog', sets: 3, reps: '45s', rest_time: '30s' }
                ]
            },
            {
                name: 'Strength Foundation',
                description: 'Grundlagentraining für Kraftaufbau mit den wichtigsten Compound-Übungen.',
                difficulty: 'Mittel',
                duration: 70,
                target_muscle: 'Ganzkörper',
                created_by: null,
                created_at: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
                exercises: [
                    { exercise_name: 'Kniebeugen', sets: 4, reps: '6-8', rest_time: '3min' },
                    { exercise_name: 'Bankdrücken', sets: 4, reps: '6-8', rest_time: '3min' },
                    { exercise_name: 'Kreuzheben', sets: 3, reps: '5', rest_time: '4min' },
                    { exercise_name: 'Klimmzüge', sets: 3, reps: '5-8', rest_time: '2min' }
                ]
            }
        ];
        
        const workoutResult = await db.collection('workouts').insertMany(workouts);
        console.log(`✅ ${workoutResult.insertedCount} workouts inserted`);
        
        // 4. Seed Goals
        console.log('🎯 Seeding goals...');
        const goals = [
            // Weight Loss Goals
            {
                title: '10kg abnehmen bis Sommer',
                description: 'Gesund und nachhaltig 10 Kilogramm Körpergewicht verlieren durch ausgewogene Ernährung und regelmäßiges Training. Ziel ist eine Strandfigur bis zum Sommer.',
                goal_type: 'weight_loss',
                target_value: 10,
                current_value: 3.5,
                unit: 'kg',
                achieved: false,
                target_date: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                title: '5kg Gewichtsverlust Challenge',
                description: 'Schnelle aber gesunde Gewichtsreduktion durch HIIT Training und Kaloriendefizit. Bereits erfolgreich abgeschlossen!',
                goal_type: 'weight_loss',
                target_value: 5,
                current_value: 5,
                unit: 'kg',
                achieved: true,
                target_date: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 45 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
            },
            
            // Strength Goals
            {
                title: '100kg Bankdrücken schaffen',
                description: 'Das erste Mal 100kg beim Bankdrücken schaffen. Aktuell bei 87.5kg, systematischer Kraftaufbau mit 5x5 Programm geplant.',
                goal_type: 'strength',
                target_value: 100,
                current_value: 87.5,
                unit: 'kg',
                achieved: false,
                target_date: new Date(now.getTime() + 120 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                title: '10 Klimmzüge am Stück',
                description: 'Endlich 10 saubere Klimmzüge ohne Pause schaffen. Aktuell schaffe ich 7 Stück. Training 3x pro Woche mit Progression.',
                goal_type: 'strength',
                target_value: 10,
                current_value: 7,
                unit: 'Wiederholungen',
                achieved: false,
                target_date: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
            },
           {
                title: '1x Körpergewicht Kreuzheben',
                description: 'Einmal mein eigenes Körpergewicht beim Kreuzheben schaffen. Bei 75kg Körpergewicht ist das Ziel 75kg zu heben. Aktuell bei 65kg.',
                goal_type: 'strength',
                target_value: 75,
                current_value: 65,
                unit: 'kg',
                achieved: false,
                target_date: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 28 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
            },
            
            // Endurance Goals
            {
                title: '5km unter 25 Minuten laufen',
                description: 'Meine 5km Laufzeit auf unter 25 Minuten verbessern. Aktuell bei 27:30, systematisches Lauftraining mit Intervallen geplant.',
                goal_type: 'endurance',
                target_value: 25,
                current_value: 27.5,
                unit: 'Minuten',
                achieved: false,
                target_date: new Date(now.getTime() + 75 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 20 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                title: 'Ersten Halbmarathon finishen',
                description: '21.1km beim Stadtlauf schaffen! Hauptziel ist das Finishen, Zeit ist erstmal egal. Längste Distanz bisher: 15km.',
                goal_type: 'endurance',
                target_value: 21.1,
                current_value: 15,
                unit: 'km',
                achieved: false,
                target_date: new Date(now.getTime() + 150 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 35 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000)
            },
            {
                title: '10000 Schritte täglich',
                description: 'Jeden Tag mindestens 10000 Schritte gehen für bessere Fitness im Alltag. Challenge bereits erfolgreich 30 Tage durchgehalten!',
                goal_type: 'endurance',
                target_value: 30,
                current_value: 30,
                unit: 'Tage',
                achieved: true,
                target_date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 40 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
            },
            
            // Muscle Gain Goals
            {
                title: '3kg Muskelmasse aufbauen',
                description: 'Saubere 3kg Muskelmasse durch Krafttraining und Protein-reiche Ernährung aufbauen. Messung via DEXA Scan.',
                goal_type: 'muscle_gain',
                target_value: 3,
                current_value: 1.2,
                unit: 'kg',
                achieved: false,
                target_date: new Date(now.getTime() + 120 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 25 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                title: 'Bizepsumfang 40cm erreichen',
                description: 'Bizepsumfang von aktuell 36cm auf 40cm steigern. Fokus auf Bizeps-Curls und Klimmzüge im Training.',
                goal_type: 'muscle_gain',
                target_value: 40,
                current_value: 36,
                unit: 'cm',
                achieved: false,
                target_date: new Date(now.getTime() + 100 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 18 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000)
            },
            
            // Flexibility Goals
            {
                title: 'Spagat lernen',
                description: 'Endlich den Spagat schaffen! Täglich 15 Minuten Stretching und Mobility Work. Aktueller Abstand zum Boden: 15cm.',
                goal_type: 'flexibility',
                target_value: 0,
                current_value: 15,
                unit: 'cm zum Boden',
                achieved: false,
                target_date: new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 42 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
            },
            {
                title: 'Zehen berühren ohne Knie beugen',
                description: 'Flexibilität verbessern und meine Zehen berühren können ohne die Knie zu beugen. Tägliches Yoga geplant.',
                goal_type: 'flexibility',
                target_value: 0,
                current_value: 8,
                unit: 'cm Abstand',
                achieved: false,
                target_date: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
            },
            
            // Health Goals
            {
                title: 'Ruhepuls unter 60',
                description: 'Ruhepuls durch Cardio Training auf unter 60 Schläge pro Minute senken. Aktuell bei 68 bpm.',
                goal_type: 'health',
                target_value: 60,
                current_value: 68,
                unit: 'bpm',
                achieved: false,
                target_date: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                title: '30 Tage ohne Alkohol',
                description: 'Detox Challenge: 30 Tage komplett auf Alkohol verzichten für bessere Regeneration und Schlafqualität.',
                goal_type: 'health',
                target_value: 30,
                current_value: 12,
                unit: 'Tage',
                achieved: false,
                target_date: new Date(now.getTime() + 18 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 12 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                title: '8 Stunden Schlaf pro Nacht',
                description: 'Schlafhygiene verbessern und konstant 8 Stunden pro Nacht schlafen. 7 Tage hintereinander als Ziel.',
                goal_type: 'health',
                target_value: 7,
                current_value: 7,
                unit: 'Tage',
                achieved: true,
                target_date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
            },
            
            // Sport-specific Goals
            {
                title: 'Liegestütze: 50 am Stück',
                description: 'Kraft und Ausdauer für 50 Liegestütze ohne Pause aufbauen. Aktuell schaffe ich 35 saubere Wiederholungen.',
                goal_type: 'strength',
                target_value: 50,
                current_value: 35,
                unit: 'Wiederholungen',
                achieved: false,
                target_date: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                title: '1 Minute Plank halten',
                description: 'Core-Stabilität aufbauen und 1 Minute Plank ohne Pause halten. Aktuell bei 45 Sekunden.',
                goal_type: 'strength',
                target_value: 60,
                current_value: 45,
                unit: 'Sekunden',
                achieved: false,
                target_date: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000),
                created_at: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1000),
                updated_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
            }
        ];

        const insertedGoals = await db.collection('goals').insertMany(goals);
        console.log(`✅ Inserted ${insertedGoals.insertedCount} goals`);

        // 5. Seed Workout Sessions
        console.log('💪 Seeding workout sessions...');
        // If you do not have a users collection, remove user_id or set to null/ObjectId placeholder
        const sessions = [
            {
                user_id: null,
                workout_id: null, // You may want to reference a workout ObjectId here if available
                start_time: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000), // 2 days ago, 10 AM
                end_time: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000), // 1 hour later
                duration: 60,
                notes: 'Gutes Training! Bankdrücken lief super, neuer PR bei 87.5kg. Schultern waren etwas tight.',
                completed: true,
                date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
            },
            {
                user_id: null,
                workout_id: null, // You may want to reference a workout ObjectId here if available
                start_time: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000), // Yesterday, 6 PM
                end_time: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000 + 19 * 60 * 60 * 1000 + 15 * 60 * 1000), // 1h 15min later
                duration: 75,
                notes: 'Klimmzüge verbessert! 7 saubere Wiederholungen geschafft. Lat-Pulldowns mit mehr Gewicht.',
                completed: true,
                date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
            },
            {
                user_id: null,
                workout_id: null, // You may want to reference a workout ObjectId here if available
                start_time: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000), // Tomorrow, 10 AM
                end_time: null,
                duration: null,
                notes: '',
                completed: false,
                date: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000)
            }
        ];

                const insertedSessions = await db.collection('workout_sessions').insertMany(sessions);
                console.log(`✅ Inserted ${insertedSessions.insertedCount} workout sessions`);
            } catch (error) {
                console.error('❌ Error during database seeding:', error);
            } finally {
                await client.close();
                console.log('🔌 MongoDB connection closed');
            }
        }
        
        seedDatabase();