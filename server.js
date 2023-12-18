const express = require("express");
const app = express();
require("dotenv").config();

const jobList = require("./DUMMY");

const port = process.env.PORT;
// Define a route to serve the JSON data
app.get("/api/jobs", (req, res) => {
  res.json(jobList);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
