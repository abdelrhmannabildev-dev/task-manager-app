import { getAllTasks } from "./getTasks.js";

const tasks= await getAllTasks();

const tasksContainer = document.querySelector(".tasksContainer");
function renderTasks(tasks) {
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
renderTasks(tasks);

tasksContainer.addEventListener("click", (e) => {
    const taskCard = e.target.closest(".taskCard");
    if(taskCard){
        window.location.href = `taskPage.html?id=${taskCard.dataset.id}`;
    }
});