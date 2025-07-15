import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to QuestsHub API");
});

export default app;
