import users from "../data/mockUsers.json";

export function mockLogin(
  email: string,
  password: string,
  rememberMe: boolean = false
) {
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Simulate authentication token from backend
  const token = "mock-token-" + Math.random().toString(36).substring(2, 10);

  const userData = {
    ...user,
    token,
    loginTime: new Date().toISOString(),
  };

  // Store credentials in browser storage based on rememberMe choice
  if (rememberMe) {
    localStorage.setItem("peerprepUser", JSON.stringify(userData));
  } else {
    sessionStorage.setItem("peerprepUser", JSON.stringify(userData));
  }

  return userData;
}

// Check if user is still logged in
export function mockCheckLogin() {
  const savedUser =
    JSON.parse(localStorage.getItem("peerprepUser") || "null") ||
    JSON.parse(sessionStorage.getItem("peerprepUser") || "null");

  return savedUser;
}

// Simulate logout
export function mockLogout() {
  localStorage.removeItem("peerprepUser");
  sessionStorage.removeItem("peerprepUser");
}
