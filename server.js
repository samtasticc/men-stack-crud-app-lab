// ========= IMPORTS ========= //
require('dotenv').config() // this imports and converts, it has to be the first line of code.
const express = require("express");
const mongoose = require('mongoose')
const app = express();
// ========= MONGOOSE ========= //



// ========= MIDDLEWARE ========= //



// ========= ROUTES ========= //
app.get('/', (req, res) => {
    // res.send('this is my planet route')
    res.render('index.ejs')
})

// ========= SERVER ========= //
app.listen(3000, () => {
    console.log('listening on port 3000')
})