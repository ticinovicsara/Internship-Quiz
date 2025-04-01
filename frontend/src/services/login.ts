import apiClient from "./apiClient";

export async function login(email: string, password: string) {
  try {
    const response = await apiClient.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
