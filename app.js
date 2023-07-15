const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require('multer');
const form = multer({ dest: 'views/uploads/' })
const path = require("path");
const fs = require("fs");



app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const homecontent = "This is the home page";
const displaycontent = "The uploaded file can be viewed here";

app.get("/form", function (req, res) {
  res.render("form");
});

app.post("/form",form.single('uploadfile'), function (req, res) {
  console.log("post method")
  if (!req.file) {
    res.status(400).send('No file uploaded');
    return;
  }

  const filePath = req.file.path;

  
  fs.readFile(filePath, 'utf-8', (err, data) => {                    // Read the file contents
    if (err) {
      console.error(err);
      res.status(500).send('Error reading the file');
      return;
    }                                                             // Process the file contents

                                                               
    console.log(data);                                          // Display the file contents

    
    const lines = data.split('\n');                            // Parse the file contents as needed, Example: Splitting the contents by lines
   
    res.render("display",{cont:lines}) // Display an array of lines

    // Do whatever parsing or processing you need with the file contents

    // Send a response back to the client
    res.send('File uploaded and processed successfully!');
  });
       
});





app.use("/", function (req, res) {
  res.render("home", { hc: homecontent });
});

app.listen(3001, function () {
  console.log("Server started on port 3001");
});
