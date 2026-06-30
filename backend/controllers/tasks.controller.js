const db = require("../database/db")

exports.getAllTasks = async (req, res) => {
    try {
        const userId = req.session.userId;
        const [tasks] = await db.query("SELECT * FROM tasks WHERE user_id = ?", [userId]);
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }}

exports.getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const [task] = await db.query(`
            SELECT *
            FROM tasks
            WHERE id = ?
            `
            , [id]);
        if (task.length === 0) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(task[0]);
    } catch (error) {
        console.error("Error fetching task:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.createTask = async (req, res) => {
    const { title, description,status, priority,notes } = req.body;
    const userId = req.session.userId;
    console.log(req.session);
    try {
        const [task] = await db.query(`
            INSERT INTO tasks 
            (title, description,status, priority,notes,user_id)
            VALUES (?, ?, ?, ?, ?,?)
            `,     [title, description, status, priority, notes,userId]);
    res.status(201).json({
        message: "Task created successfully",
        id: task.insertId
    });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.updateTask = async (req, res) => {
    const {id} = req.params;
    const { title, description,status, priority,notes } = req.body;
    try {
        const [task] = await db.query(`
            UPDATE tasks
            SET title = ?, description = ?,status = ?, priority = ?, notes = ?
            WHERE id = ?
        `,     [title, description, status, priority, notes ,id]); 
    if (task.affectedRows === 0) {
    return res.status(404).json({
        error: "Task not found"
    });
    }
    res.status(200).json({
        message: "Task updated successfully"
    });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const [task] = await db.query(`
            DELETE FROM tasks
            WHERE id = ?
            `, [id]);
    if (task.affectedRows === 0) {
    return res.status(404).json({
        error: "Task not found"
    });
    }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

