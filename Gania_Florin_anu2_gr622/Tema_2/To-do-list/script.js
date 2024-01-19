document.addEventListener('DOMContentLoaded', function () {
    // Get the task list from local storage or initialize an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks on page load
    renderTasks();

    // Function to add a new task
    window.addTask = function () {
        const taskInput = document.getElementById('taskInput');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    };

    // Function to remove a task
    window.removeTask = function (index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    // Function to toggle task completion
    window.toggleTask = function (index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    // Function to edit a task
    window.editTask = function (index) {
        const newText = prompt('Edit task:', tasks[index].text);
        if (newText !== null) {
            tasks[index].text = newText.trim();
            saveTasks();
            renderTasks();
        }
    };

    // Function to save tasks to local storage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to render tasks on the page
    function renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.classList.toggle('completed', task.completed);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => toggleTask(index));

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            taskText.addEventListener('click', () => editTask(index));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => removeTask(index));

            listItem.appendChild(checkbox);
            listItem.appendChild(taskText);
            listItem.appendChild(deleteButton);

            taskList.appendChild(listItem);
        });
    }
});
