const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('files'));

app.get("/", async (req, response) => {
  response.sendFile(path.join(__dirname, "/files/html/index.html"));
});

app.listen(80, () => {
  console.log(`Server running on http://localhost:80`);
});