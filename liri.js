// DEPENDENCIES ==========================================


// Require .env file (Reads environment variables)
require("dotenv").config();

// require request

const request = require("request");

// requrie moment

const moment = require("moment");

//require  file systems

const fs = require("fs");

// import api keys files
const keys = require("./keys.js");

// initialize spotify

// require axios package
const axios = require("axios")

const Spotify = require("node-spotify-api");
//const spotify = new Spotify(keys.spotify);

// OMBD and Bands in Town API's

//let omdb = (keys.spotify);
//let bandsInTown = (keys.bandsInTown);

// FUNCTIONS =================================================

// Function for calling bands in town api
function concertThis (artist) {
    console.log(`Searching for ${artist}'s next show`);
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(res => {
        console.log(res.data)
    }).catch(err =>{
        console.error(err)
    })
    console.log('Documenation for bandsInTown API: https://app.swaggerhub.com/apis-docs/Bandsintown/PublicAPI/3.0.0')
}

// Function for calling spotify API
function spotifyThisSong() {
    console.log('API Call to Spotify: see https://www.npmjs.com/package/node-spotify-api')
}

// Function for omdb API
function movieThis() {}


// Function to determine which command is executed
function runLiri (userCommand, userQuery) {

    switch (userCommand) {
    case "concert-this":
        concertThis(userQuery);
        break;
    case "spotify-this":
        spotifyThisSong(userQuery);
        break;
    case "movie-this":
        movieThis(userQuery);
        break;
    case "do-this":
        doThis();
        break;
    default:
        console.log(`I don't understand`);
        break;
    } 
}

runLiri(process.argv[2], process.argv.slice(3).join(" "));
























