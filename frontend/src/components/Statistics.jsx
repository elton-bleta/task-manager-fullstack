const Statistics = ({ stats }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-200">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Statistics
      </h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {stats.total}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {stats.completed}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
            {stats.active}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {stats.completionRate}%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Completion</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
