# PersonaSync - Product Requirements Document (PRD)

## 🧀 Product Name: PersonaSync

## 🌟 Vision

Create an engaging, voice-powered survey experience that generates personality-based avatars, rewards users with XP, and builds community through avatar identity. The platform reimagines boring forms by making them conversational, gamified, and rewarding — turning raw data into real human insight.

---

## 🔑 Must-Have Features

### 1. Avatar Generation

* Users receive a custom avatar based on their answers to personality-style questions.
* Avatars are made of traits (e.g., "Curious Owl", "Creative Fox") and visuals (emoji, SVG, or styled cards).
* Trait mapping logic runs when the survey is completed.

### 2. Voice Agents

* Voice agents reflect users' personality traits.
* Each agent has a unique ElevenLabs voice and message tone.
* Example: "The Mentor" speaks calmly, "The Hustler" speaks fast and energetic.

### 3. Voice Generation via ElevenLabs

* Avatar provides a spoken summary post-survey.
* ElevenLabs API generates speech based on the dynamic personality description.
* Audio is played using a native `<audio>` player.

### 4. List of Surveys / Missions

* Users can choose from a list of themed surveys or "missions."
* Surveys are tagged by trait type or avatar group (e.g., "Explorer Boost Quiz").
* Filterable UI for better UX.

### 5. XP Points System

* XP is earned by:

  * Completing surveys
  * Listening to voice summaries
  * Daily check-ins or streaks
* XP unlocks:

  * Visual accessories (hats, badges, colors)
  * Personality titles (e.g., "The Daydreamer")

### 6. Reward Store

* Users spend XP to unlock:

  * New voice tones
  * Avatar customizations
  * Motivational quotes
  * Personality remix feature

### 7. Communities by Avatar Type

* Users grouped into communities based on avatar class (e.g., "Explorers", "Strategists").
* Users can see others with shared traits.
* Future scope: enable mini challenges or leaderboard comparisons.

---

## 🛠️ Architecture & Tech Stack

| Layer       | Tool                           |
| ----------- | ------------------------------ |
| Frontend    | Next.js, Tailwind CSS          |
| Voice       | ElevenLabs API                 |
| Database    | Firebase Firestore / Supabase  |
| State Logic | React `useState`, `useReducer` |
| Audio       | HTML `<audio>` element         |
| Deployment  | Vercel                         |

---

## 🤎 MVP Flow

1. User visits the landing page.
2. Starts gamified personality quiz.
3. Avatar traits are calculated.
4. Voice summary generated via ElevenLabs.
5. XP is awarded based on completion.
6. Reward store & community preview activated.

---

## 📊 Success Criteria (Hackathon Submission)

* [x] Fully functional quiz → avatar → voice feedback flow
* [x] At least 2 avatars/agents with voice styles
* [x] XP system and sample reward unlocks
* [x] (Optional) Preview community experience (static or sample data)

---

Let’s build PersonaSync — a voice-powered gamified experience for Gen Z that turns surveys into digital self-expression!
