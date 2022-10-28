const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");

const reviewsRouter = require("./api/reviews")

const reservationsRouter = require("./api/reservations");

const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");
const knex = require("./database");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

app.use("/api/meals", mealsRouter);

app.use("/api/reviews", reviewsRouter);

app.use("/api/reservations", reservationsRouter);

app.get("/my-route", (req, res) => { res.send("Hi friend") });

app.get("/my-route", (req, res) => { res.send("Hi friend") });

//Respond with all meals in the future (relative to the when datetime)
app.get("/future-meals", async (req, res) => {
  try {
    const [dbResult] = await knex.raw("Select * from meal where `when` > NOW()");
    if(dbResult.length === 0) {
      res.status(400).send(`Future Meals are not available`);
    } else {
      res.send(dbResult);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Respond with all meals in the past (relative to the when datetime)
app.get("/past-meals", async (req, res) => {
  try {
    const [dbResult] = await knex.raw("Select * from meal where `when` < NOW()");
    if(dbResult.length === 0) {
      res.status(400).send(`Past Meals are not available`);
    } else {
      res.send(dbResult);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Respond with all meals sorted by ID
app.get("/all-meals", async (req, res) => {
  try {
    const [dbResult] = await knex.raw("Select * from meal order by id");
    if(dbResult.length === 0) {
      res.status(400).send(`No Meals are available`);
    } else {
      res.send(dbResult);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Respond with the first meal (meaning with the minimum id)
app.get("/first-meal", async (req, res) => {
  try {
    const [dbResult] = await knex.raw("Select * from meal order by id LIMIT 1");
    if(dbResult.length === 0) {
      res.status(400).send(`No Meals are available`);
    } else {
      res.json(dbResult[0]);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Respond with the last meal (meaning with the maximum id)
app.get("/last-meal", async (req, res) => {
  try {
    const [dbResult] = await knex.raw("Select * from meal order by id DESC LIMIT 1");
    if(dbResult.length === 0) {
      res.status(400).send(`No Meals are available`);
    } else {
      res.json(dbResult[0]);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal server error" });
  }
});


if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
