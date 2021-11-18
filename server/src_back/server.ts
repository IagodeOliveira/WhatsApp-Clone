import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(router);

app.use(express.static(path.join(__dirname, "../../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build/index.html"));
});

app.listen(PORT, () => {
  console.log("Runnig");
});
