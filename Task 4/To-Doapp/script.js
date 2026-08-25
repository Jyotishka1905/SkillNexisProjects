// =========================
// GET HTML ELEMENTS
// =========================

const taskForm =
    document.getElementById("taskForm");

const taskInput =
    document.getElementById("taskInput");

const searchInput =
    document.getElementById("searchInput");

const taskList =
    document.getElementById("taskList");

const emptyMessage =
    document.getElementById("emptyMessage");

const totalTasks =
    document.getElementById("totalTasks");

const remainingTasks =
    document.getElementById("remainingTasks");

const clearCompleted =
    document.getElementById("clearCompleted");

const filterButtons =
    document.querySelectorAll(".filter-btn");


// =========================
// LOAD TASKS
// =========================

let tasks =
    JSON.parse(
        localStorage.getItem("tasks")
    ) || [];


// Current filter

let currentFilter = "all";


// =========================
// SAVE TASKS
// =========================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// =========================
// DISPLAY TASKS
// =========================

function displayTasks() {

    taskList.innerHTML = "";


    // Search text

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    // Filter tasks

    const filteredTasks =
        tasks.filter(function(task) {


            // Search

            const matchesSearch =
                task.text
                    .toLowerCase()
                    .includes(searchText);


            // Status filter

            let matchesFilter = true;


            if (
                currentFilter ===
                "active"
            ) {

                matchesFilter =
                    !task.completed;

            }


            if (
                currentFilter ===
                "completed"
            ) {

                matchesFilter =
                    task.completed;

            }


            return (
                matchesSearch &&
                matchesFilter
            );

        });


    // Empty message

    if (filteredTasks.length === 0) {

        emptyMessage.style.display =
            "block";

    }

    else {

        emptyMessage.style.display =
            "none";

    }


    // Create task elements

    filteredTasks.forEach(function(task) {

        const li =
            document.createElement("li");


        li.className = "task-item";


        if (task.completed) {

            li.classList.add(
                "completed"
            );

        }


        li.innerHTML = `

            <input
                type="checkbox"
                class="task-checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${task.id})"
            >

            <span class="task-text">
                ${escapeHTML(task.text)}
            </span>

            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})"
                title="Delete task"
            >
                🗑️
            </button>

        `;


        taskList.appendChild(li);

    });


    updateTaskCount();

}


// =========================
// ADD TASK
// =========================

taskForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const text =
            taskInput.value.trim();


        // Don't add empty task

        if (text === "") {

            return;

        }


        // Create task

        const newTask = {

            id: Date.now(),

            text: text,

            completed: false

        };


        // Add to array

        tasks.push(newTask);


        // Save

        saveTasks();


        // Clear input

        taskInput.value = "";


        // Show tasks

        displayTasks();


        // Put cursor back

        taskInput.focus();

    }
);


// =========================
// COMPLETE / UNCOMPLETE
// =========================

function toggleTask(id) {

    const task =
        tasks.find(function(task) {

            return task.id === id;

        });


    if (!task) {

        return;

    }


    task.completed =
        !task.completed;


    saveTasks();

    displayTasks();

}


// =========================
// DELETE TASK
// =========================

function deleteTask(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (!confirmDelete) {

        return;

    }


    tasks =
        tasks.filter(function(task) {

            return task.id !== id;

        });


    saveTasks();

    displayTasks();

}


// =========================
// CLEAR COMPLETED
// =========================

clearCompleted.addEventListener(
    "click",
    function() {

        const completedTasks =
            tasks.filter(function(task) {

                return task.completed;

            });


        if (completedTasks.length === 0) {

            alert(
                "There are no completed tasks."
            );

            return;

        }


        tasks =
            tasks.filter(function(task) {

                return !task.completed;

            });


        saveTasks();

        displayTasks();

    }
);


// =========================
// FILTER BUTTONS
// =========================

filterButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {


                // Remove active

                filterButtons.forEach(
                    function(btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                // Add active

                button.classList.add(
                    "active"
                );


                // Change filter

                currentFilter =
                    button.dataset.filter;


                displayTasks();

            }
        );

    }
);


// =========================
// SEARCH
// =========================

searchInput.addEventListener(
    "input",
    function() {

        displayTasks();

    }
);


// =========================
// TASK COUNT
// =========================

function updateTaskCount() {

    const total =
        tasks.length;


    const remaining =
        tasks.filter(function(task) {

            return !task.completed;

        }).length;


    totalTasks.textContent =
        total;


    remainingTasks.textContent =
        remaining;

}


// =========================
// ESCAPE HTML
// =========================
// Prevents HTML entered as a task
// from being interpreted as HTML.

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;

}


// =========================
// INITIAL DISPLAY
// =========================

displayTasks();