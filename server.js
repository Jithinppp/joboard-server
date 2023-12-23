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

// 1 single job collection
app.get("/api/job/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  const result = {};
  try {
    const singleJob = await Job.findById(id);
    result.data = singleJob;
    res.send(result);
  } catch (error) {
    res.status(500).send({ error, msg: "Error No job found!" });
  }
});

// 2 limit only
app.get("/api/jobs/get-few", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const result = {
    data: [],
  };
  if (limit) {
    try {
      const data = await Job.find().limit(limit);
      result.data = data;
      console.log("limit only");
      res.send(result);
    } catch (error) {
      res.status(500).send({ error, msg: "Error can't fetch jobs with limit" });
    }
  }
});

// 3 jobs collection with pagination
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
    try {
      result.data = await Job.find().limit(limit).skip(startIdx).exec();
      res.json(result);
    } catch (error) {
      res.status(500).send({ error, msg: "Error can't fetch jobs with limit" });
    }
  }
});

// 4 jobs collection with queryStr
app.get("/api/jobs/search", async (req, res) => {
  // query strings
  const q = req.query.q;
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);

  // console.log(q, limit, page);

  // pagination numbers
  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;

  const result = {
    data: [],
  };

  if (q && limit && page) {
    try {
      const data = await Job.find({
        title: { $regex: "^" + q, $options: "i" },
      })
        .limit(limit)
        .skip(startIdx);
      // add data to object
      if (data.length <= 0) {
        throw new Error("No jobs found");
      }
      result.data = data;
      // check object positions to set pagination vals
      console.log(endIdx, data.length);
      if (
        endIdx <
        (await Job.find({
          title: { $regex: "^" + q, $options: "i" },
        }).countDocuments())
      ) {
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
      res.send(result);
    } catch (error) {
      res
        .status(500)
        .send({ error, msg: "Error occurred no such a item or no query" });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

// 1 get a single job collection:   /api/job/d7440dc6-7abb-4702-bec9-7c646b3082ab ✅
// 2 get limited number of jobs collection (no pagination):   /api/jobs?limit=10 ✅
// 3 get jobs collection with pagination (page=1,2,3....):   /api/jobs?limit=10&page=1 ✅
// 4 get jobs collection with queryStr (page=1,2,3....):   /api/jobs?q=hr&limit=10&page=1 ✅
