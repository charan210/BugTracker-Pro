// =========================================================
// AUTH CONTROLLER
// =========================================================
//
// Handles user registration and authentication logic.
//
// =========================================================
const jwt = require("jsonwebtoken");
const db = require("../db");
const bcrypt = require("bcryptjs");


// =========================================================
// REGISTER USER
// =========================================================

const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;


    // -----------------------------------------------------
    // 1. Validate input
    // -----------------------------------------------------

    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "Name, email and password are required."
      });

    }


    // -----------------------------------------------------
    // 2. Check whether email already exists
    // -----------------------------------------------------

    const checkSql = `
      SELECT id
      FROM users
      WHERE email = ?
    `;

    db.query(
      checkSql,
      [email],
      async (error, results) => {

        if (error) {

          console.error("Error checking user:", error);

          return res.status(500).json({
            success: false,
            message: "Database error."
          });

        }


        if (results.length > 0) {

          return res.status(409).json({
            success: false,
            message: "Email already registered."
          });

        }


        // -------------------------------------------------
        // 3. Hash password
        // -------------------------------------------------

        const hashedPassword = await bcrypt.hash(
          password,
          10
        );


        // -------------------------------------------------
        // 4. Insert user
        // -------------------------------------------------

        const insertSql = `
          INSERT INTO users
          (name, email, password)
          VALUES (?, ?, ?)
        `;

        db.query(
          insertSql,
          [name, email, hashedPassword],
          (error, result) => {

            if (error) {

              console.error(
                "Error creating user:",
                error
              );

              return res.status(500).json({
                success: false,
                message: "Failed to create user."
              });

            }


            // ---------------------------------------------
            // 5. Send response
            // ---------------------------------------------

            res.status(201).json({
              success: true,
              message: "User registered successfully!",
              userId: result.insertId
            });

          }
        );

      }
    );

  } catch (error) {

    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong."
    });

  }

};

// =========================================================
// LOGIN USER
// =========================================================

const loginUser = (req, res) => {

  const { email, password } = req.body;

  // -------------------------------------------------------
  // 1. Validate input
  // -------------------------------------------------------

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required."
    });
  }

  // -------------------------------------------------------
  // 2. Find user by email
  // -------------------------------------------------------

  const sql = `
    SELECT *
    FROM users
    WHERE email = ?
  `;

  db.query(sql, [email], async (error, results) => {

    if (error) {

      console.error("Error finding user:", error);

      return res.status(500).json({
        success: false,
        message: "Database error."
      });
    }

    if (results.length === 0) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    const user = results[0];

    // -----------------------------------------------------
    // 3. Compare password with stored bcrypt hash
    // -----------------------------------------------------

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    // -----------------------------------------------------
// 4. Generate JWT
// -----------------------------------------------------

const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "1d"
  }
);

    // -----------------------------------------------------
    // 4. Login successful
    // -----------------------------------------------------

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  });

};

// =========================================================
// EXPORT
// =========================================================

module.exports = {
  registerUser,
  loginUser
};