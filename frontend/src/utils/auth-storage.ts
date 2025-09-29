export interface AuthData {
  email: string;
  password: string;
  username: string;
  role: "ADMIN" | "USER";
  courses: []
}

export const getUsers = (): AuthData[] => {
  return JSON.parse(localStorage.getItem("users") || "[]");
};

export const findUserByEmail = (email: string) => {
  const users = getUsers();
  return users.find((u) => u.email === email);
}

export const setCurrentUser = (user: AuthData) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const clearUser = () => {
  localStorage.removeItem("user");
};

export const logout = () => {
  localStorage.removeItem("currentUser");
};

export const saveUser = (user: AuthData) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const getCurrentUser = () : AuthData | null => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const enrollCourseForCurrentUser = (courseName: string) => {
  const user = getCurrentUser();
  if (!user) return;

  // Initialize courses array if missing
  if (!user.courses) user.courses = [];

  // Add course if not already enrolled
  if (!user.courses.includes(courseName)) {
    user.courses.push(courseName);

    // Update user in local storage
    setCurrentUser(user);

    // Also update in all users array
    const users = getUsers();
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx] = user;
      localStorage.setItem("users", JSON.stringify(users));
    }
  }
};

export const getEnrolledCourses = (): string[] => {
  const user = getCurrentUser();
  return user?.courses || [];
};
