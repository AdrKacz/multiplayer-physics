// Create box on click
function createBox() {
  Composite.add(boxWorld, Bodies.rectangle(Common.random(200, 600), Common.random(50, 200), 80, 80));
}

canvas.addEventListener("click", (event) => {
  createBox();
});

// Set clear and restore action
function clear() {
  console.log("Clear Boxes");
  savedBodies = Composite.allBodies(boxWorld);
  Composite.clear(boxWorld);
};

function restore() {
  if (savedBodies === undefined) {
    return;
  };
  console.log("Restore Boxes");
  Composite.clear(boxWorld);
  Composite.add(boxWorld, savedBodies);
};

let savedBodies = undefined;
document.querySelector("button#clear").addEventListener("click", (_) => {
  clear();
});

document.querySelector("button#restore").addEventListener("click", (_) => {
  restore();
});

document.addEventListener("keyup", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  };
  if (event.key !== "c") {
    return;
  };

  clear();
});

document.addEventListener("keyup", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  };
  if (event.key !== "r") {
    return;
  };

  restore();
});
