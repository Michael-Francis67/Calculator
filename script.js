const display = document.getElementById('display');

let selectedFunction = null;
let selectedInverseFunction = null;

window.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    calculateResult();
  } else if (event.key === 'Backspace') {
    backspace();
  }
})
function appendToDisplay(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = '';
  document.getElementById('functionIndicator').textContent = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    let expr = display.value.trim().toLowerCase();
    const functionPattern = /(sin|cos|tan|asin|acos|atan|ln|log|e|√|square|cube|power)\s*(-?\d+\.?\d*)/g;
    expr = expr.replace(functionPattern, (match, func, num) => {
      switch (func) {
        case 'sin':
          return `Math.sin(degreesToRadians(${num}))`;
        case 'cos':
          return `Math.cos(degreesToRadians(${num}))`;
        case 'tan':
          return `Math.tan(degreesToRadians(${num}))`;
        case 'asin':
          return `${radiansToDegrees(Math.asin(num))}`;
        case 'acos':
          return `${radiansToDegrees(Math.acos(num))}`;
        case 'atan':
          return `${radiansToDegrees(Math.atan(num))}`;
        case 'ln':
          return `Math.log(${num})`;
        case 'log':
          return `Math.log10(${num})`;
        case 'e':
          return `Math.exp(${num})`;
        case '√':
          return `Math.sqrt(${num})`;
        case 'square':
          return `Math.pow(${num}, 2)`;
        case 'cube':
          return `Math.pow(${num}, 3)`;
        case 'power':
          return `Math.pow(${num}, ${num})`;
        default:
          return match;
      }
    })

    let result = eval(expr);
    display.value = Number.isFinite(result) ? result : 'Error';
  } catch (error) {
    display.value = 'Error';
  }
}

function insertTextAtCursor(text) {
  const selectionStart = display.selectionStart;
  const selectionEnd = display.selectionEnd;
  const currentValue = display.value;
  const newValue = currentValue.slice(0, selectionStart) + text + currentValue.slice(selectionEnd);
  display.value = newValue;
  display.setSelectionRange(selectionStart + text.length, selectionStart + text.length);
}

insertTextAtCursor('');

function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}

function calculateFunction(func) {
  selectedFunction = func;
  display.value = func;
}

function calculateInverseFunction(func) {
  selectedFunction = func;
  display.value = func;
}