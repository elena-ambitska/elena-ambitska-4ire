import { listTasks } from "../../scripts/storage";
import TaskListTemplate from "./TaskList.html";
import { renderTaskItem } from "../TaskItem/TaskItem";
import { renderProgresBar, progress } from "../ProgressBar/ProgressBar";

export function renderTaskList() {
  const main = document.createElement("div");
  main.insertAdjacentHTML("beforeend", TaskListTemplate);

  const taskListEl = main.querySelector(".TaskListComponent");
  listTasks().forEach((task) => {
    renderTaskItem(taskListEl, task);
  });
  main.insertAdjacentHTML("afterBegin", renderProgresBar());
  progress(main);
  return main;
}
