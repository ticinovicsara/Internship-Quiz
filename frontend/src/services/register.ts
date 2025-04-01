import apiClient from "./apiClient";

export async function register(
  username: string,
  email: string,
  password: string
) {
  try {
    const response = await apiClient.post("/users/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
}
