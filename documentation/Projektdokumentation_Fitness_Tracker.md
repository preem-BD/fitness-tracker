# Prototyping Projektdokumentation

**Name:** [Vorname Nachname]  
**E-Mail:** [kürzel]@students.zhaw.ch  
**URL der deployten Anwendung:** https://fitness-tracker-zhaw.netlify.app/

---

## 1. Einleitung

Der **Fitness Tracker** ist eine moderne Web-Anwendung zur umfassenden Verwaltung von Fitness-Aktivitäten. Die Anwendung ermöglicht es Benutzern, personalisierte Trainingspläne zu erstellen, eine umfangreiche Exercise-Datenbank zu durchsuchen, messbare Fitness-Ziele zu setzen und deren Fortschritt zu verfolgen. 

Die Hauptfunktionen umfassen:
- **Workout Management**: Erstellung und Verwaltung von Trainingsplänen mit Exercise-Integration
- **Exercise Database**: Über 50 kategorisierte Übungen mit Filteroptionen nach Muskelgruppen und Schwierigkeit
- **Goal Tracking**: Setzen und Verfolgen messbarer Fitness-Ziele mit visuellen Fortschrittsbalken
- **Statistics Dashboard**: Umfassende Analytics mit MongoDB Aggregation Pipelines für komplexe Datenauswertung

Die Anwendung wurde mit **Svelte 5 (Runes Mode)** und **SvelteKit** entwickelt und nutzt **MongoDB Atlas** als Datenbank. Das responsive Design gewährleistet optimale Nutzererfahrung auf allen Geräten, während ein vollständiges Dark/Light Theme System für personalisierte Darstellung sorgt.

---

## 2. Datenmodell

### ER-Diagramm

**[BILD EINFÜGEN: fitness_tracker_final.drawio-1.png]**

### Datenbankstruktur (MongoDB Collections)

Die Anwendung verwendet folgende MongoDB Collections:

- **workouts**: Trainingspläne mit Verknüpfung zu Exercises
  - `_id`, `name`, `description`, `difficulty`, `exercises[]`, `created_at`
- **exercises**: Exercise-Datenbank mit Kategorisierung
  - `_id`, `name`, `description`, `muscle_groups[]`, `difficulty`, `category`, `instructions`
- **goals**: Fitness-Ziele mit Progress-Tracking
  - `_id`, `title`, `description`, `target_value`, `current_value`, `unit`, `deadline`, `achieved`
- **exercise_categories**: Kategorisierung der Exercises
  - `_id`, `name`, `description`
- **users**: Benutzer-Verwaltung (vorbereitet für Multi-User)
- **workout_sessions**: Session-Tracking (vorbereitet für Live-Sessions)

---

## 3. Beschreibung der Anwendung

### 3.1. Landing Page / Homepage
**Route:** `/`

Die Startseite bietet einen einladenden Überblick über die Anwendung mit Hero-Section, Feature-Highlights und direkten Navigationsmöglichkeiten zu den Hauptbereichen.

**[BILD EINFÜGEN: landing_page.PNG]**

**Dateien:**
- `routes/+page.svelte`
- `routes/+layout.svelte`

### 3.2. Workout Management
**Route:** `/workouts`

Zentrale Übersicht aller Trainingspläne mit CRUD-Funktionalität. Benutzer können neue Workouts erstellen, bestehende bearbeiten und löschen. Jedes Workout zeigt Schwierigkeitsgrad, zugeordnete Exercises und Erstellungsdatum an.

**[BILD EINFÜGEN: workouts.PNG]**

**Funktionen:**
- Anzeige aller Workouts in Card-Layout
- Erstellen neuer Workouts über "Create New Workout" Button
- Bearbeiten und Löschen bestehender Workouts
- Navigation zu Workout-Details mit Exercise-Integration

**Dateien:**
- `routes/workouts/+page.svelte`
- `routes/workouts/+page.server.js`
- `routes/workouts/create/+page.svelte`
- `routes/workouts/[id]/+page.svelte`

