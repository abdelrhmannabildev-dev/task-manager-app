const express = require("express");
const fs = require("fs").promises;
const path = require("path");

const app = express();

app.use(express.json());
const DATA_PATH = path.join(__dirname, "data", "tasks.json");

async function readTasksFromFile() {
    try {
        const data = await fs.readFile(DATA_PATH, "utf8");
        return JSON.parse(data);
    } catch (error) {
        if (error.code === "ENOENT") {
            return [];
        }     throw error;
    }
}

async function writeTasksToFile(tasks) {
    await fs.writeFile(DATA_PATH, JSON.stringify(tasks, null, 2), "utf8");
}

// serve frontend files

app.use(express.static("../frontend"));

app.get('/', (req, res) => {
    res.sendFile("../frontend/index.html");
});

// API route
app.post("/api/tasks", async (req, res) => {
    try {
        console.log(req.body);
        const tasks = await readTasksFromFile();
        
        tasks.push(req.body);
        
        await writeTasksToFile(tasks);
        res.status(200).json({ message: "Task saved successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save task" });
    }
});


app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await readTasksFromFile();
        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

app.get("/api/tasks/:id", async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        const tasks = await readTasksFromFile();
        
        const task = tasks.find((t) => t.id === taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        
        res.status(200).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch task" });
    }
});

app.delete("/api/tasks/:id", async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        let tasks = await readTasksFromFile();
        
        tasks = tasks.filter((t) => t.id !== taskId);
        
        await writeTasksToFile(tasks);
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete task" });
    }
});

app.patch("/api/tasks/:id", async (req, res) => {
    try {
        const taskId = parseInt(req.params.id);
        let tasks = await readTasksFromFile();
        
        const task = tasks.find((t) => t.id === taskId);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        
        // تعديل البيانات المستقبلة فقط
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.notes = req.body.notes || task.notes;
        task.priority = req.body.priority || task.priority;
        
        await writeTasksToFile(tasks);
        res.status(200).json({ message: "Task updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update task" });
    }
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});