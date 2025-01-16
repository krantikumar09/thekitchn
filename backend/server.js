import express from "express";
import cors from "cors";

// app config
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("API working....");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
