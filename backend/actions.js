// Import Physics Engine
const Matter = require("matter-js");
const Composite = Matter.Composite;
const Bodies = Matter.Bodies;
const Common = Matter.Common;

// Create box on click
function createBox(boxWorld) {
  console.log("[Server] Create Box");
  const x = Common.random(200, 600);
  const y = Common.random(50, 200);
  Composite.add(boxWorld, Bodies.rectangle(x, y, 80, 80));
  return {x:x, y:y}
};

// Set clear and restore action
let savedBodies = undefined;
function clear(boxWorld) {
  console.log("[Server] Clear Boxes");
  savedBodies = Composite.allBodies(boxWorld);
  Composite.clear(boxWorld);

  console.log("[Server] savedBodies > ", savedBodies.length);
};

function restore(boxWorld) {
  if (savedBodies === undefined) {
    return;
  };
  console.log("[Server] Restore Boxes");
  Composite.clear(boxWorld);
  Composite.add(boxWorld, savedBodies);

  console.log("[Server] savedBodies > ", savedBodies.length);
};

// Exports
exports.createBox = createBox;
exports.clear = clear;
exports.restore = restore;
