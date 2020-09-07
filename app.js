// With Mongo CLient

const express = require("express");
const app = express();
const port = 4000;
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const dblink =
  "mongodb+srv://skele1:skele1@cluster0.csdcu.mongodb.net/COVID19_CASES";

// DB Name
const dbName = "COVID19_CASES";

// Creating new MongoClient
const client = new MongoClient(dblink);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.get("/covid19_cases", (req, res) => {
  // Stating the constants needed
  const db = client.db(dbName);
  const collection = db.collection("covid19_data");

  // Finding all the cases
  collection.find({}).toArray(async function (err, cases_list) {
    assert.equal(err, null);
    let cases = await cases_list;
    res.render("index.ejs", { stories: cases });
  });
});

app.get("/", (req, res) => {
  res.send("Hi Skele!");
});

// Connecting to server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("====================================");
  console.log("Connected successfully to Database");
  console.log("====================================");

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
