// Import Physics Engine
const Matter = require("matter-js");
const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;

const engine = Engine.create();
const runner = Runner.create();

// === Init ===

// Create box composites
const boxWorld = Composite.create();
Composite.add(engine.world, boxWorld);

// create two boxes and a ground
Composite.add(boxWorld, Bodies.rectangle(400, 200, 80, 80));
Composite.add(boxWorld, Bodies.rectangle(450, 50, 80, 80));
Composite.add(engine.world, Bodies.rectangle(400, 610, 810, 60, { isStatic: true }));

// Run
Runner.run(runner, engine);

// Access for render [DEBUG]
function AccessWorld() {
  return Composite.allBodies(engine.world);
}

// Define Action
const DefinedActions = require("./actions.js");
const Actions = {
  "clear": (socketId, _) => {
    console.log("\x1b[33m", socketId, "\x1b[0m: Clear");
    DefinedActions.clear(boxWorld);
    console.log("[Server] World Count > ", Composite.allBodies(engine.world).length); // [Debug]
  },
  "restore": (socketId, _) => {
    console.log("\x1b[33m", socketId, "\x1b[0m: Restore");
    DefinedActions.restore(boxWorld);
    console.log("[Server] World Count > ", Composite.allBodies(engine.world).length); // [Debug]
  },
  "createBox": (socketId, _) => {
    console.log("\x1b[33m", socketId, "\x1b[0m: Create Box");
    DefinedActions.createBox(boxWorld);
    console.log("[Server] World Count > ", Composite.allBodies(engine.world).length); // [Debug]
  },
};

exports.Main = () => {
  console.log('BackEnd Main');
};

exports.Actions = Actions;

exports.world = AccessWorld; // [Debug]
