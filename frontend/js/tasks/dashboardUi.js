import { getTasks } from "./getTasks.js";

const tasks= await getTasks();

const tasksContainer = document.querySelector(".tasksContainer");
function renderTasks(tasks) {
    tasks.forEach((task) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("taskCard");
    taskDiv.innerHTML = `
        <h2>${task.title}</h2>
        <p>${task.description}</p>
    `;
    tasksContainer.appendChild(taskDiv);
    });

}
renderTasks(tasks);