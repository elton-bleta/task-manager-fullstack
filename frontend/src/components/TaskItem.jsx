import { useState } from "react";

const TaskItem = ({
  task,
  onToggle,
  onUpdate,
  onDelete,
  isToggling,
  isDeleting,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSave = async () => {
    if (editedTitle === task.title) {
      setIsEditing(false);
      return;
    }

    const success = await onUpdate(task._id, editedTitle);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  return (
    <li className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
      <div className="flex items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id)}
          disabled={isToggling || isEditing}
          className="w-5 h-5 cursor-pointer disabled:cursor-not-allowed accent-blue-600 dark:accent-blue-500"
        />

        {isEditing ? (
          // Editing mode
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-1 border border-blue-500 dark:border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        ) : (
          // View mode
          <>
            <span
              className={`flex-1 ${
                task.completed
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : "text-gray-800 dark:text-gray-200"
              } ${isToggling ? "opacity-50" : ""}`}
            >
              {task.title}
            </span>
            <button
              onClick={() => setIsEditing(true)}
              disabled={isToggling}
              className="px-3 py-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium disabled:text-gray-400 dark:disabled:text-gray-600 transition"
            >
              Edit
            </button>
          </>
        )}
      </div>

      {!isEditing && (
        <button
          onClick={() => onDelete(task._id)}
          disabled={isDeleting}
          className="ml-2 text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed transition"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </li>
  );
};

export default TaskItem;
