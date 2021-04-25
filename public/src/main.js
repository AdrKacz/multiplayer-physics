// create two boxes and a ground
const worldObjects = {}
worldObjects.boxA = Bodies.rectangle(400, 200, 80, 80);
worldObjects.boxB = Bodies.rectangle(450, 50, 80, 80);
worldObjects.ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, Object.values(worldObjects));

// Run
Runner.run(runner, engine);

// Get the logs
function loop(_) {
  renderWorld(worldObjects);
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
