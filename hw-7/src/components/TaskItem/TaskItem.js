import TaskItemTemplate from "./TaskItem.html";
import { updateTask, getGroupById, deleteTask } from "../../scripts/storage";
import { progress } from "../ProgressBar/ProgressBar";

export function renderTaskItem(taskListEl, task) {
  const div = document.createElement("div");
  div.innerHTML = TaskItemTemplate;

  const rootElem = div.querySelector("li");
  rootElem.querySelector(".name").innerText = task.name;
  if (task.time) {
    rootElem.querySelector(".name").innerText +=
      " " + new Date(task.time).toLocaleString();
  }
  taskListEl.insertAdjacentElement("beforeend", rootElem);
  const select = rootElem.querySelector(".status");
  select.value = task.status;

  const group = getGroupById(task.group);
  if (group) {
    const groupNameElem = rootElem.querySelector(".group-name");
    groupNameElem.innerText = group.name;
    groupNameElem.style.color = group.color;
  }

  rootElem.querySelector(".status").addEventListener("change", () => {
    const status = select.options[select.selectedIndex].value;
    updateTask(task, { status });
    progress();
  });

  const btnDelete = rootElem.querySelector(".btn-danger");
  console.log(btnDelete);
  btnDelete.addEventListener("click", (e) => {
    e.preventDefault();
    deleteTask(task.id);
    rootElem.remove();
  });
}
