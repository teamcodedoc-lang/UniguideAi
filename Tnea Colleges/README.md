# UniGuide Ai - TNEA College Predictor & Academic Guide

UniGuide Ai is a comprehensive web application designed to empower students in Tamil Nadu to make informed decisions about their engineering education. It leverages historical TNEA (Tamil Nadu Engineering Admissions) cutoff trends and data analysis to predict college eligibility and provide detailed insights into various institutions.

![UniGuide Ai Banner](client/src/assets/logo_icon.png)

## 🚀 Key Features

*   **College Predictor Tool:** Accurately predicts eligible colleges based on your calculated engineering cutoff (out of 200), community category, preferred branch, and district.
*   **Tier-Based Classification:** Explore colleges categorized into Tiers (1 to 5) based on performance, placements, and infrastructure, helping students target the best institutions.
*   **Detailed College Profiles:** View in-depth details for each college, including courses offered, location, and past cutoff history.
*   **Interactive UI:** A modern, responsive, and visually appealing user interface built with React and Tailwind CSS, featuring smooth animations and a premium design.
*   **Secure Authentication:** Google Sign-In integration via Firebase for personalized user experiences.
*   **Search & Filtering:** Robust search functionality to find specific colleges or filter by district and branch.

## 🛠️ Technology Stack

### Frontend
*   **Framework:** [React](https://reactjs.org/) (v19)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Authentication:** [Firebase](https://firebase.google.com/) (Google Auth)
*   **Routing:** React Router v7

### Backend
*   **Runtime:** [Node.js](https://nodejs.org/)
*   **Framework:** [Express.js](https://expressjs.com/)
*   **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
*   **Data Processing:** `xlsx` library for processing college data spreadsheets.

## 📂 Project Structure

```
UniGuide-Ai/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI Components (Navbar, PredictorForm, etc.)
│   │   ├── context/        # React Context (AuthContext)
│   │   ├── pages/          # Application Pages (Home, Login, Results, etc.)
│   │   ├── assets/         # Images and Static Assets
│   │   └── firebase.js     # Firebase Configuration
│   └── ...
├── server/                 # Backend Node.js/Express Application
│   ├── models/             # Mongoose Database Schemas
│   ├── routes/             # API Routes
│   ├── scripts/            # Data Import Scripts
│   ├── server.js           # Server Entry Point
│   └── ...
└── README.md               # Project Documentation
```

## ⚙️ Installation & Setup

### Prerequisites
*   [Node.js](https://nodejs.org/) (v14 or higher)
*   [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas) installed and running.

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "UniGuide Ai/Tnea Colleges"
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```
*   **Import Data:** If this is your first time running the app, you may need to import the college data from the Excel files into your MongoDB database. Run the import script (if available in `package.json` scripts) or start the server which might handle initialization.

### 3. Frontend Setup
Navigate to the client directory and install dependencies:
```bash
cd ../client
npm install
```

### 4. Configuration
*   **Environment Variables:**
    *   **Frontend:** Ensure your `firebase.js` in `client/src/` has the correct Firebase project configuration.
    *   **Backend:** Ensure your `server.js` or `.env` file points to the correct MongoDB URI (default is usually `mongodb://localhost:27017/tnea_colleges`).

## 🚀 Running the Application

### Option 1: Manual Start (Two Terminals)

**Terminal 1 (Backend):**
```bash
cd server
npm start
# or for development with auto-restart:
npm run dev
```
The server typically runs on `http://localhost:5000`.

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```
The client typically runs on `http://localhost:5173`.

### Option 2: Automatic Start
Use the provided batch script in the root directory:
```bash
./start_app.cmd
```

## 📊 Data Sources

The application uses a comprehensive dataset of Tamil Nadu engineering colleges sourced from official TNEA reports, classified into tiers:
*   **Tier 1:** Top-performing institutions (IITs, CEG, MIT, SSN, etc.)
*   **Tier 2:** High-quality established colleges
*   **Tiers 3-5:** Other engineering institutions across the state.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---
© 2025 UniGuide Ai. All Rights Reserved.
