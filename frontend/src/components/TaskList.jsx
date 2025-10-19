import TaskItem from "./TaskItem";

const TaskList = ({
  tasks,
  filter,
  searchQuery,
  onToggle,
  onUpdate,
  onDelete,
  toggling,
  deleting,
}) => {
  const getEmptyMessage = () => {
    if (tasks.length === 0) {
      return {
        title: "No tasks yet!",
        subtitle: "Create your first task above to get started 👆",
      };
    }

    if (searchQuery) {
      return {
        title: "No tasks found",
        subtitle: "Try a different search term",
      };
    }

    if (filter === "active") {
      return {
        title: "No active tasks",
        subtitle: "All tasks are completed! 🎉",
      };
    }

    if (filter === "completed") {
      return {
        title: "No completed tasks",
        subtitle: "No completed tasks yet. Get to work! 💪",
      };
    }
  };

  const getTitle = () => {
    let title = "";
    if (filter === "all") title = "All Tasks";
    if (filter === "active") title = "Active Tasks";
    if (filter === "completed") title = "Completed Tasks";
    if (searchQuery) title += ` - Search: "${searchQuery}"`;
    return title;
  };

  if (tasks.length === 0) {
    const message = getEmptyMessage();
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          {getTitle()}
        </h2>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
            {message.title}
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            {message.subtitle}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        {getTitle()}
      </h2>
      <ul className="space-y-3">
        {tasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
            isToggling={toggling === task._id}
            isDeleting={deleting === task._id}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
