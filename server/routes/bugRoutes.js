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
  createBug
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
// TEMPORARILY DISABLED
// UPDATE and DELETE will be moved into the controller
// next.
// =========================================================


module.exports = router;