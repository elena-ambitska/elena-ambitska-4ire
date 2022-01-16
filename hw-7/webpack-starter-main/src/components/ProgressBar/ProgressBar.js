import { listTasks } from "../../scripts/storage";
import progressTemplate from "./ProgressBar.html";

export function renderProgresBar() {
  return progressTemplate;
}

export function progress(main) {
  if (!main) {
    main = document.querySelector("main");
  }
  const elem = main.querySelector(".progress-bar");
  let startWidth = 0;
  const tasks = listTasks();
  if (tasks.length > 0) {
    startWidth = Math.round(
      (tasks.filter((task) => task.status === "done").length / tasks.length) *
        100
    );
  }

  elem.style.width = startWidth + "%";
  elem.innerText = startWidth + "%";
}
