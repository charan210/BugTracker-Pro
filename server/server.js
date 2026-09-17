// ============================================================
// 1. IMPORTS
// ============================================================

// Import our MySQL database connection
const db = require("./db");

// Import Express framework
const express = require("express");

// Import CORS middleware
const cors = require("cors");


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

app.get("/api/bugs", (req, res) => {

    // SQL query to retrieve all bugs.
    //
    // ORDER BY created_at DESC means:
    // newest bugs will appear first.

    const sql = `
        SELECT *
        FROM bugs
        ORDER BY created_at DESC
    `;


    // Execute SQL query

    db.query(sql, (error, results) => {

        // Handle database error

        if (error) {

            console.error("Error fetching bugs:", error);

            return res.status(500).json({

                success: false,

                message: "Failed to fetch bugs."

            });

        }


        // Send successful response

        res.status(200).json({

            success: true,

            bugs: results

        });

    });

});


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

app.post("/api/bugs", (req, res) => {

    // Extract required values from request body

    const {
        title,
        description,
        priority
    } = req.body;


    // SQL INSERT query
    //
    // ? placeholders are used for parameterized queries.
    //
    // This is safer than directly inserting user input
    // into the SQL string.

    const sql = `
        INSERT INTO bugs
        (title, description, priority)
        VALUES (?, ?, ?)
    `;


    // Execute INSERT query

    db.query(
        sql,

        // Values replace the ? placeholders
        [
            title,
            description,
            priority
        ],

        (error, result) => {

            // Handle database error

            if (error) {

                console.error(
                    "Error inserting bug:",
                    error
                );

                return res.status(500).json({

                    success: false,

                    message: "Failed to create bug."

                });

            }


            // Bug successfully created

            res.status(201).json({

                success: true,

                message: "Bug created successfully!",

                // MySQL automatically generates
                // the new bug ID because our database
                // column uses AUTO_INCREMENT.

                bugId: result.insertId

            });

        }
    );

});


// ============================================================
// 7. UPDATE BUG STATUS
// ============================================================

// PUT /api/bugs/:id
//
// Example:
//
// PUT /api/bugs/5
//
// Here:
//
// req.params.id → 5
//
// Request body:
//
// {
//   "status": "Resolved"
// }
//
// req.body.status → "Resolved"
//

app.put("/api/bugs/:id", (req, res) => {

    // Get bug ID from URL parameter

    const bugId = req.params.id;


    // Get new status from request body

    const {
        status
    } = req.body;


    // SQL UPDATE query

    const sql = `
        UPDATE bugs
        SET status = ?
        WHERE id = ?
    `;


    // Execute UPDATE query

    db.query(
        sql,

        // Replace ? placeholders

        [
            status,
            bugId
        ],

        (error, result) => {

            // Handle database error

            if (error) {

                console.error(
                    "Error updating bug:",
                    error
                );

                return res.status(500).json({

                    success: false,

                    message: "Failed to update bug."

                });

            }


            // If no rows were updated,
            // the requested bug doesn't exist.

            if (result.affectedRows === 0) {

                return res.status(404).json({

                    success: false,

                    message: "Bug not found."

                });

            }


            // Successful update

            res.status(200).json({

                success: true,

                message: "Bug status updated successfully!"

            });

        }
    );

});


// ============================================================
// 8. DELETE BUG
// ============================================================

// DELETE /api/bugs/:id
//
// Example:
//
// DELETE /api/bugs/5
//
// req.params.id → 5
//
// Purpose:
// Permanently delete a specific bug from MySQL.
//

app.delete("/api/bugs/:id", (req, res) => {

    // Get bug ID from URL parameter

    const bugId = req.params.id;


    // SQL DELETE query
    //
    // WHERE id = ? is VERY important.
    //
    // Without WHERE, we could accidentally delete
    // every bug in the table.

    const sql = `
        DELETE FROM bugs
        WHERE id = ?
    `;


    // Execute DELETE query

    db.query(
        sql,

        // Replace ? with bug ID

        [bugId],

        (error, result) => {

            // Handle database error

            if (error) {

                console.error(
                    "Error deleting bug:",
                    error
                );

                return res.status(500).json({

                    success: false,

                    message: "Failed to delete bug."

                });

            }


            // Bug doesn't exist

            if (result.affectedRows === 0) {

                return res.status(404).json({

                    success: false,

                    message: "Bug not found."

                });

            }


            // Bug successfully deleted

            res.status(200).json({

                success: true,

                message: "Bug deleted successfully!"

            });

        }
    );

});


// ============================================================
// 9. START SERVER
// ============================================================

// Start Express server on port 5000

app.listen(port, () => {

    console.log(
        `server is running on port ${port}`
    );

});