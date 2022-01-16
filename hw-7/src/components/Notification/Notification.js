import NotificationTemplate from "./Notification.html";

export function createNotification(text) {
  const div = document.createElement("div");
  div.insertAdjacentHTML("beforeend", NotificationTemplate);
  div.querySelector(".toast-body").innerText = text;
  const indexWrap = document.querySelector(".toast-wrapper");
  indexWrap.append(div);
  setTimeout(() => {
    div.remove();
  }, 2000);
  const btnClose = div.querySelector(".btn-close");
  btnClose.addEventListener("click", () => {
    div.remove();
  });
}
