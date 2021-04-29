// Create box on click
function createBox() {
  console.log("Create Box");
  Composite.add(boxWorld, Bodies.rectangle(Common.random(200, 600), Common.random(50, 200), 80, 80));
};

// Set clear and restore action
let savedBodies = undefined;
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
