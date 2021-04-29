const socket = io();

socket.on("server rendering", (world) => {
  const engine = {}
  engine.world = JSON.parse(world);
  console.log("[Render] World > ", engine.world);
  renderWorld();
});
