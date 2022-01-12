import "../styles/index.scss";
import { initRout } from "../components/Router/Router";
import { renderNav } from "../components/Nav/Nav";

if (process.env.NODE_ENV === "development") {
  require("../index.html");
}

initRout();
renderNav("header");
console.log("webpack starterkit");
