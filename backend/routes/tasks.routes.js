const {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    getTaskById
} = require("../controllers/tasks.controller");

module.exports = function(app){
    app.get("/api/tasks", getAllTasks);
    app.get("/api/tasks/:id", getTaskById);
    app.post("/api/tasks", createTask);
    app.put("/api/tasks/:id", updateTask);
    app.delete("/api/tasks/:id", deleteTask);
}