### 3.3. Exercise Database
**Route:** `/exercises`

Umfassende Datenbank mit über 50 kategorisierten Exercises. Erweiterte Filteroptionen ermöglichen gezielte Suche nach Muskelgruppen, Schwierigkeit und Kategorien.

**[BILD EINFÜGEN: exercises.PNG]**

**Funktionen:**
- Filterung nach Muskelgruppen (Chest, Back, Legs, Arms, etc.)
- Schwierigkeitsfilter (Beginner, Intermediate, Advanced)
- Kategoriefilter (Strength, Cardio, Flexibility, etc.)
- Detailansicht mit Anweisungen und Beschreibungen
- CRUD-Funktionalität für neue Exercises

**Dateien:**
- `routes/exercises/+page.svelte`
- `routes/exercises/+page.server.js`
- `routes/exercises/create/+page.svelte`
- `routes/exercises/[id]/+page.svelte`

### 3.4. Goal Tracking Dashboard
**Route:** `/goals`

Persönliches Dashboard für Fitness-Ziele mit visuellen Fortschrittsbalken und Achievement-Status. Unterstützt verschiedene Goal-Typen wie Gewichtsverlust, Kraftaufbau, Ausdauer und mehr.

**[BILD EINFÜGEN: goals.PNG]**

**Funktionen:**
- Erstellung messbarer Ziele mit Zielwerten und Deadlines
- Visuelle Progress-Bars mit Prozentanzeige
- Achievement-Status bei Zielerreichung
- Verschiedene Einheiten (kg, lbs, minutes, etc.)
- Progress-Updates mit automatischer Berechnung

**Dateien:**
- `routes/goals/+page.svelte`
- `routes/goals/+page.server.js`
- `routes/goals/create/+page.svelte`
- `routes/goals/[id]/+page.svelte`

### 3.5. Statistics Dashboard
**Route:** `/stats`

Umfassende Analytics-Seite mit MongoDB Aggregation Pipelines für komplexe Statistiken und Datenauswertung.

**[BILD EINFÜGEN: statistics.PNG]**

**Funktionen:**
- Gesamtstatistiken aller Entitäten (Workouts, Exercises, Goals)
- Erfolgsquoten und Achievement-Raten
- Verteilungsanalysen nach Kategorien und Schwierigkeit
- Real-time Berechnungen mit MongoDB Aggregations
- Interactive Charts und Visualisierungen

**Dateien:**
- `routes/stats/+page.svelte`
- `routes/stats/+page.server.js`

### 3.6. Mobile Responsive Design

Die Anwendung ist vollständig responsive und bietet optimierte Benutzererfahrung auf allen Geräten.

**[BILD EINFÜGEN: mobile.PNG]**

**Features:**
- Mobile-First Design Approach
- Hamburger-Navigation für kleinere Bildschirme
- Touch-optimierte Bedienelemente
- Responsive Grid-Layouts
- Optimierte Performance auf mobilen Geräten

### 3.7. Navigation und Theme System

**Komponenten:**
- `lib/components/Navigation.svelte`: Hauptnavigation mit Multi-Level Dropdown
- `lib/components/ThemeToggle.svelte`: Dark/Light Mode Toggle

**Features:**
- Vollständiges Dark/Light Theme System
- Automatische System-Präferenz Erkennung
- localStorage Persistence
- Smooth Transitions zwischen Themes

---

## 4. Erweiterungen

### 4.1. Dark Mode System
Vollständiges Dark/Light Theme System mit localStorage Persistence und automatischer System-Präferenz Erkennung. Das Theme wird reaktiv über alle Komponenten hinweg angewendet.

**Implementation:**
- Svelte 5 Runes-basierte Theme State Management
- CSS Custom Properties Architecture für alle UI Komponenten
- Responsive Theme Toggle mit Accessibility Features
- Smooth Transitions zwischen Light und Dark Mode

