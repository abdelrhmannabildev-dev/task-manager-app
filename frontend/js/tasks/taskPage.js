import { getTask } from "./getTasks.js";

const taskId = new URLSearchParams(window.location.search).get("id");
const task = await getTask(taskId);
const hero = document.querySelector(".hero");
const description = document.querySelector(".description");
const notes = document.querySelector(".notes");
const title = document.querySelector(".title");
const priority = document.querySelector(".priority");
const date = document.querySelector(".date");
const status = document.querySelector(".status");
// actions
const back = document.querySelector("#back");
const edit = document.querySelector("#edit");
const del = document.querySelector("#delete");
const editForm = document.querySelector(".editForm");
const saveTask = document.querySelector(".saveTask");
const cancel = document.querySelector(".cancel");
// edit form values
const newTaskName = document.querySelector(".taskName");
const newTaskDescription = document.querySelector(".taskDescription");
const newTaskNotes = document.querySelector(".taskNotes");


// actions
back.addEventListener("click", () => {
    history.back();
});
del.addEventListener("click", () => {
    fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
    }).then(() => {
        window.location.href = "privateTasks.html";
    }) 
})

edit.addEventListener("click", () => {
    editForm.classList.toggle("hidden");
})

saveTask.addEventListener("click", (e) => {
    e.preventDefault();
    const newTaskPriority = document.querySelector(
        'input[name="priority"]:checked'
    );

    fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: newTaskName.value,
            description: newTaskDescription.value,
            notes: newTaskNotes.value,
            priority: newTaskPriority?newTaskPriority.value:task.priority
        })
    })
    .then(() => {
        location.reload();
    })
})
cancel.addEventListener("click", () => {
    editForm.classList.add("hidden");
})
if (task.priority === "low") {
    priority.classList.add("low");
} else if (task.priority === "medium") {
    priority.classList.add("medium");
} else if (task.priority === "high") {
    priority.classList.add("high");
}
if (task.status === "pending") {
    priority.classList.add("pending");
} else if (task.status === "inProgress") {
    priority.classList.add("inProgress");
} else if (task.status === "completed") {
    priority.classList.add("completed");
}
document.addEventListener("click", (e) => {
    if (editForm.classList.contains("hidden")) return;

    if (e.target.closest(".form")) return;

    if (e.target.closest("#edit")) return;

    editForm.classList.add("hidden");
});


// render
description.textContent = task.description;
priority.textContent = task.priority;
date.textContent = task.createdAt;
status.textContent = task.status;
notes.textContent = task.notes;
title.textContent = task.title;

