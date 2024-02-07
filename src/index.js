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
      document.querySelector("div#showButtons").innerText = "";
      lyricsStorage.lyricsApiResponse = lyricsResponse;
      displaySongLyrics(lyricsStorage.lyricsApiResponse);
      let speakButton = document.createElement("button");
      speakButton.textContent = "Speak!";
      speakButton.setAttribute("id", "textToSpeech");
      document.querySelector("div#showButtons").appendChild(speakButton);

      let pauseResumeButton = document.createElement("button");
      pauseResumeButton.textContent = "Pause!";
      pauseResumeButton.setAttribute("id", "pauseResumeButton");
      document.getElementById("showButtons").appendChild(pauseResumeButton);
  
      speakButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        let lyrics = new SpeechSynthesisUtterance();
        let voices = window.speechSynthesis.getVoices();
        lyrics.voice = voices[2];
        lyrics.volume = 1;
        lyrics.rate = 1.5;
        lyrics.pitch = 1;
        lyrics.text = lyricsStorage.lyricsApiResponse;
        window.speechSynthesis.speak(lyrics);

        pauseResumeButton.addEventListener("click", function (event) {
          if (pauseResumeButton.value == 1 || pauseResumeButton.value == "") {
            pauseResumeButton.value = 2;
            window.speechSynthesis.pause();
          } else if (pauseResumeButton.value == 2) {
            pauseResumeButton.value = 1;
            window.speechSynthesis.resume();
          }
        });
      });
    });
  });
});

