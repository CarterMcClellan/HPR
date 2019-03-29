var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var auth = require('./auth');
var jwt = require('jwt-simple');



const port = 3000;
var User = require('./models/user.js');
var Post = require('./models/studies.js')


app.use(cors());
app.use(bodyParser.json())



mongoose.connect('mongodb+srv://mahima:abc@meanstack-llgep.mongodb.net/meanstack?retryWrites=true', { useNewUrlParser: true }, (err)=>{
    if(!err){
        console.log('Connected to Mongo Database');
    }
})

app.use('/auth',auth)
app.listen(port);