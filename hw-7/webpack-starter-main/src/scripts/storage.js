const myStorage = window.localStorage;

function makeid(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function readStorage() {
  const dataString = myStorage.getItem("toDo");
  if (dataString) {
    return JSON.parse(dataString);
  } else {
    return { groups: [], tasks: [] };
  }
}
export function saveStorage(data) {
  myStorage.setItem("toDo", JSON.stringify(data));
}
export function addGroup(groupData) {
  const data = readStorage();
  groupData["id"] = makeid(32);
  data.groups.push(groupData);
  saveStorage(data);
}
export function addTask(taskData) {
  const data = readStorage();
  taskData["id"] = makeid(32);
  data.tasks.push(taskData);
  saveStorage(data);
}
export function updateTask(task, taskData) {
  const data = readStorage();
  const index = data.tasks.findIndex((el) => {
    return el.id === task.id;
  });
  console.log("index", index, task, taskData);
  if (index === -1) {
    return;
  }
  data.tasks[index] = { ...task, ...taskData };
  saveStorage(data);
}
export function listGroups() {
  const data = readStorage();
  return data.groups;
}

export function listTasks() {
  const data = readStorage();
  return data.tasks;
}
