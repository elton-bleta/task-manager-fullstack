import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useTasks = (getAccessToken, isAuthenticated) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [toggling, setToggling] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  //fetch all tasks
  const fetchTasks = async () => {
    try {
      const token = await getAccessToken();

      const response = await fetch("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching tasks", error);
      toast.error("Failed to load tasks, Please try again,");
      setLoading(false);
    }
  };

  //create a new task
  const createTask = async (title) => {
    if (!title.trim()) {
      toast.error("Please enter a task title");
      return false;
    }

    try {
      const token = await getAccessToken();

      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: title.trim() }),
      });
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      toast.success("Task created successfully! 🎉");
    } catch (error) {
      console.error("Error creating task", error);
      toast.error("Failed to create task, Please try again.");
      return false;
    }
  };

  // Toggle task completion
  const toggleTask = async (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;

    setToggling(taskId);

    // Optimistic update
    setTasks(
      tasks.map((t) =>
        t._id === taskId ? { ...t, completed: !t.completed } : t
      )
    );

    try {
      const token = await getAccessToken();

      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ completed: !task.completed }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks(tasks.map((t) => (t._id === taskId ? updatedTask : t)));

      toast.success(
        updatedTask.completed ? "Task completed! ✅" : "Task marked incomplete"
      );
    } catch (error) {
      console.error("Error toggling task:", error);
      // Revert optimistic update
      setTasks(tasks.map((t) => (t._id === taskId ? task : t)));
      toast.error("Failed to update task. Please try again.");
    } finally {
      setToggling(null);
    }
  };

  // Update task title
  const updateTask = async (taskId, newTitle) => {
    if (!newTitle.trim()) {
      toast.error("Task title cannot be empty");
      return false;
    }

    try {
      const token = await getAccessToken();

      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title: newTitle.trim() }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks(tasks.map((t) => (t._id === taskId ? updatedTask : t)));

      toast.success("Task updated! ✏️");
      return true;
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task. Please try again.");
      return false;
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }

    setDeleting(taskId);

    const taskToDelete = tasks.find((t) => t._id === taskId);

    // Optimistic update
    setTasks(tasks.filter((task) => task._id !== taskId));

    try {
      const token = await getAccessToken();

      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      toast.success("Task deleted successfully! 🗑️");
    } catch (error) {
      console.error("Error deleting task:", error);
      // Restore task
      setTasks([...tasks, taskToDelete]);
      toast.error("Failed to delete task. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  return {
    tasks,
    loading,
    deleting,
    toggling,
    createTask,
    toggleTask,
    updateTask,
    deleteTask,
  };
};
