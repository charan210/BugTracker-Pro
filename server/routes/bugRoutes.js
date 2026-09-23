const express = require("express");

const {
  getBugs,
  createBug,
  updateBugStatus,
  deleteBug
} = require("../controllers/bugController");

const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

const { requireAdmin } = require("../middleware/roleMiddleware");


// =========================================================
// PROTECTED BUG ROUTES
// =========================================================

router.get("/", authenticateToken, getBugs);

router.post("/", authenticateToken, createBug);

router.put("/:id", authenticateToken, updateBugStatus);

router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  deleteBug
);


module.exports = router;