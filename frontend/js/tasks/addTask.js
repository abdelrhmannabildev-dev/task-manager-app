const saveTask  = document.querySelector(".saveTask");
const addTaskForm = document.querySelector(".addTaskForm");
const taskName = document.querySelector(".taskName");
const taskDescription = document.querySelector(".taskDescription");

saveTask.addEventListener("click", (e) => {
    e.preventDefault();
    if (!taskName.value.trim()) {
        alert("Task name is required");
        return;
    }   
    sendTask();
    taskName.value = "";
    taskDescription.value = "";
    addTaskForm.classList.add("hidden");
    location.reload();
});


async function sendTask() {
    const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: Date.now(),
            title: taskName.value,
            description: taskDescription.value,
            createdAt: getDate(),
            updatedAt: "",
            status: "pending",
            priority: "",
        }),
    });
    const data = await response.json();
    console.log(data);
}

function getDate() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}