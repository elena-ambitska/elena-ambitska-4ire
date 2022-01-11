import { listGroups, listTasks } from "../../scripts/storage";
import TaskListTemplate from "./TaskList.html";
import { renderTaskItem } from "../TaskItem/TaskItem";

export function renderTaskList(selector) {
  document
    .querySelector(selector)
    .insertAdjacentHTML("beforeend", TaskListTemplate);

  const taskListEl = document.querySelector(".TaskListComponent");
  listTasks().forEach((task) => {
    renderTaskItem(taskListEl, task);
  });
}
