const TaskFilters = ({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  stats,
}) => {
  return (
    <div className="mb-6">
      {/* Search Input */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => onFilterChange("all")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === "all"
              ? "bg-blue-600 dark:bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          All ({stats.total})
        </button>
        <button
          onClick={() => onFilterChange("active")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === "active"
              ? "bg-orange-600 dark:bg-orange-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Active ({stats.active})
        </button>
        <button
          onClick={() => onFilterChange("completed")}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            filter === "completed"
              ? "bg-green-600 dark:bg-green-500 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Completed ({stats.completed})
        </button>
      </div>
    </div>
  );
};

export default TaskFilters;
