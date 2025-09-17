// Simple localStorage wrapper (utility)
export function saveTasks(tasks) {
  localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
}

export function loadTasks() {
  return JSON.parse(localStorage.getItem('kanbanTasks')) || [];
}
