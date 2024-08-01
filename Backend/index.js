const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const homeRoute = require('./routes/home')
const userRoute = require('./routes/users');


const app = express();
const PORT = 4500;

//connections
mongoose.connect('mongodb://127.0.0.1:27017/vstream')
.then(()=>{console.log("MongoDB connected")})
.catch((e)=>{console.log(e)});

//Middlewares
app.use(cors());
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));



//Routes
app.use('/', homeRoute);
app.use('/user', userRoute); 


app.listen(PORT, ()=> console.log(`Listening from http://127.0.0.1:${PORT}`));