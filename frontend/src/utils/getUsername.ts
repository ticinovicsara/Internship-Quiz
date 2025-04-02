import { jwtDecode } from "jwt-decode";

export const getUsernameFromToken = (): string | null => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found in localStorage.");
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 3) {
    console.error("Invalid token format.");
    return null;
  }

  try {
    const decoded: any = jwtDecode(token);
    return decoded.username;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
