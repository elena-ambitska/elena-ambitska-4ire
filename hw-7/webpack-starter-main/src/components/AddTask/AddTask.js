import AddTaskTemplate from "./AddTask.html";
import { listGroups, addTask } from "../../scripts/storage";

export function renderAddTask() {
  const main = document.createElement("div");
  main.insertAdjacentHTML("beforeend", AddTaskTemplate);

  const rootElement = main.querySelector(".AddTaskComponent");
  const groupSelect = rootElement.querySelector("select");
  listGroups().forEach((group) => {
    const option = document.createElement("option");
    option.innerText = group.name;
    option.setAttribute("value", group.id);
    groupSelect.insertAdjacentElement("beforeend", option);
  });
  rootElement.querySelector("form").addEventListener("submit", (evt) => {
    evt.preventDefault();
    const data = {};
    rootElement.querySelectorAll("input, select").forEach((el) => {
      data[el.getAttribute("name")] = el.value;
    });
    addTask(data);
  });
  return main;
}
