const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.querySelector('.task-row-wrapper button');
const todoList = document.getElementById('incompleteTasks');
const completedList = document.getElementById('completed-tasks');

function createButton(text, className) {
  const button = document.createElement('button');
  button.innerText = text;
  button.className = className;
  return button;
}

function createDeleteButton() {
  const button = createButton('', 'delete');
  const icon = document.createElement('img');
  icon.src = './remove.svg';
  button.appendChild(icon);
  return button;
}

function createTaskElement(taskText) {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const label = document.createElement('label');
  // innerText экранирует спецсимволы, поэтому текст задачи не станет разметкой
  label.innerText = taskText;
  label.className = 'task';

  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';

  listItem.append(checkbox, label, editInput, createButton('Edit', 'edit'), createDeleteButton());
  return listItem;
}

function addTask() {
  if (!newTaskInput.value) return;

  const listItem = createTaskElement(newTaskInput.value);
  todoList.appendChild(listItem);
  bindTaskEvents(listItem);

  newTaskInput.value = '';
}

function editTask() {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const isEditMode = listItem.classList.contains('editMode');

  if (isEditMode) {
    label.innerText = editInput.value;
    this.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    this.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
}

function deleteTask() {
  this.parentNode.remove();
}

function toggleTaskStatus() {
  const listItem = this.parentNode;
  const targetList = this.checked ? completedList : todoList;
  targetList.appendChild(listItem);
}

function bindTaskEvents(listItem) {
  listItem.querySelector('button.edit').onclick = editTask;
  listItem.querySelector('button.delete').onclick = deleteTask;
  listItem.querySelector('input[type=checkbox]').onchange = toggleTaskStatus;
}

addTaskButton.addEventListener('click', addTask);

for (const listItem of [...todoList.children, ...completedList.children]) {
  bindTaskEvents(listItem);
}
