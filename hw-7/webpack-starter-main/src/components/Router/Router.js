import { renderAddGroup } from "../AddGroup/AddGroup";
import { renderAddTask } from "../AddTask/AddTask";
import { renderTaskList } from "../TaskList/TaskList";
const routes = {
  AddGroup: renderAddGroup,
  AddTask: renderAddTask,
  TaskList: renderTaskList,
};
export function route() {
  let pathname = window.location.pathname.substring(1);

  const main = document.querySelector("main");
  main.innerHTML = "";

  if (typeof routes[pathname] === "function") {
    main.append(routes[pathname]());
  } else {
    main.append(renderTaskList());
  }
}

export function initRout() {
  window.addEventListener("popstate", () => {
    route();
  });

  window.addEventListener("pushstate", () => {
    route();
  });

  route();
}
