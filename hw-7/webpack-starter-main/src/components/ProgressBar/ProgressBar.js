import { listTasks } from "../../scripts/storage";
import progressTemplate from "./ProgressBar.html";

export function renderProgresBar() {
  const root = document.createElement("div");
  root.innerHTML = progressTemplate;
  root.querySelector("#progress-period").addEventListener("change", () => {
    progress();
  });
  return root;
}

export function progress(main) {
  if (!main) {
    main = document.querySelector("main");
  }
  const elem = main.querySelector(".progress-bar");
  let startWidth = 0;
  const progressPeriod = main.querySelector("#progress-period").value;

  let tasks = listTasks();
  if (progressPeriod && progressPeriod !== "all") {
    const dateFrom = new Date();
    switch (progressPeriod) {
      case "month":
        dateFrom.setMonth(dateFrom.getMonth() - 1);
        break;
      case "day":
        dateFrom.setDate(dateFrom.getDate() - 1);
        break;
      case "week":
        dateFrom.setDate(dateFrom.getDate() - 7);
        break;
      case "year":
        dateFrom.setYear(dateFrom.getYear() - 1);
        break;
    }

    tasks = tasks.filter((task) => {
      if (!task.time) {
        return false;
      }
      const date = new Date(task.time);

      return date.getTime() > dateFrom.getTime();
    });
  }
  if (tasks.length > 0) {
    startWidth = Math.round(
      (tasks.filter((task) => task.status === "done").length / tasks.length) *
        100
    );
  }

  elem.style.width = startWidth + "%";
  elem.innerText = startWidth + "%";
}
