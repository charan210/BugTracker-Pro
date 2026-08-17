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


app.post("/api/bugs", (req, res) => {

    console.log(req.body);

    res.json({
        success: true,
        message: "Bug received successfully!"
    });

});


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})