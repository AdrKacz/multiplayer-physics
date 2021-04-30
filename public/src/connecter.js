const socket = io();

function restoreWorld(sync) {
  console.error("Restore World Not Implemented");
  return;
};

function syncWorld(sync) {
  if (sync.length === undefined || sync.boxWorld === undefined) {
    console.error("Sync Request Invalid");
    return;
  };
  const allBodies = Composite.allBodies(boxWorld);
  if (allBodies.length !== sync.length) {
    console.warn("Sync Request too different from Client.\nNeed to Restore");
    restoreWorld(sync);
    return;
  };

  sync.boxWorld.forEach((body, i) => {
    Body.setPosition(boxWorld.bodies[i], body.position);
    Body.setVelocity(boxWorld.bodies[i], body.velocity);
    Body.setAngle(boxWorld.bodies[i], body.angle);
    Body.setAngularVelocity(boxWorld.bodies[i], body.angularVelocity);
  });
};


socket.on("client sync", (sync) => {
  syncWorld(JSON.parse(sync));
});
