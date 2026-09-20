// =========================================================
// BUG API
// =========================================================
//
// This file contains functions that communicate
// with the BugTracker Pro backend.
//
// React components should call these functions
// instead of directly writing axios requests.
//
// =========================================================

import axios from "axios";


// Backend API base URL
const API_URL = "http://localhost:5000/api";


// =========================================================
// GET ALL BUGS
// =========================================================

export const getBugs = async () => {

  const response = await axios.get(
    `${API_URL}/bugs`
  );

  return response.data;
};

// =========================================================
// CREATE A NEW BUG
// =========================================================

export const createBug = async (
  title,
  description,
  priority
) => {

  const response = await axios.post(
    `${API_URL}/bugs`,
    {
      title,
      description,
      priority
    }
  );

  return response.data;
};

// =========================================================
// UPDATE BUG STATUS
// =========================================================

export const updateBugStatus = async (
  bugId,
  newStatus
) => {

  const response = await axios.put(
    `${API_URL}/bugs/${bugId}`,
    {
      status: newStatus
    }
  );

  return response.data;
};

// =========================================================
// DELETE A BUG
// =========================================================

export const deleteBug = async (bugId) => {

  const response = await axios.delete(
    `${API_URL}/bugs/${bugId}`
  );

  return response.data;
};