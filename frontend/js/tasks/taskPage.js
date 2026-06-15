import { getTask } from "./getTasks.js";

const taskId = new URLSearchParams(window.location.search).get("id");
const task = await getTask(taskId);

const hero = document.querySelector(".hero");
const details = document.querySelector(".details");
const notes = document.querySelector(".notes");
const title = document.querySelector(".title");
const back = document.querySelector("#back");
const edit = document.querySelector("#edit");
const del = document.querySelector("#delete");

// actions
back.addEventListener("click", () => {
    window.history.back();
});
del.addEventListener("click", () => {
    fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
    }).then(() => {
        window.location.href = "privateTasks.html";
    }) 
})




title.textContent = task.title;
