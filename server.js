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
app.use(express.urlencoded({extended: false})) // this enables Express to access the data using middleware. if you dont use this, your POST wont work


// ========= ROUTES ========= //
app.get('/', (req, res) => {
    // res.send('this is my planet route')
    res.render('index.ejs')
})

app.get('/planets/new', (req, res) => {
    // res.send('this is my new page')
    res.render('planets/new.ejs')
})

app.post('/planets', async(req, res) => {
    // console.log(req.body)
    if(req.body.hasRing === 'on') {
        req.body.hasRing = true
    } else {
        req.body.hasRing = false
    } // the above if/else statement redefines the req.body 'on' to a boolean so it matches our schema better.
    console.log(req.body)
    if(req.body.hasMoon === 'on') {
        req.body.hasMoon = true
    } else {
        req.body.hasMoon = false
    } 
    if(req.body.innerPlanet === 'on') {
        req.body.innerPlanet = true
    } else {
        req.body.innerPlanet = false
    } 
    if(req.body.outerPlanet === 'on') {
        req.body.outerPlanet = true
    } else {
        req.body.outerPlanet = false
    } 
    await Planet.create(req.body)
    res.redirect('/planets/new')
})
// ========= SERVER ========= //
app.listen(3000, () => {
    console.log('listening on port 3000')
})