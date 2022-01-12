import AddTaskTemplate from "./AddTask.html";
import { listGroups, addTask } from "../../scripts/storage";
import { createNotification } from "../Notification/Notification";

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
    data["status"] = "new";
    if (data.time) {
      const time = new Date(data.time);
      data.time = time.toLocaleString();
    }
    addTask(data);
    createNotification("Task created successfully");
  });
  return main;
}
