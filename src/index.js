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

async function getSynonymizedLyrics(lyrics) {
  const synonymizedLyrics = await Synonymizer.synonymize(lyrics);
  let returnSynonymizedLyrics = synonymizedLyrics;
  return returnSynonymizedLyrics;
}

function displaySongLyrics(response) {
  document.querySelector("div#lyricsDiv").innerText = "";
  const displayLyrics = document.createElement("p");
  displayLyrics.innerText = response;
  document.querySelector("div#lyricsDiv").appendChild(displayLyrics);
}

function displaySynonymizedLyrics(synonymizedLyrics) {
  document.querySelector("div#synonymizedLyricsDiv").innerText = "";
  const displayLyrics = document.createElement("p");
  displayLyrics.innerText = synonymizedLyrics;
  document.querySelector("div#synonymizedLyricsDiv").appendChild(displayLyrics);
  document.querySelector("div#arrow").removeAttribute("class");
}



// TODO Add most tts functionality to sti own function.
function textToSpeech(lyricsToSpeak) {
  window.speechSynthesis.cancel();
  let lyrics = new SpeechSynthesisUtterance();
  let voices = window.speechSynthesis.getVoices();
  lyrics.voice = voices[2];
  lyrics.volume = 1;
  lyrics.rate = 1.5;
  lyrics.pitch = 1;
  lyrics.text = lyricsToSpeak;
  let speechSynth = window.speechSynthesis.speak(lyrics);
  return speechSynth;
}

window.addEventListener("load", function (event) {
  event.preventDefault();
  const lyricsStorage = new LyricsDumpStorage();
  document.querySelector("form#searchSong").addEventListener("submit", function (e) {
    e.preventDefault();
    let titleData = document.getElementById("song").value;
    let artistData = document.getElementById("artist").value;

    getLyrics(titleData, artistData).then(function (lyricsResponse) {
      lyricsStorage.lyricsApiResponse = lyricsResponse;
      displaySongLyrics(lyricsStorage.lyricsApiResponse);
      const txtToSpeechControlDiv = document.getElementById("text-to-speech-control-buttons");
      txtToSpeechControlDiv.classList.remove("hidden");
      const synonymizerButton = document.getElementById("synonymize");
      synonymizerButton.classList.remove("hidden");
      
      const playButton = document.getElementById("play-button");
      playButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        textToSpeech(lyricsStorage.lyricsApiResponse);

        const pauseResumeButton = document.getElementById("pause-resume-button");
        pauseResumeButton.addEventListener("click", function () {
          if (pauseResumeButton.value == 1 || pauseResumeButton.value == "") {
            pauseResumeButton.value = 2;
            window.speechSynthesis.pause();
          } else if (pauseResumeButton.value == 2) {
            pauseResumeButton.value = 1;
            window.speechSynthesis.resume();
          }
        });
      });

      synonymizerButton.addEventListener("click", function (evt) {
        const button = document.querySelector("#synonymize");
        button.setAttribute("disabled", "true");
        button.textContent = "Working...";
        getSynonymizedLyrics(lyricsStorage.lyricsApiResponse)
          .then(function (synonymizedLyricsResponse) {
            evt.preventDefault();
            lyricsStorage.synonymizedLyricsApiResponse = synonymizedLyricsResponse;
            displaySynonymizedLyrics(lyricsStorage.synonymizedLyricsApiResponse);
          })
          .then(function() {
            button.removeAttribute("disabled");
            button.textContent = "Synonymize!"
          });
      });
      
      // Prevents text to speech from continually play outside of website.
      window.addEventListener("beforeunload", function () {
        window.speechSynthesis.cancel();
      });
    });
  });
});
