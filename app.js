const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "./public")));

app.get('/', (req, res) => {
  const fileName = "./public/index.html";
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
