import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=> {
    res.render("today.ejs");
})
app.get("/today", (req, res)=> {
    res.render("today.ejs");
})
app.get("/hourly", (req, res)=> {
    res.render("hour.ejs");
})
app.get("/monthly", (req, res)=> {
    res.render("month.ejs");
})
app.get("/weekend", (req, res)=> {
    res.render("weekend.ejs");
})
app.get("/radar", (req, res)=> {
    res.render("radar.ejs");
})
app.get("/find", (req, res)=> {
    res.render("find.ejs");
})
app.listen(port , () =>{
    console.log(`server is running on localhost:${port}`)
})