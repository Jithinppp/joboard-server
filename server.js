// libs
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");

const Job = require("./jobs");

// using all items
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
mongoose.connect(process.env.DB_URI);

// vars
const port = process.env.PORT;

// Define a route to serve the JSON data
app.get("/api/jobs", async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;

  const result = {
    data: [],
  };

  if (endIdx < (await Job.countDocuments().exec())) {
    result.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIdx > 0) {
    result.previous = {
      page: page - 1,
      limit,
    };
  }
  // for paginated query (both limit and page required)
  if (page && limit) {
    result.data = await Job.find().limit(limit).skip(startIdx).exec();
  }
  // for no query response
  if (!limit && !page) {
    result.data = await Job.find();
  }
  res.json(result);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
