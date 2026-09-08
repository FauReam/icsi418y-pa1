# TaskFlow — My Task List

**Author:** Jiayu Liao
**Course:** ICSI 418Y – Software Engineering, Programming Assignment 1

## Description

TaskFlow is a small client-side task management web application built with
plain HTML, CSS, and JavaScript (no frameworks or libraries). It allows a
user to:

- Enter the name of a task
- Select a priority (Low, Medium, or High)
- Add the task to the page
- Mark a task as completed (and undo it)
- Delete a task

Tasks are stored in a JavaScript array while the page is open. Empty task
names are rejected with an error message, and the page shows a live count
of total and completed tasks.

## Project Structure

```
├── index.html   — page structure: heading, task form, task list area
├── style.css    — styling, priority badges, completed-task appearance
├── script.js    — task array, event listeners, DOM rendering
└── README.md    — this file
```

## How to Run

1. Clone this repository:
   `git clone <your-repository-url>`
2. Open the project folder.
3. Open `index.html` in any modern web browser
   (double-click the file, or use a VS Code extension such as Live Server).

No build step or server is required.

## How It Works

- **HTML** organizes the page into a header, a form (task name input,
  priority select, Add Task button), and a task display area.
- **CSS** uses element and class selectors for layout, color-coded priority
  badges and borders, and a line-through style for completed tasks.
- **JavaScript** stores tasks as objects (`{ id, name, priority, completed }`)
  in an array. A submit event listener (with `event.preventDefault()`) adds
  tasks, and each rendered task gets Complete and Delete buttons that update
  the array and re-render the list.

## Known Issues / Incomplete Features

- Tasks are **not** saved when the page is refreshed (persistence was not
  required for this assignment).
