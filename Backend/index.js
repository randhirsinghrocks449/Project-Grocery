const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router= require('./routes/groceryRoutes');



mongoose.connect('mongodb://localhost:27017/groceries_database', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

app.use(express.json());

app.use('/grocery',router);

app.listen('8000', () => {
    console.log("Server is Running 8000");
})