import AddGroupTemplate from "./AddGroup.html";
import { addGroup } from "../../scripts/storage";
import { createNotification } from "../Notification/Notification";

export function renderAddGroup() {
  const main = document.createElement("div");

  main.insertAdjacentHTML("beforeend", AddGroupTemplate);

  const rootElement = main.querySelector(".AddGroupComponent");
  rootElement.querySelector("form").addEventListener("submit", (evt) => {
    evt.preventDefault();
    const data = {};
    rootElement.querySelectorAll("input, select").forEach((el) => {
      data[el.getAttribute("name")] = el.value;
    });
    addGroup(data);

    createNotification("Group created successfully");
  });
  return main;
}
