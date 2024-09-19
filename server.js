// ========= IMPORTS ========= //
require('dotenv').config() // this imports and converts, it has to be the first line of code.
const express = require("express");
const mongoose = require('mongoose')
const app = express();
const methodOverride = require('method-override')
const morgan = require('morgan')
// ========= MONGOOSE ========= //
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

const Planet = require('./models/planets.js')// this imports the Planets model
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