// dont need to be vars we are never overriding the value
const mongoose = require('mongoose'); // connnecting to mongo
const express = require('express'); // building our middlewares (get, post etc..)
const bodyParser = require('body-parser'); // parsing all post requests

var User = require('./models/user.js');
var Studies = require('./models/studies.js');
var Schedule = require('./models/schedule.js');
var PartStudies = require('./models/part-studies.js');


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

// CUSTOM MIDDLEWARE
const checkAuth = require("./middleware/check-auth");

// pass the json parsing module as a functor for express to use on all requests
// if for some reason we want to limit the routeds being processed by body parser
// we can pass these as well
app.use(bodyParser.json());

// CORS FUNCTIONALITY
// what is cors? https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
app.use((req, res, next) => {
  // this means that no matter where the resources of the app are being sent too
  // those resources are given access
  res.setHeader("Access-Control-Allow-Origin", "*");

  // to grant special priveleges to certain domains we also specify domains which
  // have the following headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // finally we control which http words may be allowed to send requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

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
// note the addition of the check authentication
// function, to protect the creation of routes
// for all non authenticated users
app.post("/studies", checkAuth, (req, res, next) => {
  const studies = new Studies({
    title: req.body.title,
    description: req.body.description,
    approval: req.body.approval,
    creator: req.userData.email,
    start_time: req.body.start_time,
    end_time: req.body.end_time
  });

  // write the data to mongo using the
  // mongoose save method https://mongoosejs.com/docs/models.html
  // automatically written to the "Studies" collection
   studies.save();
  // console.log(studies);

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

// handles all read requests targeting localhost 3000/studies
// (or whatever port we have elected to use)
// TODO error handling
app.post('/oneStudy', (req, res, next) => {
  Studies.findOne({ title: req.body.title }).then( study => {
    return res.status(200).json({
      message: 'Succesfullly Found Study',
      studies: study
    })
  })
});


// write all of the user schedules to the backend
app.post('/scheduler', (req, res, next) => {
  const schedule = new Schedule({
    openings: req.body.openings,
    study_title: req.body.study_title,
    user_email: req.body.user_email
  });
  schedule.save();

  // to ensure no timeout we return a response (201 means success + resource created)
  return res.status(201).json({
    message: 'Schedule has been added'
  });

});

app.post('/allSchedule', (req, res, next) => {
  Schedule.find({ study_title : req.body.title })
    .then(documents => {
    return res.status(200).json({
      message: 'Succesfullly Found Schedule',
      schedules: documents
    });
  })
});

app.post('/partStudies', (req, res, next) => {
  const partStudy = new PartStudies({
    title: req.body.title,
    participants: req.body.participants
  });

  partStudy.save();

  return res.status(201).json({
    message: 'Participant Study has been added'
  });
});

app.get('/partStudies', (req,res, next) => {
  PartStudies.find()
    .then(documents => {
      return res.status(200).json({
        message: 'Participant studies fetched succesfully from the backend',
        curr_studies: documents,
        past_studies: documents
      });
    });
});

// handles all requests targeting localhost 3000/studies
// (or whatever port we have elected to use)
// TODO error handling
app.get('/my-studies', (req, res, next) => {
    Studies.find()
      .then(documents => {
        return res.status(200).json({
          message: 'Researcher studies fetched succesfully from the backend',
          curr_studies: documents,
          past_studies: documents
        });
      })
});

app.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const users = new User({
        email: req.body.email,
        password: hash,
        authentication: req.body.authentication
      });

      // write the data to mongo using the
      // mongoose save method https://mongoosejs.com/docs/models.html
      // automatically written to the "Studies" collection
      users.save()
        .then(result => {
          res.status(201).json({
            message: 'User has been created'
          })
        })
    });
})

app.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      return res.status(401).json({
        message: "Auth (1) failed"
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result){
      return res.status(401).json({
        message: "Auth (2) failed"
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email, userId: fetchedUser._id},
      'secret_this_should_be_longer',
      {expiresIn: "1h"}
    );
    res.status(200).json({
      token: token,
      status: fetchedUser.authentication,
      email: fetchedUser.email
    });
  })
  .catch(err => {
    return res.status(401).json({
      message: "Auth (3) failed"
    });
  });
});

// make the application visible to our server
module.exports = app;
