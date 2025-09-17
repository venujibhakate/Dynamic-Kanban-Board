// Handles drag & drop events between columns

export function enableDragAndDrop(boardEl, onDropCallback) {
  let draggedTask = null;

  boardEl.addEventListener('dragstart', e => {
    if (e.target.classList.contains('task')) {
      draggedTask = e.target;
      e.target.classList.add('dragging');
    }
  });

  boardEl.addEventListener('dragend', e => {
    if (draggedTask) {
      draggedTask.classList.remove('dragging');
      draggedTask = null;
    }
  });

  boardEl.querySelectorAll('.task-list').forEach(list => {
    list.addEventListener('dragover', e => {
      e.preventDefault();
    });

    list.addEventListener('drop', e => {
      e.preventDefault();
      if (draggedTask) {
        onDropCallback(draggedTask.dataset.id, list.id); // pass new column id
      }
    });
  });
}
