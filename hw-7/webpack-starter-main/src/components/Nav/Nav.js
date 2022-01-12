import NuvTamplate from "./Nav.html";
import { route } from "../Router/Router";

export function renderNav(selector) {
  console.log(selector);
  const header = document.querySelector(selector);
  header.insertAdjacentHTML("beforeend", NuvTamplate);

  const links = document.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.history.pushState(
        {},
        "ToDo - " + link.innerText.trim(),
        link.getAttribute("href")
      );
      route();
    });
  });
}
