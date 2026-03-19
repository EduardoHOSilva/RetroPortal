const inputTask = document.getElementById('inputTask');
const taskList = document.getElementById('taskList');

// Carregar tarefas ao abrir
document.addEventListener('DOMContentLoaded', renderTasks);

function addTask() {
    const text = inputTask.value.trim();
    if (text === '') return;

    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push(text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    inputTask.value = '';
    renderTasks();
}

function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    taskList.innerHTML = tasks.map((task, index) => 
        `<li>${task} <button onclick="removeTask(${index})" style="padding:0 5px; margin-left:10px;">[x]</button></li>`
    ).join('');
}

function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function clearTasks() {
    localStorage.removeItem('tasks');
    renderTasks();
}