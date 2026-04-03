const input = document.querySelector("#taskInput");
const button = document.querySelector("#addBtn");
const list = document.querySelector(".task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task;

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("task-buttons");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    editBtn.onclick = () => {
      const newTask = prompt("Edit task:", task);

      if (newTask && newTask.trim() !== "") {
        tasks[index] = newTask.trim();
        saveTask();
        renderTasks();
      }
    };

    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTask();
      renderTasks();
    };

    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(buttonGroup);

    list.appendChild(li);
  });
}

button.addEventListener("click", () => {
  if (input.value.trim() === "") return;

  tasks.push(input.value.trim());
  saveTask();
  renderTasks();

  input.value = "";
  input.focus();
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});

renderTasks();
