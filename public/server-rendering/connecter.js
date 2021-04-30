const socket = io();

socket.on("server rendering", (world) => {
  renderWorld(JSON.parse(world));
});
