const { world } = require("./main.js");

let renderId = undefined;
function Render(emit) {
  renderId = setInterval((_) => {
    const JSONCurrentWorld = world();
    emit("server rendering", JSONCurrentWorld);
  }, 100);
};

// Exports
exports.Render = Render;
