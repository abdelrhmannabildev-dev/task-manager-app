import { getAllTasks } from "./getTasks.js";

const tasks= await getAllTasks();
const saveTask  = document.querySelector(".saveTask");
const tasksContainer = document.querySelector(".tasksContainer");
async function renderTasks() {
    tasksContainer.innerHTML = "";
    tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("taskCard");
    taskDiv.dataset.id = task.id;
    taskDiv.innerHTML = `
        <h3 class="taskTitle">${task.title}</h3>
        <p class="taskDescription">${task.description}</p>
    `;
    tasksContainer.appendChild(taskDiv);
    });

}
renderTasks();

saveTask.addEventListener("click",async (e) => {
    e.preventDefault();
    if (!taskName.value.trim()) {
        alert("Task name is required");
        return;
    }   
    sendTask();
    taskName.value = "";
    taskDescription.value = "";
    addTaskForm.classList.add("hidden");
    window.location.reload();

});

tasksContainer.addEventListener("click", (e) => {
    const taskCard = e.target.closest(".taskCard");
    if(taskCard){
        window.location.href = `taskPage.html?id=${taskCard.dataset.id}`;
    }
});