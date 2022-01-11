import TaskItemTemplate from "./TaskItem.html";
import { updateTask } from "../../scripts/storage";

export function renderTaskItem(taskListEl, task) {
  const div = document.createElement("div");
  div.innerHTML = TaskItemTemplate;

  const rootElem = div.querySelector("li");
  rootElem.querySelector(".name").innerText = task.name;
  console.log(rootElem);
  taskListEl.insertAdjacentElement("beforeend", rootElem);
  const select = rootElem.querySelector(".status");
  select.value = task.status;
  rootElem.querySelector(".status").addEventListener("change", (evt) => {
    const status = select.options[select.selectedIndex].value;
    updateTask(task, { status });
  });
}
