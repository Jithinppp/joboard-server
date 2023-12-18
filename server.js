const express = require("express");
const app = express();
const port = 3000;
const jobList = require("./DUMMY");

// Define a route to serve the JSON data
app.get("/api/data", (req, res) => {
  res.json(jobList);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
