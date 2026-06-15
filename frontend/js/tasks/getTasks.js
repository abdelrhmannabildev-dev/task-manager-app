export async function getAllTasks() {
    const response = await fetch("/api/tasks");

    if (!response.ok) {
        throw new Error("API Error");
    }

    return await response.json();
}

export async function getTask(id) {
    const response = await fetch(`/api/tasks/${id}`);

    if (!response.ok) {
        throw new Error("API Error");
    }

    return await response.json();
}