// ===== Element references =====
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const priorityInput = document.querySelector("#priority");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const errorMessage = document.querySelector("#error-message");
const taskStats = document.querySelector("#task-stats");

// ===== Task storage: an array of task objects =====
const tasks = [];
let nextTaskId = 1;

// ===== Add a task when the form is submitted =====
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskName = taskInput.value.trim();
    const taskPriority = priorityInput.value;

    // Reject empty task names
    if (taskName === "") {
        errorMessage.hidden = false;
        taskInput.classList.remove("shake");
        // Restart the shake animation
        void taskInput.offsetWidth;
        taskInput.classList.add("shake");
        taskInput.focus();
        return;
    }

    errorMessage.hidden = true;

    const task = {
        id: nextTaskId,
        name: taskName,
        priority: taskPriority,
        completed: false
    };
    nextTaskId += 1;

    tasks.push(task);

    taskInput.value = "";
    taskInput.focus();

    displayTasks();
});

// ===== Render the task list on the page =====
function displayTasks() {
    taskList.innerHTML = "";

    emptyState.hidden = tasks.length > 0;

    const completedCount = tasks.filter(task => task.completed).length;
    taskStats.textContent = `${tasks.length} task${tasks.length === 1 ? "" : "s"} · ${completedCount} completed`;

    tasks.forEach(function (task) {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task", `priority-${task.priority}`);
        if (task.completed) {
            taskElement.classList.add("completed");
        }

        const nameSpan = document.createElement("span");
        nameSpan.classList.add("task-name");
        nameSpan.textContent = task.name;

        const badge = document.createElement("span");
        badge.classList.add("badge", `badge-${task.priority}`);
        badge.textContent = task.priority;

        const completeButton = document.createElement("button");
        completeButton.classList.add("btn-complete");
        completeButton.textContent = task.completed ? "Undo" : "Complete";
        completeButton.addEventListener("click", function () {
            toggleComplete(task.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn-delete");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
            deleteTask(task.id);
        });

        taskElement.appendChild(nameSpan);
        taskElement.appendChild(badge);
        taskElement.appendChild(completeButton);
        taskElement.appendChild(deleteButton);

        taskList.appendChild(taskElement);
    });
}

// ===== Toggle a task between completed and incomplete =====
function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        displayTasks();
    }
}

// ===== Remove a task from the array and re-render =====
function deleteTask(taskId) {
    const index = tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
        tasks.splice(index, 1);
        displayTasks();
    }
}

// ===== Priority segmented control (visual layer over the native select) =====
const priorityOptions = document.querySelectorAll(".priority-option");

priorityOptions.forEach(function (option) {
    option.addEventListener("click", function () {
        priorityInput.value = option.dataset.value;
        priorityOptions.forEach(o => o.classList.toggle("active", o === option));
    });
});

// ===== Ambient cursor spotlight =====
document.addEventListener("pointermove", function (event) {
    document.documentElement.style.setProperty("--mx", event.clientX + "px");
    document.documentElement.style.setProperty("--my", event.clientY + "px");
});

// ===== Update checker: compare local version with the latest on GitHub =====
const REPO_URL = "https://raw.githubusercontent.com/FauReam/icsi418y-pa1/main/version.json";
const APP_VERSION = 1;

const updateButton = document.querySelector("#update-button");
const updateStatus = document.querySelector("#update-status");

updateButton.addEventListener("click", async function () {
    updateStatus.textContent = "Checking…";
    try {
        const response = await fetch(REPO_URL + "?t=" + Date.now());
        const data = await response.json();
        if (data.version > APP_VERSION) {
            updateStatus.textContent = "New version available — run update.command";
        } else {
            updateStatus.textContent = "Up to date";
        }
    } catch (error) {
        updateStatus.textContent = "Offline — check failed";
    }
});
