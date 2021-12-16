function calculator() {
  let firstNum = "",
    secondNum = "",
    sign = "",
    finish = false,
    memory = 0,
    memoryWasUsed = false,
    startSecondNum = false;

  const values = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."],
    actions = ["+", "-", "*", "/"],
    display = document.querySelector(".display input"),
    memoryPlus = document.querySelector(".button[value='m+']"),
    memoryMinus = document.querySelector(".button[value='m-']"),
    memoryUse = document.querySelector(".button[value='mrc']"),
    keys = document.querySelector(".keys");

  const reset = function () {
    (firstNum = ""), (secondNum = ""), (sign = ""), (finish = false);
    display.value = 0;
  };

  const showOnDisplay = function () {
    if (document.querySelector(".memory-indicator")) {
      return;
    }
    let tag = `<span class='memory-indicator'>m</span>`;
    return document
      .querySelector(".display input")
      .insertAdjacentHTML("beforebegin", tag);
  };

  const math = function () {
    switch (sign) {
      case "+":
        firstNum = +firstNum + +secondNum;
        break;
      case "-":
        firstNum = firstNum - secondNum;
        break;
      case "*":
        firstNum = firstNum * secondNum;
        break;
      case "/":
        if (secondNum === 0) {
          display.value = "Error";

          return reset();
        }
        firstNum = firstNum / secondNum;
        break;
    }
    finish = true;
    sign = "";
    secondNum = "";

    display.value = firstNum;
  };

  keys.addEventListener("click", (e) => {
    const value = e.target.getAttribute("value");

    if (value === null) {
      return;
    }

    if (value === "C") {
      return reset();
    }

    if (value !== "mrc") {
      memoryWasUsed = false;
    }

    if (values.includes(value)) {
      if (finish || display.value === "0" || startSecondNum) {
        display.value = "";
      }
      startSecondNum = false;
      display.value += value;
      finish = false;

      return;
    }

    if (actions.includes(value)) {
      if (sign) {
        secondNum = parseFloat(display.value);

        return math();
      }
      sign = value;
      firstNum = parseFloat(display.value);
      startSecondNum = true;

      return;
    }

    if (value === "=") {
      secondNum = parseFloat(display.value);

      return math();
    }
  });

  document.addEventListener("keyup", (e) => {
    let key = e.key;
    if (key === "Enter") {
      key = "=";
    }
    if (actions.includes(key) || values.includes(key) || key === "=") {
      const event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      document.querySelector(`.button[value="${key}"]`).dispatchEvent(event);
    }
  });

  memoryPlus.addEventListener("click", (e) => {
    if (display.value) {
      showOnDisplay();
      memory += parseFloat(display.value);
    }
  });

  memoryMinus.addEventListener("click", (e) => {
    if (display.value) {
      showOnDisplay();
      memory -= parseFloat(display.value);
    }
  });

  memoryUse.addEventListener("click", (e) => {
    const indicator = document.querySelector(".memory-indicator");
    if (!indicator) {
      return;
    }

    if (memoryWasUsed) {
      indicator.remove();
      memory = 0;
      memoryWasUsed = false;

      return;
    }
    display.value = memory;
    memoryWasUsed = true;
  });
}
calculator();
