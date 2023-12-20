const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

const { DATA } = require("./DUMMY");

const port = process.env.PORT;
// Define a route to serve the JSON data
app.get("/api/jobs", (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;

  const result = {
    data: [],
  };

  if (endIdx < DATA.length) {
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
    result.data = DATA.slice(startIdx, endIdx);
  }
  // for no query response
  if (!limit && !page) {
    result.data = DATA;
  }
  res.json(result);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
