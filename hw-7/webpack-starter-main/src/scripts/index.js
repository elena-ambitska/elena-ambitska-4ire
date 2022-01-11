import "../styles/index.scss";
import { renderAddGroup } from "../components/AddGroup/AddGroup";
import { renderAddTask } from "../components/AddTask/AddTask";
import { renderTaskList } from "../components/TaskList/TaskList";

if (process.env.NODE_ENV === "development") {
  require("../index.html");
}

renderAddGroup("main");
renderAddTask("main");
renderTaskList("main");
console.log("webpack starterkit");
