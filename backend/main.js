const Actions = {
  "clear": (socketId, _) => {
    console.log("\x1b[33m", socketId, "\x1b[0m: Clear");
  },
  "restore": (socketId, _) => {
    console.log("\x1b[33m", socketId, "\x1b[0m: Restore");
  },
  "createBox": (socketId, _) => {
    console.log("\x1b[33m", socketId, "\x1b[0m: Create Box");
  },
};

exports.Main = () => {
  console.log('BackEnd Main');
};

exports.Actions = Actions;
