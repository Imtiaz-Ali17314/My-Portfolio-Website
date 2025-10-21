document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Task Manager Functionality
document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const clearAllBtn = document.getElementById("clearAllBtn");
  const taskCounter = document.getElementById("taskCounter");

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();

  // Add new task
  addTaskBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") addTask();
  });

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
      tasks.push({ text: taskText, completed: false });
      saveTasks();
      renderTasks();
      taskInput.value = "";
    }
  }

  // Render all tasks
  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className =
        "list-group-item d-flex justify-content-between align-items-center";

      const div = document.createElement("div");
      div.className = "form-check";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "form-check-input me-2";
      checkbox.checked = task.completed;
      checkbox.addEventListener("change", () => toggleTask(index));

      const label = document.createElement("label");
      label.className =
        "form-check-label" + (task.completed ? " task-completed" : "");
      label.textContent = task.text;

      div.appendChild(checkbox);
      div.appendChild(label);

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn btn-sm btn-outline-danger";
      deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
      deleteBtn.addEventListener("click", () => deleteTask(index));

      li.appendChild(div);
      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });

    updateTaskCounter();
  }

  // Toggle task completion
  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  // Delete task
  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  // Clear all tasks
  clearAllBtn.addEventListener("click", () => {
    tasks = [];
    saveTasks();
    renderTasks();
  });

  // Save tasks to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Update task counter
  function updateTaskCounter() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.completed).length;
    taskCounter.textContent = `${completedTasks} of ${totalTasks} tasks completed`;
  }

  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate form
    let isValid = true;
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    if (!name.value.trim()) {
      name.classList.add("is-invalid");
      isValid = false;
    } else {
      name.classList.remove("is-invalid");
    }

    if (
      !email.value.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)
    ) {
      email.classList.add("is-invalid");
      isValid = false;
    } else {
      email.classList.remove("is-invalid");
    }

    if (!message.value.trim()) {
      message.classList.add("is-invalid");
      isValid = false;
    } else {
      message.classList.remove("is-invalid");
    }

    if (isValid) {
      // Form is valid - you would typically send data to a server here
      alert("Thank you for your message! I will get back to you soon.");
      contactForm.reset();
    }
  });
});
