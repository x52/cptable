const express = require("express");
const db = require("./mongotest");
const server = express();
var cors = require('cors');
const mongoOp = require("./model")
const ffmpeg = require("fluent-ffmpeg");
const body_parser = require("body-parser");
const fs = require("fs");
const fileUpload = require("express-fileupload");
var multer  = require('multer');

var upload = multer({ dest: 'tmp/' });
const port = 4000;


// parse JSON (application/json content-type)

server.use(cors({origin: 'http://localhost:3000'}));

// parse application/x-www-form-urlencoded
server.use(body_parser.urlencoded({ extended: false }));

server.use(body_parser.json());
//support parsing of application/x-www-form-urlencoded post data

server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "C:/Users/Ankit/crowdpouch/server/tmp",
  })
);

ffmpeg.setFfmpegPath("C:/ffmpeg/bin/ffmpeg.exe");

ffmpeg.setFfprobePath("C:/ffmpeg/bin");

ffmpeg.setFlvtoolPath("C:/flvtool");

console.log(ffmpeg);

server.post("/convert", (req, res) => {

  
  //res.contentType(`video/${to}`);
  //res.attachment(`output.${to}`
   console.log('req is', req);
  let to = 'mp4'; //change
  let file = req.files.myFile;
  //console.log('what is',req);
  
  let fileName = `output.${to}`;
 // console.log(req.files);
  //console.log('req is',req);
 
 
  
  file.mv("tmp/" + file.name, function (err) {
    if (err) return res.sendStatus(500).send(err);
    console.log("File Uploaded successfully");
  });

  ffmpeg("tmp/" + file.name)
    .withOutputFormat(to)
    .on("end", function (stdout, stderr) {
      console.log("Finished");
      res.download(__dirname + fileName, function (err) {
        if (err) throw err;

        fs.unlink(__dirname + fileName, function (err) {
          if (err) throw err;
          console.log("File deleted");
        });
      });
      fs.unlink("tmp/" + file.name, function (err) {
        if (err) throw err;
        console.log("File deleted");
      });
    })
    .on("error", function (err) {
      console.log("an error happened: " + err.message);
      fs.unlink("tmp/" + file.name, function (err) {
        if (err) throw err;
        console.log("File deleted");
      });
    })
    .saveToFile(__dirname + fileName);
    
  //.pipe(res, { end: true });
});









//server.use(body_parser.json());


// << db setup >>

const dbName = "Cenus";
const collectionName = "City";

// << db init >>

db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
    // get all items
    dbCollection.find().toArray(function(err, result) {
        if (err) throw err;
          //console.log(result);
    });
    //Get List of cities
      server.get("/city", (request, response) => {
    dbCollection.find().toArray((error, result) => {
        if (error) throw error;
        response.json(result);
    });
});

//Get cities by max population
 server.get("/maxpop", (request, response) => {
    dbCollection.find().sort({pop:-1}).limit(25).toArray((error, result) => {
        if (error) throw error;
        response.json(result);
    });
});

//Sort as per field by ascending or descending
server.get("/filter/:fil", (req, res) => {
let val = req.params.fil;
console.log(val);
dbCollection.find().sort({pop:+1}).limit(5).toArray((error, result) => {
        if (error) throw error;
        res.json(result);
    });
});

//Pagination method

server.get('/c',(req,res) => {
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  console.log(pageNo,size);
  var query = {}
  if(pageNo < 0 || pageNo === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  // Find some documents
       mongoOp.find({},{},query,function(err,data) {
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
            console.log(data);
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
});


}, function(err) { // failureCallback
    throw (err);
});

//get all data:
server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});