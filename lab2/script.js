"use strict"

let lastDeletedTask = null;
let taskToDelete = null;

// Dodanie zadania
document.getElementById('addTaskButton').addEventListener('click', function () {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

// Dodanie zadania do listy
function addTask(taskText) {
    const ul = document.getElementById('taskList');
    const li = document.createElement('li');

    li.textContent = taskText;
    li.addEventListener('click', toggleTaskCompletion);

    // Przycisk delete
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function (event) {
        event.stopPropagation();
        deleteTask(li);
    });
    li.appendChild(deleteButton);
    ul.appendChild(li);
}

function toggleTaskCompletion(event) {
    const li = event.target;
    li.classList.toggle('completed');
    if (li.classList.contains('completed')) {
        const dateSpan = document.createElement('span');
        const now = new Date();
        dateSpan.textContent = '(' + now.toLocaleString() + ')';
        dateSpan.classList.add('date');
        li.appendChild(dateSpan);
    }
    else {
        const dateSpan = li.querySelector('.date');
        if (dateSpan) {
            dateSpan.remove();
        }
    }
}

function deleteTask(taskElement) {
    lastDeletedTask = taskElement;
    taskToDelete = taskElement;
    document.getElementById('confirmationModal').style.display = 'flex';

    const modalText = document.getElementById('modalText');
    modalText.textContent = `Czy na pewno chcesz usunąć zadanie: "${taskElement.firstChild.textContent.trim()}"?`;
}

// Jeśli modal TAK
document.getElementById('confirmDelete').addEventListener('click', function () {
    if (taskToDelete) {
        taskToDelete.remove();
        taskToDelete = null;
    }
    closeModal();
});

// Jeśli modal NIE
document.getElementById('cancelDelete').addEventListener('click', function () {
    if (taskToDelete) {
        taskToDelete = null;
    }
    closeModal();
});

function closeModal() {
    document.getElementById('confirmationModal').style.display = 'none';
}

document.getElementById('undoButton').addEventListener('click', function () {
    const ul = document.getElementById('taskList')
    if (lastDeletedTask) {
        ul.appendChild(lastDeletedTask);
        lastDeletedTask = null;
    }
});