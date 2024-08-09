export async function getUsers() {
    const response = await fetch("/api/users", { method: "GET" });
    if (response.ok) {
        return response.json();
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error("Request failed with status: " + response.status + " message: " + errorMessage);
    }
}