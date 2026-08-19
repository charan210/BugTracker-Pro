const db = require("./db");

const express=require("express");
const cors = require("cors");
const app=express();
app.use(cors());
app.use(express.json());
const port=5000;


app.get("/api/health",(req,res)=>{
    res.json({
         success: true,

        message: "BugTracker Pro Backend is Running 🚀",
        version: "1.0.0"
    })
});

app.get("/api/bugs", (req, res) => {

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

});

app.post("/api/bugs", (req, res) => {

    const { title, description, priority } = req.body;

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

});

app.put("/api/bugs/:id", (req, res) => {

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

});

app.delete("/api/bugs/:id", (req, res) => {

    const bugId = req.params.id;

    const sql = "DELETE FROM bugs WHERE id = ?";

    db.query(sql, [bugId], (error, result) => {

        if (error) {
            console.error("Error deleting bug:", error);

            return res.status(500).json({
                success: false,
                message: "Failed to delete bug."
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
            message: "Bug deleted successfully!"
        });

    });

});


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})