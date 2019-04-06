// dont need to be vars we are never overriding the value
const mongoose = require('mongoose'); // connnecting to mongo
const express = require('express'); // building our middlewares (get, post etc..)
const bodyParser = require('body-parser'); // parsing all post requests

var User = require('./models/user.js');
var Studies = require('./models/studies.js')

const app = express();

// pass the json parsing module as a functor for express to use on all requests
// if for some reason we want to limit the routeds being processed by body parser
// we can pass these as well
app.use(bodyParser.json());

// CORS FUNCTIONALITY
// what is cors? https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
//
app.use((req, res, next) => {
  // this means that no matter where the resources of the app are being sent too
  // those resources are given access
  res.setHeader("Access-Control-Allow-Origin", "*");

  // to grant special priveleges to certain domains we also specify domains which
  // have the following headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // finally we control which http words may be allowed to send requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  )
  next();
})

// Connect to MongoDB
// password: abc, db name: meanstack
// TODO improve error handling
mongoose
  .connect(
    'mongodb+srv://mahima:abc@meanstack-llgep.mongodb.net/meanstack?retryWrites=true'
  )
  .then(() => {
    console.log("---------------------")
    console.log("Connected to database!");
    console.log("---------------------")
  })
  .catch(() => {
    console.log("---------------------")
    console.log("Connection failed!");
    console.log("---------------------")
});

// handles all write requests to the database
// from the url localhost 3000/studies
// TODO error handling
app.post("/studies", (req, res, next) => {
  const studies = new Studies({
    title: req.body.title,
    study: req.body.study,
    description: req.body.description,
    time: req.body.time,
    approval: req.body.approval
  });
  // write the data to mongo using the
  // mongoose save method https://mongoosejs.com/docs/models.html
  // automatically written to the "Studies" collection
  studies.save();
  console.log(studies);

  // to ensure no timeout we return a response (201 means success + resource created)
  return res.status(201).json({
    message: 'Study has been added'
  });
});

// handles all read requests targeting localhost 3000/studies
// (or whatever port we have elected to use)
// TODO error handling
app.get('/studies', (req, res, next) => {
  // using mongoose this will simply return all of the in the
  // studies collection
  Studies.find()
    .then(documents => {
      console.log(documents);

      // 200 status code used to indicate success
      // this task is asynchronous therefore it MUST
      // be in the then block or we will try and
      // return something we do not have yet
      return res.status(200).json({
        message: 'Studies fetched succesfully from the backend',
        studies: documents
      });
    });


});

// handles all requests targeting localhost 3000/studies
// (or whatever port we have elected to use)
// TODO error handling
app.get('/my-studies', (req, res, next) => {
  Studies.find()
    .then(documents => {
      console.log(documents);

      // 200 status code used to indicate success
      // this task is asynchronous therefore it MUST
      // be in the then block or we will try and
      // return something we do not have yet
      return res.status(200).json({
        message: 'Curr studies fetched succesfully from the backend',
        curr_studies: documents,
        past_studies: documents
      });
    });
});

// make the application visible to our server
module.exports = app;