**Dateien:**
- `lib/stores/theme-simple.js`
- `lib/components/ThemeToggle.svelte`
- `lib/styles/global.css`

### 4.2. Advanced Analytics mit MongoDB Aggregations
Komplexe Statistiken und Datenauswertung durch MongoDB Aggregation Pipelines für Real-time Analytics und Erfolgsquoten-Berechnung.

**Features:**
- Aggregierte Statistiken über alle Collections
- Performance Metrics und Erfolgsquoten
- Verteilungsanalysen nach verschiedenen Kriterien
- Interactive Charts und Visualisierungen

**Dateien:**
- `routes/stats/+page.server.js`
- MongoDB Aggregation Pipelines in Server Functions

### 4.3. Svelte 5 Runes Implementation
Moderne Implementierung mit Svelte 5 Runes für optimierte Performance und Developer Experience.

**Patterns:**
- `$state()` für reaktive Variablen
- `$derived()` für berechnete Properties
- `$effect()` für Side Effects und DOM Updates
- Moderne Event Handling ohne Legacy Store API

**Konvertierte Komponenten:**
- `lib/components/Navigation.svelte`
- `lib/components/ThemeToggle.svelte`
- `routes/terms/+page.svelte`

**Dateien:**
- Alle modernisierten Komponenten verwenden Svelte 5 Runes
- `lib/stores/theme-simple.js` für Svelte 5 kompatible State Management

### 4.4. Professional Navigation System
Multi-Level Dropdown-Navigation mit mobil-optimierten Hamburger-Menüs und Breadcrumb-Navigation auf Detail-Seiten.

**Features:**
- Responsive Design Patterns
- Touch-optimierte Mobile Navigation
- Accessibility Features (ARIA Labels, Keyboard Navigation)
- Smooth Animations und Transitions

**Dateien:**
- `lib/components/Navigation.svelte`
- CSS Grid/Flexbox Layout in `lib/styles/global.css`

### 4.5. Advanced Error Handling
Comprehensive Server-Side und Client-Side Error Management mit graceful Fallbacks und user-friendly Error Messages.

**Implementation:**
- Try/Catch Blöcke in allen Server Functions
- Client-Side Validation mit Real-time Feedback
- Graceful Fallbacks bei Datenbank-Fehlern
- User-friendly Error Messages und Recovery-Optionen

**Dateien:**
- Alle `+page.server.js` Dateien
- Form Validation in Svelte Components

### 4.6. Enhanced CRUD Operations
Vollständige CRUD-Funktionalität für alle Entitäten mit optimierten User Workflows und Datenvalidierung.

**Features:**
- Form Validation mit Real-time Feedback
- Optimistische Updates für bessere UX
- Batch Operations für mehrere Entities
- Data Relationships zwischen Collections

**Dateien:**
- Create/Edit Forms in allen Entity-Bereichen
- Server-side Validation in `+page.server.js` Dateien

### 4.7. Performance Optimizations
Verschiedene Performance-Optimierungen für bessere User Experience und reduzierte Ladezeiten.

**Optimierungen:**
- Database Indexing für bessere Query-Performance
- Lazy Loading von Komponenten
- Optimierte Bundle Size durch Tree Shaking
- Efficient State Management mit Svelte 5 Runes

**Dateien:**
- MongoDB Index-Konfiguration in Database Models
- Optimierte Component-Architecture in `lib/components/`

---

## 5. Deployment und Technische Details

**Tech Stack:**
- **Frontend:** Svelte 5 (Runes Mode), SvelteKit
- **Backend:** Node.js, SvelteKit Server Functions
- **Database:** MongoDB Atlas
- **Styling:** CSS3, Bootstrap Components, Custom CSS Grid/Flexbox
- **Deployment:** Netlify (Continuous Deployment)

**Deployment URL:** https://fitness-tracker-zhaw.netlify.app/

**Repository:** GitHub mit automatischem Netlify Deployment bei Push auf main Branch.

---

*Erstellt mit ❤️ und Svelte 5 für das ZHAW Prototyping Modul*
