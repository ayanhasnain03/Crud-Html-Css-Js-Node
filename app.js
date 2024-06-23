import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { configDotenv } from "dotenv";
configDotenv({ path: "config/config.env" });
import connectDB from "./config/db.js";
import bodyParse from "body-parser";

connectDB();
// Setup __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import todoRoute from "./routes/todoRoute.js";
const app = express();
// Set view engine to EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", todoRoute);
app.get("/", (req, res) => {
  res.render("index");
});
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
