let runningTotal = 0;
let buffer = "0";
let previosOperator;
const screen = document.querySelector(".screen");

document.querySelector(".calc-buttons")
.addEventListener("click", function (event) {
  buttonClick(event.target.innerText);
})

function buttonClick(value) {
  console.log(value);
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  }else {
    handleNumber(value);
  }
  rerender();
}

function handleNumber(value) {
  if(buffer==="0"){
    buffer = value;
  }else {
    buffer += value;
  }
}
function handleSymbol(value) {
  switch (value) {
    case 'CLS':
      buffer = "0";
      runningTotal = 0;
      previosOperator = null;
      break;
    case "=":
    console.log("here");
      if (previosOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previosOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "DEL":
      if (buffer.length === 1) {
        buffer = "0";
      }else { 
        buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleMath(value);
      break;

  }
}
function handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  }else {
    flushOperator(intBuffer);
  }
previosOperator = value;

buffer = "0";
}

function flushOperation(intBuffer){
  console.log("me");
  if (previosOperator === "+") {
    runningTotal += intBuffer;
  }else if (previosOperator === "-") {
      runningTotal -= intBuffer;
  }else if (previosOperator === "*") {
      runningTotal *= intBuffer;
  }else if (previosOperator === "/") {
      runningTotal /= intBuffer;
  }
}


function rerender() {
  screen.innerText = buffer;
}
