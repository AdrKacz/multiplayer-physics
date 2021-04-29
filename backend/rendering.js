let renderId = undefined;

function accepted(key, type) {
  // Excludes
  if (key === "parts") {
    return false;
  } else if (key === "vertices") {
    return false;
  } else if (key === "parent") {
    return false;
  }

  // General rules
  if (key === "") {
    return true;
  } else if (typeof Number(key) === "number") {
    return true;
  };

  // Leaf types
  switch (type) {
    case "string":
      return true;
    case "number":
      return true;
    default:
      return false;
  };
};

function Render(emit) {
  renderId = setInterval((_) => {
    const { world } = require("./main.js");
    const currentWorld = world();
    const JSONCurrentWorld = JSON.stringify(currentWorld, (key, value) => {
      if (accepted(key, typeof value)) {
        return value;
      };
      return undefined;
    });

    console.log("[Render] World Count > ", currentWorld.length);
    emit("server rendering", JSONCurrentWorld);
  }, 1000);
};

// Exports
exports.Render = Render;
