// ============================================================
// 1. IMPORTS
// ============================================================



// Import Express framework
const express = require("express");

// Import CORS middleware
const cors = require("cors");

const bugRoutes = require("./routes/bugRoutes");

const authRoutes = require("./routes/authRoutes");


// ============================================================
// 2. CREATE EXPRESS APPLICATION
// ============================================================

const app = express();

// Port on which our backend server will run
const port = 5000;


// ============================================================
// 3. MIDDLEWARE
// ============================================================

// Allows our React frontend to communicate with
// our Express backend even though they run on different ports.
app.use(cors());


// Converts incoming JSON request data into a JavaScript object.
//
// Example request body:
//
// {
//   "title": "Login Error",
//   "description": "Login button is not working",
//   "priority": "High"
// }
//
// We can then access it using:
//
// req.body
//
app.use(express.json());

app.use("/api/bugs", bugRoutes);

app.use("/api/auth", authRoutes);


// ============================================================
// 4. HEALTH CHECK API
// ============================================================

// GET /api/health
//
// Used to check whether our backend server is running.
//
// Example:
// http://localhost:5000/api/health

app.get("/api/health", (req, res) => {

    res.status(200).json({

        success: true,

        message: "BugTracker Pro Backend is Running 🚀",

        version: "1.0.0"

    });

});


// ============================================================
// 5. GET ALL BUGS
// ============================================================

// GET /api/bugs
//
// Purpose:
// Retrieve all bugs from MySQL.
//
// Flow:
//
// React
//   ↓
// Axios GET
//   ↓
// Express
//   ↓
// MySQL SELECT
//   ↓
// JSON response
//



// ============================================================
// 6. CREATE A NEW BUG
// ============================================================

// POST /api/bugs
//
// Purpose:
// Create a new bug in the database.
//
// React sends:
//
// {
//   title,
//   description,
//   priority
// }
//
// Express receives it through:
//
// req.body
//







// ============================================================
// 9. START SERVER
// ============================================================

// Start Express server on port 5000

app.listen(port, () => {

    console.log(
        `server is running on port ${port}`
    );

});