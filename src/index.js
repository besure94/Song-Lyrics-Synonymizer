import 'bootstrap';
import './css/styles.css';
import Lyrist from './js/LyristApiCall.js';

async function getLyrics() {
  let response = await Lyrist.getSongLyrics();
  displaySongLyrics(response);
}

function displaySongLyrics(response) {
  document.querySelector("div#lyricsDiv").innerText = "";
  let displayLyricsDiv = document.createElement("div");
  let displayLyrics = document.createElement("p");
  displayLyrics.innerText = response[0].lyrics;
  displayLyricsDiv.appendChild(displayLyrics);
  document.querySelector("div#lyricsDiv").appendChild(displayLyricsDiv);
}

window.addEventListener("load", function(event) {
  event.preventDefault();
  document.querySelector("form#searchSong").addEventListener("submit", function (e) {
    e.preventDefault();
    getLyrics();
  });
});
