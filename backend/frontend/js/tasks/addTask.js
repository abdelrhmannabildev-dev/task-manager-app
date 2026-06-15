
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
        }),
    });
    const data = await response.json();
    console.log(data);
}