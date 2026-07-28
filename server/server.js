const express=require("express");
const app=express();
const port=5000;

app.get("/",(req,res)=>{
    res.json({
        "message":"Server is running by Chara reddy at port 5000",
        "welcomeNote": " happy to weelcome you"
    })
});

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})