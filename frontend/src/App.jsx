import { useState } from "react";
import { useAuth } from "./hooks/useAuth";
import { useTasks } from "./hooks/useTasks";
import { filterTasks, calculateStats } from "./utils/taskHelpers";
import Header from "./components/Header";
import Statistics from "./components/Statistics";
import TaskForm from "./components/TaskForm";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";

function App() {
  const { user, isAuthenticated, isLoading, login, logout, getAccessToken } =
    useAuth();
  const {
    tasks,
    loading,
    deleting,
    toggling,
    createTask,
    toggleTask,
    updateTask,
    deleteTask,
  } = useTasks(getAccessToken, isAuthenticated);

  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Get filtered tasks
  const filteredTasks = filterTasks(tasks, filter, searchQuery);

  // Get statistics
  const stats = calculateStats(tasks);

  // Show loading spinner while Auth0 initializes
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-md w-full text-center transition-colors duration-200">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">
            Task Manager 📝
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please log in to manage your tasks
          </p>
          <button
            onClick={login}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition font-semibold"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  // Main app (authenticated)
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <Header user={user} onLogout={logout} />

        {!loading && tasks.length > 0 && <Statistics stats={stats} />}

        <TaskForm onCreateTask={createTask} isCreating={false} />

        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center transition-colors duration-200">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading your tasks...
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 transition-colors duration-200">
              <TaskFilters
                filter={filter}
                onFilterChange={setFilter}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                stats={stats}
              />
            </div>
            <TaskList
              tasks={filteredTasks}
              filter={filter}
              searchQuery={searchQuery}
              onToggle={toggleTask}
              onUpdate={updateTask}
              onDelete={deleteTask}
              toggling={toggling}
              deleting={deleting}
            />
          </>
        )}
      </div>
    </div>
  );
}
export default App;
