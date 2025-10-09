import users from "../data/mockUsers.json";

export function mockLogin(email: string, password: string) {
  const user = users.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) {
    throw new Error("Invalid email or password");
  }
  return user;
}
