canvas.addEventListener("click", (event) => {
  socket.emit("action", {
    name: "createBox",
  });

  // createBox();
});

document.querySelector("button#clear").addEventListener("click", (_) => {
  socket.emit("action", {
    name: "clear",
  });

  // clear();
});

document.querySelector("button#restore").addEventListener("click", (_) => {
  socket.emit("action", {
    name: "restore",
  });

  // restore();
});

document.addEventListener("keyup", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  };
  if (event.key !== "c") {
    return;
  };

  socket.emit("action", {
    name: "clear",
  });
  // clear();
});

document.addEventListener("keyup", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  };
  if (event.key !== "r") {
    return;
  };

  socket.emit("action", {
    name: "restore",
  });
  // restore();
});
