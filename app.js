const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const teacher = require('./Routes/teacher');
const student = require('./Routes/student');
const app = express();

//bodyparser middleware
app.use(bodyparser.urlencoded({'extended':false}));
app.use(bodyparser.json());

//DB instance
const db = require('./setup/mydatabase').USER;

//Mongodb Connect
mongoose.connect(db,{ useUnifiedTopology: true, useNewUrlParser: true }).then(()=>console.log("Connected to DB")).catch(err => console.log(err));

//testing route
app.get('/',(req,res)=>{
    res.send("Welcome to teachers database");
})

app.use('/api/teacher',teacher);
app.use('/api/student',student);

port=process.env.PORT||3000;

app.listen(port,()=>{
    console.log(`Port ${port} is running`);
})