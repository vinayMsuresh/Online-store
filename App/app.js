const express = require('express');
const cors = require('cors');
const db = require('./db/connectDB');
const mongoose = require('mongoose');
const port = 8899;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
const neostoreRoutes = require('./routes/neostoreRoutes');
app.use('/api',neostoreRoutes);
db();


app.listen(port,(err)=>{
    if(err) throw err;
    console.log(`Working on ${port}`);
})