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
app.use(methodOverride('_method')) // this envokes the methodOverride package we installed and imported. if you don't do this, your EDIT, UPDATE, and DELETE routes wont work.
app.use(morgan('dev)')) // this follows methodOverride


// ========= ROUTES ========= //
app.get('/', (req, res) => {
    // res.send('this is my planet route')
    res.render('index.ejs')
})

// this route will provide the list, or index, of all the planets our database has captured via our form.
app.get('/planets', async(req, res) => { // make this callback function async so we can use await.
    // res.send('Welcome to the index page')
    const allPlanets = await Planet.find() // this finds the data we are calling.
    console.log(allPlanets)
    res.render('planets/index.ejs', {planets: allPlanets}) // this shows us the data, but only after we make our planets/index.ejs page.
})

app.get('/planets/new', (req, res) => {
    // res.send('this is my new page')
    res.render('planets/new.ejs')
})

app.get('/planets/:planetId', async(req, res) => { // this will be our SHOW route
    const foundPlanet = await Planet.findById(req.params.planetId)
    // res.send(`this route renders the show page for planet id: ${req.params.planetId}`)
    res.render('planets/show.ejs', {planet: foundPlanet})
}) 

app.get('/planets/:planetId/edit', async(req, res) => {
    const foundPlanet = await Planet.findById(req.params.planetId)
    console.log(foundPlanet)
    // res.send(`This is the edit rout for ${foundPlanet.name}`)
    res.render('planets/edit.ejs', {planet: foundPlanet})
})

app.put('/planets/:planetId', async(req, res) => {
    if(req.body.hasRing === 'on') {
        req.body.hasRing = true
    } else {
        req.body.hasRing = false
    } // the above if/else statement redefines the req.body 'on' to a boolean so it matches our schema better.
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
    await Planet.findByIdAndUpdate(req.params.planetId, req.body)
    res.redirect(`/planets/${req.params.planetId}`)
})

app.delete('/planets/:planetId', async(req, res) => {
    // res.send('this is the delete route')
    // with GET we RENDER, with everything else, we REDIRECT
    await Planet.findByIdAndDelete(req.params.planetId)
    res.redirect('/planets')
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
    res.redirect('/planets') // sends us back/redirects us to the empty form on /planets/new - then we changed it to redirect to the index (/planets)
})
// ========= SERVER ========= //
app.listen(3000, () => {
    console.log('listening on port 3000')
})