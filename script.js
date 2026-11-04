let tasks = JSON.parse(localStorage.getItem('proTasks')) || [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    renderTasks();
});

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();

    if (text === '') return;

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);
    saveAndRender();
    input.value = '';
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveAndRender();
}

function deleteTask(id, event) {
    event.stopPropagation();
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
}

function filterTasks(filter, element) {
    currentFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    renderTasks();
}

function saveAndRender() {
    localStorage.setItem('proTasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true;
    });

    if (filteredTasks.length === 0) {
        list.innerHTML = `<li class="empty-state">✨ No tasks here yet. Add one above!</li>`;
        updateCounters();
        return;
    }

    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');
        li.onclick = () => toggleTask(task.id);

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id}, event)">Delete</button>
        `;
        list.appendChild(li);
    });

    updateCounters();
}

function updateCounters() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;

    document.getElementById('total-count').innerText = total;
    document.getElementById('active-count').innerText = active;
    document.getElementById('completed-count').innerText = completed;
}
