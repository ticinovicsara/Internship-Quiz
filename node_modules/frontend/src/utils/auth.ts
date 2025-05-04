import { jwtDecode, JwtPayload } from "jwt-decode";

interface DecodedToken extends JwtPayload {
  role?: string;
}

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

export const logout = (): void => {
  localStorage.removeItem("token");
  window.location.href = "/";
};

export const isAdmin = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("No token found in localStorage.");
    return false;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.role === "Admin";
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};
