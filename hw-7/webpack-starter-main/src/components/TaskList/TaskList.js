import { listTasks } from "../../scripts/storage";
import TaskListTemplate from "./TaskList.html";
import { renderTaskItem } from "../TaskItem/TaskItem";

export function renderTaskList() {
  const main = document.createElement("div");
  main.insertAdjacentHTML("beforeend", TaskListTemplate);

  const taskListEl = main.querySelector(".TaskListComponent");
  listTasks().forEach((task) => {
    renderTaskItem(taskListEl, task);
  });
  return main;
}
