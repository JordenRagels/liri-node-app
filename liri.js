// DEPENDENCIES ==========================================
// Require .env file (Reads environment variables)
require('dotenv').config()
// import api keys files
const keys = require('./keys.js')
// require request
const request = require('request')
// requrie moment
const moment = require('moment')
//require  file systems
const fs = require('fs')
// initialize spotify
// require axios package
const axios = require('axios')
const Spotify = require('node-spotify-api')
var spotify = new Spotify(keys.spotify)
//const spotify = new Spotify(keys.spotify);
// OMBD and Bands in Town API's
//let omdb = (keys.spotify);
//let bandsInTown = (keys.bandsInTown);
const log = console.log
// FUNCTIONS =================================================
// BANDS IN TOWN API
function concertThis(artist) {
	// command will look like this "node liri.js concert-this '<artist name here>'"
	// This will search for bandsintown API for an artist the user supplies and return the following information:
	console.log(`Searching for ${artist}'s next show`)
	var queryURL =
		'https://rest.bandsintown.com/artists/' +
		artist +
		'/events?app_id=codingbootcamp'
	axios
		.get(queryURL)
		.then(res => {
			// USE RES.DATA + for loop or forEach method to display 10 results containing:
			// 1) Name of the venue
			// 2) Venue location
			// 3) Date of the event (use moment.js to format the date to display MM//DD/YYYY)
			// Moment.js docs: https://momentjs.com/docs/#/parsing/string-format/
			var jsonData = res.data
			for (i = 0; i < jsonData.length; i++) {
				log(
					'\nName: ' +
						artist +
						'\n' +
						'Venue: ' +
						jsonData[i].venue.name +
						'\n' +
						'Location: ' +
						jsonData[i].venue.city +
						', ' +
						jsonData[i].venue.region +
						'\n' +
						'Date: ' +
						moment(jsonData[i].datetime).format('MMMM Do YYYY') +
						'\n' +
						'-----------------------------------------------------------------------'
				)
			}
		})
		.catch(function(error) {
			log(error)
		})
	// console.log('Documenation for bandsInTown API: https://app.swaggerhub.com/apis-docs/Bandsintown/PublicAPI/3.0.0')
}
// SPOTIFY API
function spotifyThisSong(songTitle) {
	// command will look like this: "node liri.js spotify-this-song '<song name here>"
	// If no songTitle is provided, make the default be "The Sign" (you can use an if statement to do this)
	// Use example provided to search for a song
	// You will need to use PROCESS.ENV.SPOTIFY_ID & PROCESS.ENV.SPOTIFY_SECRET in your request to the API
	// In the data object returned from the call:
	// 1) Display artist(s)
	// 2) The song's name
	// 3) The album the song is from
	spotify
		.search({
			type: 'track',
			query: songTitle
		})
		.then(function(response) {
			var song = response.tracks.items
			for (var i = 0; i < song.length; i++) {
				log(
					'Result ' +
						i +
						'\n' +
						'Track: ' +
						song[i].name +
						'\n' +
						'Artist(s): ' +
						song[i].artists.map(getArtistNames) +
						'\n' +
						'URL: ' +
						song[i].href +
						'\n' +
						'Album: ' +
						song[i].album.name +
						'\n' +
						'-----------------------------------------------------------'
				)
			}
		})
		.catch(function(err) {
			log(err)
		})
}
// getArtistNames helper function
var getArtistNames = function(artist) {
	return artist.name
}
​
// OMDB API
function movieThis(movieTitle) {
	// command will look like this "node liri.js movie-this '<movie title here>'"
	// if the user doesn't provide a movieTitle, let the default be "Mr. Nobody" (you can use an if statement to do this)
	// use axios package to make a call to the http://www.omdbapi.com/ (API KEY will be trilogy)
	// This code will look similar the concert this function (the queryUrl will be different)
	// In the response object, find this data and display it in the console.log:
	// * Title of the movie
	// * Year the movie came out
	// * IMDB Rating of the movie
	// * Rotten Tomatoes Rating of the movie
	// * Country where the movie was produced
	// * Language of the movie
	// * Plot of the movie
	// * Actors in the movie
​
	if (movieTitle === undefined) {
		movieTitle = 'Mr Nobody'
	}
	var queryUrl =
		'http://www.omdbapi.com/?t=' +
		movieTitle +
		'&y=&plot=full&tomatoes=true&apikey=trilogy'
	axios
		.get(queryUrl)
		.then(function(response) {
			var movie = response.data
			log(movie)
			log(
				'\nTitle: ' +
					movie.Title +
					'\n' +
					'Year: ' +
					movie.Year +
					'\n' +
					'IMDB Score: ' +
					movie.imdbRating +
					'\n' +
					'Rotten Tomatoes Rating: ' +
					movie.tomatoRating +
					'\n' +
					'Country: ' +
					movie.Country +
					'\n' +
					'Language: ' +
					movie.Language +
					'\n' +
					'Plot: ' +
					movie.Plot +
					'\n' +
					'Actors: ' +
					movie.Actors +
					'\n',
				'----------------------------------------------------------------------------------------------'
			)
		})
		.catch(function(error) {
			log(error)
		})
}
​
// Function to take in a command via fs package and random.txt file
function doThis() {
	// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
	// https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback (You will need to use this method)
	// Then call runLiri() <---- plug in the response from fs.readFile method into this function call
	fs.readFile('random.txt', 'utf8', function(error, data) {
		if (error) {
			return log(error)
		}
		// console.log(colors.body(data));
		var dataArray = data.split(',')
		if (dataArray.length === 2) {
			runLiri(dataArray[0], dataArray[1])
		} else if (dataArray.length === 1) {
			runLiri(dataArray[0])
		}
	})
}
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
​
// Function to determine which command is executed
function runLiri(userCommand, userQuery) {
	switch (userCommand) {
		case 'concert-this':
			concertThis(userQuery)
			break
		case 'spotify-this':
			spotifyThisSong(userQuery)
			break
		case 'movie-this':
			movieThis(userQuery)
			break
		case 'do-this':
			doThis()
			break
		default:
			log(`I don't understand`)
			break
	}
}
​
runLiri(process.argv[2], process.argv.slice(3).join(' '))