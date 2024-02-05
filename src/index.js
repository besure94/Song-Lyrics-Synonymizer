import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import LyricsService from './js/LyricsService.js';
import LyricsDumpStorage from './js/LyricsDumpStorage.js';

async function getLyrics(title, artist) {
  let response = await LyricsService.getData(title, artist);
  let returnLyrics = response.lyrics;
  return returnLyrics;
}

function displaySongLyrics(response) {
  document.querySelector("div#lyricsDiv").innerText = "";
  let displayLyricsDiv = document.createElement("div");
  let displayLyrics = document.createElement("p");
  displayLyrics.innerText = response;
  displayLyricsDiv.appendChild(displayLyrics);
  document.querySelector("div#lyricsDiv").appendChild(displayLyricsDiv);
}

window.addEventListener("load", function (event) {
  event.preventDefault();
  const lyricsStorage = new LyricsDumpStorage();
  document.querySelector("form#searchSong").addEventListener("submit", function (e) {
    e.preventDefault();

    let titleData = document.getElementById("song").value;
    let artistData = document.getElementById("artist").value;
    getLyrics(titleData, artistData).then(function(lyricsResponse) {
      document.querySelector("div#showSpeechButton").innerText = "";
      lyricsStorage.lyricsApiResponse = lyricsResponse;
      displaySongLyrics(lyricsStorage.lyricsApiResponse);
      let button = document.createElement("button");
      button.textContent = "Speak!";
      button.setAttribute("id", "textToSpeech");
      document.querySelector("div#showSpeechButton").appendChild(button);
  
      button.addEventListener("click", function (evt) {
        evt.preventDefault();
        let lyrics = new SpeechSynthesisUtterance();
        lyrics.text = lyricsStorage.lyricsApiResponse;
        window.speechSynthesis.speak(lyrics);
      });
    });
  });
});

