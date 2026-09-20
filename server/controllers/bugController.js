// =========================================================
// BUG CONTROLLER
// =========================================================
//
// This file contains the business logic for bug operations.
//
// Routes decide:
// "Which function should run?"
//
// Controllers decide:
// "What should that function actually do?"
//
// =========================================================

const db = require("../db");


// =========================================================
// GET ALL BUGS
// =========================================================

const getBugs = (req, res) => {

  const sql = "SELECT * FROM bugs ORDER BY created_at DESC";

  db.query(sql, (error, results) => {

    if (error) {

      console.error("Error fetching bugs:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to fetch bugs."
      });
    }

    res.status(200).json({
      success: true,
      bugs: results
    });

  });

};


// =========================================================
// CREATE A NEW BUG
// =========================================================

const createBug = (req, res) => {

  const {
    title,
    description,
    priority
  } = req.body;

  const sql = `
    INSERT INTO bugs (title, description, priority)
    VALUES (?, ?, ?)
  `;

  db.query(
    sql,
    [title, description, priority],
    (error, result) => {

      if (error) {

        console.error("Error inserting bug:", error);

        return res.status(500).json({
          success: false,
          message: "Failed to create bug."
        });
      }

      res.status(201).json({
        success: true,
        message: "Bug created successfully!",
        bugId: result.insertId
      });

    }
  );

};

// =========================================================
// UPDATE BUG STATUS
// =========================================================

const updateBugStatus = (req, res) => {

  const bugId = req.params.id;
  const { status } = req.body;

  const sql = `
    UPDATE bugs
    SET status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [status, bugId],
    (error, result) => {

      if (error) {

        console.error("Error updating bug:", error);

        return res.status(500).json({
          success: false,
          message: "Failed to update bug."
        });
      }

      if (result.affectedRows === 0) {

        return res.status(404).json({
          success: false,
          message: "Bug not found."
        });
      }

      res.status(200).json({
        success: true,
        message: "Bug status updated successfully!"
      });

    }
  );

};


// =========================================================
// EXPORT CONTROLLER FUNCTIONS
// =========================================================

module.exports = {
  getBugs,
  createBug,
  updateBugStatus
};