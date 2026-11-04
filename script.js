function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    if (taskText === "") { alert("Please enter a task!"); return; }
    const ul = document.getElementById('taskList');
    const li = document.createElement('li');
    li.innerHTML = `${taskText} <button onclick="removeTask(this)">Delete</button>`;
    ul.appendChild(li);
    input.value = "";
}
function removeTask(button) { button.parentElement.remove(); }
