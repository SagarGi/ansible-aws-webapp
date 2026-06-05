// This is a simple server that is used for just demo purpose
const express = require("express");
const os = require("os");
const app = express();

app.get("/", (req, res) => {
  res.send(`Hello! You were served by ${os.hostname()}`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
