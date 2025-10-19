import ThemeToggle from "./ThemeToggle";

const Header = ({ user, onLogout }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400">
        Task Manager 📝
      </h1>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="text-right">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Welcome back!
          </p>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {user.name}
          </p>
        </div>
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
        )}
        <button
          onClick={onLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Header;
