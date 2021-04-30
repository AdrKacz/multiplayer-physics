// Create box on click
function createBox(event) {
  console.log("Create Box", event);

  if (event?.server?.x === undefined || event?.server?.y === undefined) {
    console.error("Event Invalid");
  }

  Composite.add(boxWorld, Bodies.rectangle(event.server.x, event.server.y, 80, 80));
};

// Set clear and restore action
let savedBodies = undefined;
function clear(event) {
  console.log("Clear Boxes", event);
  savedBodies = Composite.allBodies(boxWorld);
  Composite.clear(boxWorld);
};

function restore(event) {
  if (savedBodies === undefined) {
    return;
  };
  console.log("Restore Boxes", event);
  Composite.clear(boxWorld);
  Composite.add(boxWorld, savedBodies);
};

const Actions = {
  createBox: createBox,
  clear: clear,
  restore: restore,
};
