import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUserProfile,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/api";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // all | active | completed
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch user data and tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userProfile = await getUserProfile();
        const userTasks = await getTasks();
        setUser(userProfile.data);
        setTasks(userTasks.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Failed to fetch data");
        // If token is invalid, redirect to login
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (taskTitle.trim() === "") return;

    try {
      const { data } = await createTask({
        title: taskTitle,
        description: taskDescription,
      });
      setTasks([...tasks, data]);
      setTaskTitle("");
      setTaskDescription("");
      setShowTaskForm(false);
    } catch (err) {
      setError("Failed to create task");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskTitle(task.title);
    setTaskDescription(task.description);
    setShowTaskForm(true);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    if (taskTitle.trim() === "") return;

    try {
      const { data } = await updateTask(editingTask._id, {
        title: taskTitle,
        description: taskDescription,
      });

      setTasks(
        tasks.map((task) => (task._id === editingTask._id ? data : task))
      );

      setTaskTitle("");
      setTaskDescription("");
      setEditingTask(null);
      setShowTaskForm(false);
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    try {
      const task = tasks.find((t) => t._id === taskId);
      const { data } = await updateTask(taskId, {
        completed: !task.completed,
      });

      setTasks(tasks.map((t) => (t._id === taskId ? data : t)));
    } catch (err) {
      setError("Failed to update task");
    }
  };

  // Filtered tasks based on search term and status
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      searchTerm.trim() === "" ||
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && !task.completed) ||
      (statusFilter === "completed" && task.completed);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow sticky top-0">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">
                  Scalable Web App
                </h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Error Message */}
        {error && (
          <div className="px-4 py-6 sm:px-0">
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="px-4 py-6 sm:px-0 flex justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-10 w-10 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}

        {/* User Profile */}
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                User Profile
              </h2>
              {user && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Task Management */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>

            <div className="flex-1 flex flex-col md:flex-row md:items-center md:space-x-3 gap-3 md:gap-0">
              {/* Search */}
              <div className="flex-1">
                <label htmlFor="task-search" className="sr-only">
                  Search tasks
                </label>
                <input
                  id="task-search"
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Status filter */}
              <div className="flex items-center space-x-2">
                <label
                  htmlFor="status-filter"
                  className="text-sm text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status-filter"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Add task button */}
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setEditingTask(null);
                    setTaskTitle("");
                    setTaskDescription("");
                    setShowTaskForm(!showTaskForm);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {showTaskForm ? "Cancel" : "Add Task"}
                </button>
              </div>
            </div>
          </div>

          {/* Task Form */}
          {showTaskForm && (
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingTask ? "Edit Task" : "Add New Task"}
              </h3>
              <form onSubmit={editingTask ? handleUpdateTask : handleAddTask}>
                <div className="mb-4">
                  <label
                    htmlFor="task-title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="task-title"
                    placeholder="Enter your task title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="task-description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="task-description"
                    rows={3}
                    placeholder="Enter your Description"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    {editingTask ? "Update Task" : "Add Task"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Task List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredTasks.length === 0 ? (
                <li className="px-6 py-4 text-center">
                  <p className="text-gray-500">
                    No tasks match your criteria. Try adjusting your search or
                    filters.
                  </p>
                </li>
              ) : (
                filteredTasks.map((task) => (
                  <li key={task._id}>
                    <div className="px-6 py-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task._id)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer"
                          />
                          <div className="ml-3">
                            <p
                              className={`text-sm font-medium ${
                                task.completed
                                  ? "line-through text-gray-500"
                                  : "text-gray-900"
                              }`}
                            >
                              {task.title}
                            </p>
                            <p
                              className={`text-sm ${
                                task.completed
                                  ? "line-through text-gray-400"
                                  : "text-gray-500"
                              }`}
                            >
                              {task.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2 sm:justify-end">
                          <button
                            onClick={() => handleEditTask(task)}
                            className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:text-indigo-700 cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task._id)}
                            className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
