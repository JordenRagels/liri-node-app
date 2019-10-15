// DEPENDENCIES ==========================================

const chalk = require('chalk');
const log = console.log;
// Require .env file (Reads environment variables)
require("dotenv").config();

const cTable = require('console.table');

// import api keys files
const keys = require("./keys.js");

// require request

const request = require("request");

// requrie moment

const moment = require("moment");

//require  file systems

const fs = require("fs");

// initialize spotify

// require axios package
const axios = require("axios")

const Spotify = require("node-spotify-api");
//const spotify = new Spotify(keys.spotify);

// OMBD and Bands in Town API's

//let omdb = (keys.spotify);
//let bandsInTown = (keys.bandsInTown);

// FUNCTIONS =================================================

// BANDS IN TOWN API
function concertThis(artist) {
    // command will look like this "node liri.js concert-this '<artist name here>'"
    // This will search for bandsintown API for an artist the user supplies and return the following information:
    log(`Searching for ${artist}'s next show`);
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(res => {
        // USE RES.DATA + for loop or forEach method to display 10 results containing:
        // 1) Name of the venue
        res.data.forEach(element => {
            log('                           ');
            log(chalk.blue(`VENUE: `+ element.venue.name));
            log(`LOCATION: ` + element.venue.city + ', ' + element.venue.region);
            log(moment(element.datetime).format('MMMM Do YYYY'));
            log('==================================================')
        });
        // 2) Venue location
        // 3) Date of the event (use moment.js to format the date to display MM//DD/YYYY)
        // Moment.js docs: https://momentjs.com/docs/#/parsing/string-format/
       //console.log(res.data)
    }).catch(err => {
        error(err)
    })
    log('Documenation for bandsInTown API: https://app.swaggerhub.com/apis-docs/Bandsintown/PublicAPI/3.0.0')
    
}

// SPOTIFY API
function spotifyThisSong(songTitle) {
    // command will look like this: "node liri.js spotify-this-song '<song name here>"
    // If no songTitle is provided, make the default be "Mr.Nobody" (you can use an if statement to do this)
    log('API Call to Spotify: see https://www.npmjs.com/package/node-spotify-api')
    // Use example provided to search for a song
    // You will need to use PROCESS.ENV.SPOTIFY_ID & PROCESS.ENV.SPOTIFY_SECRET in your request to the API
    // In the data object returned from the call:
    // 1) Display artist(s)
    // 2) The song's name
    // 3) The album the song is from
}

// OMDB API
function movieThis(movieTitle) {
    // command will look like this "node liri.js movie-this '<movie title here>'"
    // if the user doesn't provide a movieTitle, let the default be "Mr. Nobody" (you can use an if statement to do this)
    // use axios package to make a call to the http://www.omdbapi.com/ (API KEY will be trilogy)
    // This code will look similar the concert this function (the queryUrl will be different)
    // In the response object, find this data and display it in the log:
    // * Title of the movie
    // * Year the movie came out
    // * IMDB Rating of the movie
    // * Rotten Tomatoes Rating of the movie
    // * Country where the movie was produced
    // * Language of the movie
    // * Plot of the movie
    // * Actors in the movie

}

// Function to take in a command via fs package and random.txt file
function doThis() {
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    // https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback (You will need to use this method)
    // Then call runLiri() <---- plug in the response from fs.readFile method into this function call

    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
}


// Function to determine which command is executed
function runLiri(userCommand, userQuery) {

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
            log(`I don't understand`);
            break;
    }
}

runLiri(process.argv[2], process.argv.slice(3).join(" "));









