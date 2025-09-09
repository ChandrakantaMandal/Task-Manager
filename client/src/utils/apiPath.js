export const BASE_URL = "http://localhost:8080";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", //Register a new user (Admin & Member)
    LOGIN: "/api/auth/login", //Authenticate user and return jwt
    GET_PROFILE: "/api/auth/profile", //Get logged-in user details
  },
  USERS: {
    GET_ALL_USERS: "/api/users", //Get all users (Adimn Only)
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`, //Get user by Id
    CREATE_USER: "/api/users", //Create a new user (Adimn Only)
    UPDATE_USER: (userId) => `/api/users/${userId}`, //Update user details
    DELETE_USER: (userId) => `/api/users/${userId}`, //delete user details
  },
  TASKS: {
    GET_DASHBOARD_DATA: "/api/tasks/dashboard-data", //Get dashboard data
    GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data", //Get user dashboard data
    GET_ALL_TASKS: "/api/tasks", //Get all tasks(Admin all, User assignTo)
    GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`, //Get task by id
    CREATE_TASK: "/api/tasks", //Create a new task(Admin Only)
    UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`, //Update Task details
    DELETE_TASK: (taskId) => `/api/tasks/${taskId}`, //Delete task (Admin Only)

    UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`, //Upadte Task Status
    UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`, //Upadte Task Todo list
  },
  REPORTS: {
    EXPORT_TASKS: "/api/reports/export/tasks", //Download All task repot as excle (Admin only)
    EXPORT_MY_TASKS: "/api/reports/export/my-tasks", //Download user's own tasks (Users)
    EXPORT_USERS: "/api/reports/export/users", //download user task report (Admin only)
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
};
