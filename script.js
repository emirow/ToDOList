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

    const content = document.createElement("div");
    content.classList.add("task-content");

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

    content.appendChild(span);
    content.appendChild(buttonGroup);

    li.appendChild(content);
    list.appendChild(li);



    /* SWIPE LOGIC */

    let startX = 0;
    let currentX = 0;

    content.addEventListener("touchstart", (e) => {

      startX = e.touches[0].clientX;

    });

    content.addEventListener("touchmove", (e) => {

      currentX = e.touches[0].clientX;

      let diff = currentX - startX;

      if (diff > 0 && diff < 120) {

        content.style.transform = `translateX(${diff}px)`;

      }

    });

    content.addEventListener("touchend", () => {

      let diff = currentX - startX;

      if (diff > 80) {

        content.style.transform = "translateX(80px)";

      } else {

        content.style.transform = "translateX(0)";

      }

    });

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
