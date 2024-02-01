import 'bootstrap';
import './css/styles.css';
import LyricsService from './js/LyricsService.js';

async function getLyrics(title, artist) {
  let response = await LyricsService.getData(title, artist);
  displaySongLyrics(response);
}

function displaySongLyrics(response) {
  document.querySelector("div#lyricsDiv").innerText = "";
  let displayLyricsDiv = document.createElement("div");
  let displayLyrics = document.createElement("p");
  displayLyrics.innerText = response.lyrics;
  displayLyricsDiv.appendChild(displayLyrics);
  document.querySelector("div#lyricsDiv").appendChild(displayLyricsDiv);
}

window.addEventListener("load", function (event) {
  event.preventDefault();
  document.querySelector("form#searchSong").addEventListener("submit", function (e) {
    e.preventDefault();
    let artistData = document.getElementById("artist").value;
    let titleData = document.getElementById("song").value;
    getLyrics(titleData, artistData);
    let textToSpeechDiv = document.createElement("div");
    let button = document.createElement("button");
    console.log(button);
    button.textContent = "Speak!";
    button.setAttribute("id", "textToSpeech");
    textToSpeechDiv.appendChild(button);

    button.addEventListener("click", function (evt) {
      evt.preventDefault();
      let lyrics = new SpeechSynthesisUtterance();
      lyrics.text = response.lyrics;
      window.speechSynthesis.speak(lyrics);
      // TODO Creating a button to playback text to speech
    });
  });
});

