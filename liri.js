require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var spotify = new Spotify(keys.spotify);


var bandShows = function () {
    var artist = process.argv.slice(3).join(" ");

    var bandUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios
        .get(bandUrl)
        .then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var venue = response.data[i].venue.name;
                var state = response.data[i].venue.city;
                var country = response.data[i].venue.country;
                var mTime = moment(JSON.stringify(response.data[i].datetime), "YYYY-MM-DDTHH:ss");
                var mData = mTime.format("MM/DD/YYYY")
            }
            console.log(venue + "\n" + state + "\n" + country + "\n" + mData);

        })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}


var movieStuff = function () {

    var movies = process.argv.slice(3).join(" ");

    axios
        .get("http://www.omdbapi.com/?t=" + movies + "&y=&plot=short&apikey=trilogy")
        .then(
            function (response) {
                var title = response.data.Title;
                var year = response.data.Year;
                var imbd = response.data.imdbRating;
                var rottenT = response.data.Ratings[1].Value;
                var country = response.data.Country;
                var lang = response.data.Language;
                var plot = response.data.Plot;
                var actors = response.data.Actors;
                console.log(title + "\n" + year + "\n" + imbd + "\n" + rottenT + "\n" + country + "\n" + lang + "\n" + plot + "\n" + actors)

            })
        .catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log("Error", error.message);
            }
            console.log(error.config);
        });

}


var musicStuff = function () {

    var music = process.argv.slice(3).join(" ");

    spotify

        .search({
            type: 'track',
            query: music
        })
        .then(function (response) {
        


            var spotArtist = response.tracks.items[0].artists[0].name;
            var spotSong = response.tracks.items[1].name;
            var spotLink = response.tracks.items[1].preview_url;
            var spotAlbum = response.tracks.items[1].album.name;

            console.log("\n" +  spotArtist + "\n" + spotSong + "\n" + spotLink + "\n" + spotAlbum + "\n");

        })
        .catch(function (err) {
            console.log(err);
        });
}



var pickApi = process.argv[2];

switch (pickApi) {
    case "concert-this":
        bandShows();
        break;

    case "spotify-this-song":
        musicStuff();
        break;

    case "movie-this":
        movieStuff();

        break;

    case "do-what-it-says":
        console.log("wtf worked!");



    //    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

  //      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
   
//        * Edit the text in random.txt to test out the feature for movie-this and concert-this.
        break;

    default:
        break;
}