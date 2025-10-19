import { useState } from "react";

const TaskForm = ({ onCreateTask, isCreating }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await onCreateTask(title);
    if (success) {
      setTitle("");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Add New Task
      </h2>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          disabled={isCreating}
        />
        <button
          type="submit"
          disabled={isCreating || !title.trim()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition"
        >
          {isCreating ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;