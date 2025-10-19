//get filtered tasksbased on  filter and search query
export const filterTasks = (tasks, filter, searchQuery) => {
  let filtered = tasks;

  //apply filter (all/active/completed)
  if (filter === "active") {
    filtered = filtered.filter((task) => !task.completed);
  } else if (filter === "completed") {
    filtered = filtered.filter((task) => task.completed);
  }

  //apply search
  if (searchQuery.trim()) {
    filtered = filtered.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return filtered;
};

//Calculate task statistics
export const calculateStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { total, completed, active, completionRate };
};
