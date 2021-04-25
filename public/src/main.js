// Create box composites
const boxWorld = Composite.create();
Composite.add(engine.world, boxWorld);

// create two boxes and a ground
Composite.add(boxWorld, Bodies.rectangle(400, 200, 80, 80));
Composite.add(boxWorld, Bodies.rectangle(450, 50, 80, 80));
Composite.add(engine.world, Bodies.rectangle(400, 610, 810, 60, { isStatic: true }));

// Run
Runner.run(runner, engine);

// Get the logs
function loop(_) {
  renderWorld();
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
