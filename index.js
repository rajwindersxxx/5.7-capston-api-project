import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", async (req, res) => {
  res.render("today.ejs");
});
app.get("/find", (req, res) => {
  res.render("find.ejs");
});
// this block is for search the location 
app.post("/search", async (req, res) => {
  try {
    const searchCity = req.body["citySearch"];
    const response = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${searchCity}&count=10&language=en&format=json`
    );
    const result = response.data.results;
    res.render("find.ejs",{searchResult: result})
  } catch (error) {
    console.log(error.response.data);
  }
  res.render("find.ejs");
});
// this block save the selected location to the location.txt file as a array object
app.post("/submitLocation", async (req, res) => {
    try {
      const infoObject = {
        name: req.body["name"],
        city: req.body["city"],
        state: req.body["state"],
        latitude: req.body["latitude"],
        longitude: req.body["longitude"]
      }
      fs.writeFileSync(__dirname + "/data/location.json", JSON.stringify(infoObject));
      res.render("find.ejs", {message: "Location has been added"});
    } catch (error) {
      console.log(error);
    }
    res.render("find.ejs");
  });
app.get("/today", (req, res) => {
  res.render("today.ejs");
});
app.get("/hourly", (req, res) => {
  res.render("hour.ejs");
});
app.get("/monthly", (req, res) => {
  res.render("month.ejs");
});
app.get("/weekend", (req, res) => {
  res.render("weekend.ejs");
});
app.get("/radar", (req, res) => {
  res.render("radar.ejs");
});

app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});
function write(array, path) {
}
function read(path) {
  const fileContent = fs.readFileSync(path);
  const array = JSON.parse(fileContent);
  return array;
}