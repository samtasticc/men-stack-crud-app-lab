const mongoose = require('mongoose') // we do this here like we did in server.js so mongoose reads both files

const planetSchema = new mongoose.Schema({
    name: String,
    hasRing: Boolean,
    hasMoon: Boolean,
    innerPlanet: Boolean,
    outerPlanet: Boolean,
})

//this will register Planet
const Planet = mongoose.model('Planet', planetSchema) // using an uppercase letter at the beginning is how we create the module

// exports the module into server.js
module.exports = Planet