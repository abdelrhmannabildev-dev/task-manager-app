const express = require("express");
const fs = require("fs");
const path = require("path");
const { json } = require("stream/consumers");

const app = express();

app.use(express.json());

// serve frontend files
app.use(express.static("./frontend"));

// API route
app.post("/api/tasks", (req, res) => {
    console.log(req.body);
    let tasks=[];
    if (fs.existsSync("./data/tasks.json")) {
        tasks = JSON.parse(fs.readFileSync("./data/tasks.json"));
    }
    tasks.push(req.body);
    fs.writeFile(
        "./data/tasks.json",
        JSON.stringify(tasks, null, 2),
        (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: "Failed to save task" });
            }

            res.status(200).json({ message: "Task saved successfully" });
        }
    );
});
app.get("/api/tasks",(req,res)=>{
    let tasks=[]
    if (fs.existsSync("./data/tasks.json")) {
        tasks = JSON.parse(fs.readFileSync("./data/tasks.json"));
        console.log(JSON.stringify(tasks))
    }
    res.status(200).json(tasks)
})



app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});