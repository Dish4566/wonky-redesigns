// preview and edit 
let mode = "none";
let w = 0; let h = 0;

// objects
let shapes = new Map();

// ui
const canvasHolder = document.getElementById("canvas_holder");
const button = document.getElementById("adder");
const errorTxt = document.getElementById("error");

// inputs
const shapeSelect = document.getElementById("shape");
const shapeColor = document.getElementById("shapeColor");

// position
const X = document.getElementById("x");
const Y = document.getElementById("y");
const Z = document.getElementById("z");

// size
const width = document.getElementById("width");   // x
const height = document.getElementById("height"); // y
const length = document.getElementById("length"); // z

// stroke
const stToggle = document.getElementById("stToggle");
const stWeight = document.getElementById("stWeight");
const stColor = document.getElementById("stColor");

// lighting 
const lightToggle = document.getElementById("lightToggle");
const lightPoint = document.getElementById("lightPoint");
const lightAmbient = document.getElementById("lightAmbient");
const lightDirect = document.getElementById("lightDirect");

function setup() {
  let can = createCanvas(windowWidth, windowHeight, WEBGL);
  can.parent("canvas_holder");
  w = windowWidth; h = windowHeight;
}

function changeMode() {
  console.log(mode);

  // mode switch
  if (shapeSelect != "null") {
    if (mode == "none") {
      mode = "preview";
    } else if (mode == "edit") {
      mode = "none";
      addShape();
    } else {
      mode = "edit";
    }
  }

  // button text change
  switch (mode) {
    case "preview": button.innerHTML = "Stop Preview"; break;
    case "edit": button.innerHTML = "Add shape"; break;
    default: button.innerHTML = "Preview"; break;
  }

  console.log(mode);
}

function addShape() {
  shapes.set(shapes.size, {
    type: shapeSelect.value,
    px: parseFloat(X.value),
    py: parseFloat(Y.value),
    pz: parseFloat(Z.value),
    sx: parseFloat(width.value),
    sy: parseFloat(height.value),
    sz: parseFloat(length.value),
    stroke: stToggle.checked ? true : false,
    stWeight: parseInt(stWeight.value),
    stColor: color(stColor.value)
  });
}

canvasHolder.addEventListener("mousedown", (e) => {
  console.log(mode);
  if (e == 2) e.preventDefault();
  if (e == 2 || mode == "preview") changeMode();
})

// main funct
function draw() {
  background(0);

  // get mouse pos
  let mX = winMouseX - w / 2;
  let mY = winMouseY - h / 2;

  // get shape selector value
  let shapeType = shapeSelect.value;

  // lighting
  ambientLight('red');

  // rendering shape to-be-added
  if (shapeSelect != 'null' & mode != "none") {
    push();

    // follow mouse if in preview...
    if (mode == "preview") {
      X.value = mX;
      Y.value = mY;
      Z.value = 0;
      translate(mX, mY, 0);
    } else translate(X.value, Y.value, Z.value);

    // parse and set stroke stuff
    if (!stToggle.checked) noStroke();
    else { 
      stroke(color(stColor.value));
      strokeWeight(parseInt(stWeight.value)); 
    }

    // render shape
    if (shapeType != "null") {
      window[shapeType](parseInt(width.value), parseInt(height.value), parseInt(length.value));
      errorTxt.innerHTML = ""
    } else errorTxt.innerHTML = "ERROR: Please select a shape type!"
    pop();
  } else orbitControl(); // otherwise, let viewer see w/ camera

  // rendering other shapes
  for (let [_, shape] of shapes) {
    push();

    if (shape.type == "null") {
      shapes.delete(_);
      continue;
    }

    // position
    translate(shape.px, shape.py, shape.pz);

    // stroke
    if (!shape.stroke) noStroke();
    else {
      stroke(shape.stColor);
      strokeWeight(shape.stWeight);
    }

    // render
    window[shape.type](shape.sx, shape.sy, shape.sz);
    pop();
  }
}