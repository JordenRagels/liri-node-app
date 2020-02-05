LIRI Bot


LIRI Bot is a node cli app that takes in parameters from the command line and uses those to make API calls to various services to get information and return it back for you by printing it out to the console.

Getting Started
Prerequisites
Spotify API Key

Needed for the node-spotify-api module for making calls to the Spotify API
Visit https://developer.spotify.com/my-applications/#!/ to sign-up (you can use your existing Spotify account or create a new one)
Copy the values down for the client id and client secret from an application you register. These will be used later.
Node installed on your local machine

Installing
Follow the instructions in this section to get the app setup to run on your machine.

Clone the git project to your machine

Install the node module dependencies from the package.json file

npm install
Create a .env file in the top level directory. This will contain the Spotify API keys you created in the Prerequisites section.

The contents of the .env file should look similar to below (replace everything to the right of the equals sign, including the carats <>):
# Spotify API keys

SPOTIFY_ID=<Replace with your spotify id>
SPOTIFY_SECRET=<Replace with your spotify secret>


Running the app


The app is executed on the command line using node. You will pass node the liri.js file and parameters that will control what LIRI Bot will do.

Usage
The syntax for calling the LIRI Bot on the command line is below:

node liri.js <Action to perform> <Thing to search for>

