// Imports
const { Main, Actions } = require("./backend/main.js");
const { Sync } = require("./backend/sync.js");
const { Render } = require("./backend/rendering.js"); // [DEBUG]

// Modules
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

// Setup
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = 3000;

app.use("/static", express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  const fileName = path.join(__dirname, "public", "index.html");
  const options = {};
  res.sendFile(fileName, options, (err) => {
    if (err) {
      console.log("Unable to send: ", fileName);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Send: ", fileName);
    }
  });
});

// [DEBUG]
app.get('/server', (req, res) => {
  const fileName = path.join(__dirname, "public", "server-rendering.html");
  const options = {};
  res.sendFile(fileName, options, (err) => {
    if (err) {
      console.log("Unable to send: ", fileName);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Send: ", fileName);
    }
  });
});

io.on("connection", (socket) => {
  console.log("[\x1b[32m+\x1b[0m] User connected\x1b[33m", socket.id, "\x1b[0m");
  socket.on("disconnect", () => {
    console.log("[\x1b[31m-\x1b[0m] User disconnected\x1b[33m", socket.id, "\x1b[0m");
  });

  socket.on("action", (event) => {
    if (Actions[event.name] === undefined) {
      return;
    };
    const info = Actions[event.name](socket.id, event);
    io.emit("action", {
      ...event,
      server: info,
    });
  });
});

// [DEBUG] Socket Access
function SocketEmit(eventName, msg) {
  io.emit(eventName, msg);
};
Render(SocketEmit);
Sync(SocketEmit);

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
