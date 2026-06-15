export async function getTasks() {
    const response = await fetch("/api/tasks");

    if (!response.ok) {
        throw new Error("API Error");
    }

    return await response.json();
}