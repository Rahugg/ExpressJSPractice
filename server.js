const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); 
app.use(bodyParser.json());

app.get("/data", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading data file");
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.render("index", { data: jsonData });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error parsing JSON data");
    }
  });
});

app.post('/data', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data file');
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      const newData = req.body;

      jsonData.push(newData);

      fs.writeFile('data.json', JSON.stringify(jsonData), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error writing to data file');
          return;
        }
        res.status(201).send('Data added successfully');
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error parsing JSON data');
    }
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
