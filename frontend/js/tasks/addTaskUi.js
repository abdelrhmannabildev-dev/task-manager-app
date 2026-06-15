const addBtn = document.querySelector(".addTask");
const addTaskForm = document.querySelector(".addTaskForm");

addBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    addTaskForm.classList.remove("hidden");
});

addTaskForm.addEventListener("click", (e) => {
    e.stopPropagation();
});

document.addEventListener("click", () => {
    addTaskForm.classList.add("hidden");
});

addTaskForm.querySelector(".cancelTask").addEventListener("click", () => {
    addTaskForm.classList.add("hidden");
});