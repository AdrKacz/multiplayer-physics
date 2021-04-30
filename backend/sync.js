const { sync } = require("./main.js")

let syncId = undefined;
function Sync(emit) {
  syncId = setInterval((_) => {
    const JSONSync = sync();
    emit("client sync", JSONSync);
  }, 1000);
};

// Exports
exports.Sync = Sync;
