document.write("<script src='js/btn.js'></script>");

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls__color");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const resetBtn = document.getElementById("jsReset");

const INITAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = "700";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITAL_COLOR;
ctx.fillStyle = INITAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(e) {
  const x = e.offsetX;
  const y = e.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleCM(e) {
  e.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvas);
  canvas.addEventListener("contextmenu", handleCM);
}

function handleColorClick(e) {
  const changeColor = e.target.style.backgroundColor;
  ctx.strokeStyle = changeColor;
  ctx.fillStyle = changeColor;
}

Array.from(colors).forEach((a) =>
  a.addEventListener("click", handleColorClick)
);

function handleSize(e) {
  ctx.lineWidth = e.target.value;
}

if (range) {
  range.addEventListener("input", handleSize);
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

function handleCanvas() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = INITAL_COLOR;
  }
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJS[EXPORT]";
  link.click();
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

if (resetBtn) {
  resetBtn.addEventListener("click", function () {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  });
}
