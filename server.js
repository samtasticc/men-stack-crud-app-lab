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
app.use(express.urlencoded({extended: false})) // this enables Express to access the data using middleware. if you dont use this, your POST route wont work


// ========= ROUTES ========= //
app.get('/', (req, res) => {
    // res.send('this is my planet route')
    res.render('index.ejs')
})

// this route will provide the list, or index, of all the planets our database has captured via our form.
app.get('/planets', async(req, res) => { // make this callback function async so we can use await.
    // res.send('Welcome to the index page')
    const allPlanets = await Planet.find({}) // this finds the data we are calling.
    console.log(allPlanets)
    res.render('planets/index.ejs', allPlanets) // this shows us the data, but only after we make our planets/index.ejs page.
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
    await Planet.create(req.body) // this adds the data we are collecting to our database. req.body contains the form data sent by the user. await ensures the database operation completes before the function continues.
    res.redirect('/planets/new') // sends us back/redirects us to the empty form on /planets/new
})
// ========= SERVER ========= //
app.listen(3000, () => {
    console.log('listening on port 3000')
})