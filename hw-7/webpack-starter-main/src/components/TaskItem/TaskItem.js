import TaskItemTemplate from "./TaskItem.html";
import { updateTask, getGroupById } from "../../scripts/storage";
import { progress } from "../ProgressBar/ProgressBar";

export function renderTaskItem(taskListEl, task) {
  const div = document.createElement("div");
  div.innerHTML = TaskItemTemplate;

  const rootElem = div.querySelector("li");
  rootElem.querySelector(".name").innerText = task.name + " " + task.time;
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
}
