# 📋 Daily Work Tracker

> Log your tasks and issues by project — every day.  
> A lightweight personal work log with a live cloud database, built for daily standups and progress tracking.

---

## ✨ Features

- **Log daily work** — capture Date, Project, Tasks/Issues solved, and Notes
- **Live cloud database** — data stored in TiDB Cloud, persists forever, accessible from anywhere
- **Project filter** — filter your history by project name
- **Date range filter** — narrow down entries between any two dates
- **Quick stats** — see Total Entries, number of Projects, and how many you've logged today
- **Auto-suggest** — project names you've used before appear as suggestions while typing
- **Sortable table** — sort history by Date or Project
- **Delete entries** — remove any entry with one click
- **Shareable** — deployed on Vercel so your manager can view your logs anytime

---

## 🖥️ App Preview

### Stats Bar
```
┌─────────────────┬─────────────────┬─────────────────┐
│   12            │   4             │   1             │
│   Total Entries │   Projects      │   Logged Today  │
└─────────────────┴─────────────────┴─────────────────┘
```

### Log Form
```
┌─────────────────────────────────────────────────────────────────┐
│  ➕ Log Today's Work                                             │
│                                                                   │
│  DATE                        PROJECT NAME                         │
│  [ 27-05-2026          ]     [ iempower 2.0              ]       │
│                                                                   │
│  TASKS / ISSUES SOLVED                                            │
│  [ Describe the tasks or issues you worked on today...       ]   │
│                                                                   │
│  NOTES (OPTIONAL)                                                 │
│  [ Any blockers, comments, or follow-ups...                  ]   │
│                                                                   │
│  [ Save Entry ]  [ Clear ]                                        │
└─────────────────────────────────────────────────────────────────┘
```

### Work Log History
```
┌──────────────────────────────────────────────────────────────────┐
│  📁 Work Log History                                              │
│                                                                    │
│  Filter by Project  [All Projects ▼]  From [──────]  To [──────] │
│                                                                    │
│  DATE ↓        PROJECT          TASKS / ISSUES       NOTES        │
│  ──────────────────────────────────────────────────────────────── │
│  May 27, 2026  [iempower 2.0]   Fixed login bug      —       ✕   │
│  May 26, 2026  [iempower 2.0]   Approver read only   —       ✕   │
│  May 25, 2026  [RecallHub]      API integration      Pending  ✕   │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | HTML, CSS, Vanilla JavaScript     |
| Backend   | Node.js + Express                 |
| Database  | TiDB Cloud (MySQL-compatible)     |
| Hosting   | Vercel (free tier)                |

---

## 🚀 Local Setup

### 1. Clone the repo
```bash
git clone https://github.com/NusrathS/DailyWorkTracker.git
cd DailyWorkTracker
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create your `.env` file
```env
TIDB_HOST=your-tidb-host
TIDB_PORT=4000
TIDB_USER=your-username
TIDB_PASSWORD=your-password
TIDB_DATABASE=worktracker
PORT=3000
```

### 4. Set up the database (run once)
```bash
node setup.js
```

### 5. Start the server
```bash
node server.js
```

Open **http://localhost:3000** in your browser.

---

## ☁️ Deploy to Vercel

1. Push the repo to GitHub
2. Import the project at [vercel.com](https://vercel.com)
3. Add the 5 environment variables from your `.env` in Vercel's project settings
4. Deploy — you'll get a live URL to share

> ⚠️ Never commit your `.env` file — it's already in `.gitignore`

---

## 📁 Project Structure

```
DailyWorkTracker/
├── public/
│   └── index.html      # Frontend UI
├── server.js           # Express server + API routes
├── setup.js            # One-time DB setup script
├── package.json
├── vercel.json         # Vercel deployment config
├── .env                # Your credentials (not committed)
└── .gitignore
```

---

## 🔌 API Endpoints

| Method   | Endpoint           | Description          |
|----------|--------------------|----------------------|
| `GET`    | `/api/entries`     | Fetch all log entries |
| `POST`   | `/api/entries`     | Create a new entry   |
| `DELETE` | `/api/entries/:id` | Delete an entry by ID |

---

*Built for personal daily work logging — log once, access anywhere.*
