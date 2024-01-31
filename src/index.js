import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Lyrist from './LyristApiCall.js';

async function getLyrics() {
  let response = await Lyrist.getSongLyrics();
  displaySongLyrics(response);
  // if (response === 200) {
  //   console.log(response, "response");
  //   displaySongLyrics(response);
  // }
}

function displaySongLyrics(response) {
  console.log(response, "display lyrics response");
  let displayLyricsDiv = document.createElement("div");
  let displayLyrics = document.createElement("p");
  displayLyrics.innerText = response[0].lyrics;
  console.log(displayLyrics);
  displayLyricsDiv.appendChild(displayLyrics);
}

window.addEventListener("load", function(event) {
  event.preventDefault();
  document.querySelector("form#searchSong").addEventListener("submit", function (e) {
    e.preventDefault();
    getLyrics();
  });
});
