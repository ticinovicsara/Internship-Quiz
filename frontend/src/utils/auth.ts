export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token !== null;
};

export const logout = (): void => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
