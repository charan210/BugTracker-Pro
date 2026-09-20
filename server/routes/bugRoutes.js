// =========================================================
// BUG ROUTES
// =========================================================
//
// Routes decide which controller function should run.
//
// The actual database/business logic is handled by
// bugController.js.
//
// =========================================================

const express = require("express");

const {
  getBugs,
  createBug,
  updateBugStatus,
  deleteBug
} = require("../controllers/bugController");

const router = express.Router();


// =========================================================
// GET ALL BUGS
// =========================================================

router.get("/", getBugs);


// =========================================================
// CREATE A NEW BUG
// =========================================================

router.post("/", createBug);

// =========================================================
// UPDATE BUG STATUS
// =========================================================

router.put("/:id", updateBugStatus);

// =========================================================
// DELETE A BUG
// =========================================================

router.delete("/:id", deleteBug);


// =========================================================
// TEMPORARILY DISABLED
// UPDATE and DELETE will be moved into the controller
// next.
// =========================================================


module.exports = router;