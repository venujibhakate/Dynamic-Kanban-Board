// Import necessary functions from other modules.
import { saveTasks, loadTasks } from './storage.js'; // Handles saving and loading tasks from storage.
import { renderColumn } from './dom.js'; // Handles DOM manipulation for rendering columns.
import { enableDragAndDrop } from './dragdrop.js'; // Manages drag and drop functionality.

// --- STATE MANAGEMENT ---
// Load tasks from storage on initial load.
let tasks = loadTasks();

// --- DOM ELEMENT SELECTION ---
// Get references to the main form and the board container.
const form = document.getElementById('taskForm');
const board = document.querySelector('.board');

// --- FUNCTIONS ---
/**
 * Renders all columns ('To Do', 'In Progress', 'Done') on the board.
 * It filters the tasks for each column and calls renderColumn to update the UI.
 */
function renderAll() {
  // An array representing the status of each column.
  ['todo', 'inprogress', 'done'].forEach(col => {
    const columnEl = document.getElementById(col);
    // Filter tasks that match the current column's status and render them.
    renderColumn(columnEl, tasks.filter(t => t.status === col));
  });
}

// --- EVENT LISTENERS ---
/**
 * Handles the form submission to create a new task.
 */
form.addEventListener('submit', e => {
  e.preventDefault(); // Prevent default form submission behavior.

  // Get and trim the values from the input fields.
  const title = document.getElementById('taskTitle').value.trim();
  const desc = document.getElementById('taskDesc').value.trim();

  // If either title or description is empty, do nothing.
  if (!title || !desc) return;

  // Create a new task object.
  const newTask = {
    id: Date.now().toString(), // Unique ID based on the current timestamp.
    title,
    desc,
    status: 'todo' // New tasks always start in the 'To Do' column.
  };

  // Add the new task to the tasks array, save, and re-render the board.
  tasks.push(newTask);
  saveTasks(tasks);
  renderAll();
  form.reset(); // Clear the form fields.
});

/**
 * Sets up drag and drop functionality for the board.
 * The callback function updates the task's status when it's moved to a new column.
 */
enableDragAndDrop(board, (taskId, newStatus) => {
  // Find the task by its ID and update its status.
  tasks = tasks.map(t =>
    t.id === taskId ? { ...t, status: newStatus } : t
  );
  // Save the updated tasks array and re-render the board.
  saveTasks(tasks);
  renderAll();
});

// --- INITIALIZATION ---
// Perform an initial render of the board when the script loads.
renderAll();
