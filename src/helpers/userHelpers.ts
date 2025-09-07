import type { User } from "../types/loginTypes";


export function getUsers(): User[] {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) as User[] : [];
}
export function createUser(newUser: Omit<User, "id">): User {
  const users = getUsers();
  const existingUser = users.find(u => u.email === newUser.email);
  if (existingUser) {
    throw new Error("El correo ya está registrado, intenta con otro.");
  }
  const nextId = users.length > 0 ? Math.max(...users.map((u: User) => u.id)) + 1 : 1;
  const user: User = { id: nextId, ...newUser };
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
  return user;
}

export function findUserByEmail(email: string): User | undefined {
  const users = getUsers();
  return users.find((u: User) => u.email === email);
}
export function login(email: string, password: string): { token: string; user: User } | null {
  const user = findUserByEmail(email);
  if (!user) return null; 
  if (user.password !== password) return null; 

  const token = `token_${user.id}_${Date.now()}`;
  localStorage.setItem("token", token);
  localStorage.setItem("currentUser", JSON.stringify(user));

  return { token, user };
}