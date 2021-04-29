// Import Physics Engine
const Matter = require("matter-js");
const Composite = Matter.Composite;
const Bodies = Matter.Bodies;
const Common = Matter.Common;

// Create box on click
function createBox(boxWorld) {
  console.log("[Server] Create Box");
  Composite.add(boxWorld, Bodies.rectangle(Common.random(200, 600), Common.random(50, 200), 80, 80));
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
