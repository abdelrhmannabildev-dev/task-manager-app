const saveTask  = document.querySelector(".saveTask");
const addTaskForm = document.querySelector(".addTaskForm");
const taskName = document.querySelector(".taskName");
const taskDescription = document.querySelector(".taskDescription");



async function sendTask() {
    const priority = document.querySelector('input[name="priority"]:checked');
    const response = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: taskName.value,
            description: taskDescription.value,
            status: "in_progress",
            priority: priority?priority.value:"medium",
            notes: "",
        }),
    });
    const data = await response.json();
}

function getDate() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}