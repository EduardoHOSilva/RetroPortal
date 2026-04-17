const inputTask = document.getElementById('inputTask');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', renderTasks);

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const text = inputTask.value.trim();
    if (!text) return;

    const tasks = getTasks();

    tasks.push({
        text,
        done: false,
        createdAt: Date.now()
    });

    saveTasks(tasks);

    notify("Tarefa adicionada!");
    inputTask.value = '';
    renderTasks();
}

function toggleTask(index) {
    const tasks = getTasks();

    tasks[index].done = !tasks[index].done;

    saveTasks(tasks);
    renderTasks();
}

function removeTask(index) {
    const tasks = getTasks();

    tasks.splice(index, 1);

    saveTasks(tasks);
    renderTasks();
}

function renderTasks() {
    const tasks = getTasks();

    taskList.innerHTML = tasks.map((task, index) => `
        <li style="margin-bottom:5px;">
            <span 
                onclick="toggleTask(${index})"
                style="
                    cursor:pointer;
                    text-decoration:${task.done ? 'line-through' : 'none'};
                    color:${task.done ? '#888' : '#0f0'};
                ">
                ${task.done ? '[✔]' : '[ ]'} ${task.text}
            </span>

            <button onclick="removeTask(${index})" style="margin-left:10px;">
                [x]
            </button>
        </li>
    `).join('');
}

function clearTasks() {
    if (!confirm("Apagar todas as tarefas?")) return;

    localStorage.removeItem('tasks');
    renderTasks();
}

function updateStats() {
    const tasks = getTasks();

    const total = tasks.length;
    const done = tasks.filter(t => t.done).length;

    document.getElementById("task-stats").innerText = 
    `${done}/${total} concluídas`;
}

inputTask.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
});