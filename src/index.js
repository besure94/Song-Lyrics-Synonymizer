import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import LyricsService from './js/LyricsService.js';
import LyricsDumpStorage from './js/LyricsDumpStorage.js';
import Synonymizer from './js/synonymizer.js';

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

async function displaySynonymizedLyrics(lyrics) {
  const synonymizedLyrics = await Synonymizer.synonymize(lyrics);
  const displayLyricsDiv = document.createElement("div");
  const displayLyrics = document.createElement("p");
  displayLyrics.innerText = synonymizedLyrics;
  displayLyricsDiv.appendChild(displayLyrics);
  document.querySelector("div#synonymizedLyricsDiv").appendChild(displayLyricsDiv);
  document.querySelector("div#arrow").removeAttribute("class");
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
      let button2 = document.createElement("button");
      button.textContent = "Speak!";
      button.setAttribute("id", "textToSpeech");
      document.querySelector("div#showSpeechButton").appendChild(button);
      button2.textContent = "Synonymize!";
      button2.setAttribute("id", "synonymize");
      document.querySelector("div#showSpeechButton").appendChild(button2);
      button.addEventListener("click", function (evt) {
        evt.preventDefault();
        let lyrics = new SpeechSynthesisUtterance();
        let voices = window.speechSynthesis.getVoices();
        lyrics.voice = voices[2];
        lyrics.volume = 1;
        lyrics.rate = 1.5;
        lyrics.pitch = 1;
        lyrics.text = lyricsStorage.lyricsApiResponse;
        window.speechSynthesis.speak(lyrics);
      });
      button2.addEventListener("click", function (evt) {
        evt.preventDefault();
        displaySynonymizedLyrics(lyricsStorage.lyricsApiResponse);
      });
    });
  });
});

