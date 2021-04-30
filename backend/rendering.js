const { world } = require("./main.js");



// function accepted(key, type) {
//   // Excludes
//   if (key === "parts") {
//     return false;
//   } else if (key === "vertices") {
//     return false;
//   } else if (key === "parent") {
//     return false;
//   }
//
//   // General rules
//   if (key === "") {
//     return true;
//   } else if (typeof Number(key) === "number") {
//     return true;
//   };
//
//   // Leaf types
//   switch (type) {
//     case "string":
//       return true;
//     case "number":
//       return true;
//     default:
//       return false;
//   };
// };

let renderId = undefined;
function Render(emit) {
  renderId = setInterval((_) => {
    const JSONCurrentWorld = world();
    // const JSONCurrentWorld = JSON.stringify(currentWorld, (key, value) => {
    //   if (accepted(key, typeof value)) {
    //     return value;
    //   };
    //   return undefined;
    // });
    emit("server rendering", JSONCurrentWorld);
  }, 100);
};

// Exports
exports.Render = Render;
