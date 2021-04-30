// Import JSON safe serializer
const stringify = require("json-stringify-safe");

// Import Physics Engine
const Matter = require("matter-js");
const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;
const Common = Matter.Common;

const engine = Engine.create();
const runner = Runner.create();

// Fixed Random Seed [DEV]
Common._seed = 42;

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

// Return sync object
function SyncWorld() {
  const boxWorldSync = Common.map(Composite.allBodies(boxWorld), (body) => {
    return {
      position: body.position,
      velocity: body.velocity,
      angle: body.angle,
      angularVelocity: body.angularVelocity,
    }
  });
  return JSON.stringify({
    length: boxWorldSync.length,
    boxWorld: boxWorldSync,
  });
};

// Access for render [DEBUG]
function AccessWorld() {
  return stringify(Composite.allBodies(engine.world));
};

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

exports.sync = SyncWorld; // [Debug]
exports.access = AccessWorld; // [Debug]
