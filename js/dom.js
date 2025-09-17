/**
 * Creates and returns an HTML element for a single task.
 * @param {object} task - The task object containing id, title, and description.
 * @returns {HTMLElement} A div element representing the task.
 */
export function createTaskElement(task) {
  const div = document.createElement('div');
  div.className = 'task'; // Set CSS class for styling.
  div.draggable = true; // Make the task element draggable.
  div.dataset.id = task.id; // Store the task ID in a data attribute.
  // Set the inner HTML to display the task's title and description.
  div.innerHTML = `<strong>${task.title}</strong><br>${task.desc}`;
  return div;
}

/**
 * Renders a list of tasks into a specified column element.
 * @param {HTMLElement} columnEl - The HTML element of the column to render tasks into.
 * @param {Array<object>} tasks - An array of task objects to be rendered.
 */
export function renderColumn(columnEl, tasks) {
  // Clear the column of any existing tasks before rendering.
  columnEl.innerHTML = '';
  // Create and append a task element for each task in the array.
  tasks.forEach(task => {
    columnEl.appendChild(createTaskElement(task));
  });
}
