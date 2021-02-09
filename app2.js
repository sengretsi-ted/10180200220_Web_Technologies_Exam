const express = require('express');
const mongoose = require('mongoose');
const userModel = require('../web_tech_exam/models/user')
//setting up the express app
const app2 = express();

app2.use(express.static(__dirname + '/views'));
app2.set('view engine', 'ejs');

app2.use(express.json());

app2.use(express.urlencoded({extended: true}));

//connecting to the database
mongoose.connect('mongodb+srv://acity:webtech@exams.xrbci.mongodb.net/ted', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
        console.log('Server started!');
    })
    .catch(()=>{
        console.log('Error connecting to Database')
})


app2.get('/', (req, res)=>{
    res.render('index.ejs');
})

app2.get('/complaints', (req, res)=>{
    res.render('complaints.ejs');
})

//creating placeholders for the data 
app2.post('/complaints', (req,res)=>{
    const userComplaint = userModel({
        name: req.body.name,
        email: req.body.email,
        complaint: req.body.textarea
    })
    userComplaint.save().then((document)=>{
        console.log(document);
    })
    res.render('complaints.ejs');

})

app2.get('/data', (req, res)=>{
    userModel.find({}, function(err, user_complaints){
        res.render('data.ejs', {
            userComplaints: user_complaints
        })
    })  
})

app2.listen(8080)
