export async function getAllTasks() {
    const response = await fetch("http://localhost:3000/api/tasks",{
        method:"GET",
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("API Error");
    }

    return await response.json();
}

export async function getTask(id) {
    const response = await fetch(`http://localhost:3000/api/tasks/${id}`);

    if (!response.ok) {
        throw new Error("API Error");
    }

    return await response.json();
}