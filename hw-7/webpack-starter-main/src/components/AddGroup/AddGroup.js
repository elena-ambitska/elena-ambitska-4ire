import AddGroupTemplate from "./AddGroup.html";
import { addGroup } from "../../scripts/storage";

export function renderAddGroup(selector) {
  document
    .querySelector(selector)
    .insertAdjacentHTML("beforeend", AddGroupTemplate);

  const rootElement = document.querySelector(".AddGroupComponent");
  rootElement.querySelector("form").addEventListener("submit", (evt) => {
    evt.preventDefault();
    const data = {};
    rootElement.querySelectorAll("input, select").forEach((el) => {
      data[el.getAttribute("name")] = el.value;
    });
    addGroup(data);
  });
}
