import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import LyricsService from './js/LyricsService.js';
import LyricsDumpStorage from './js/LyricsDumpStorage.js';
import Synonymizer from './js/synonymizer.js';

// this function awaits the getData() function from the LyricsService.js file
async function getLyrics(title, artist) {
  let response = await LyricsService.getData(title, artist);
  // stores the lyrics retrieved from the Lyrist API call in a variable, and returns the variable
  let returnLyrics = response.lyrics;
  return returnLyrics;
}

// this function awaits the synonymize() function from the Synonymizer.js file
async function getSynonymizedLyrics(lyrics) {
  const synonymizedLyrics = await Synonymizer.synonymize(lyrics);
  // stores the synonymized lyrics resulting from the Thesaurus and Compendium APIs in a variable, and returns the variable
  let returnSynonymizedLyrics = synonymizedLyrics;
  return returnSynonymizedLyrics;
}

// displays the song lyrics from the original song
function displaySongLyrics(response) {
  document.querySelector("div#lyricsDiv").innerText = "";
  document.querySelector("div#synonymizedLyricsDiv").innerText = "";
  document.querySelector("div#synonymizedLyricsCard").setAttribute("class", "hidden");
  document.querySelector("div#arrow").setAttribute("class", "hidden");
  document.querySelector("div#lyricsCard").setAttribute("class", "card text-bg-light border-info");
  const displayLyrics = document.createElement("p");
  displayLyrics.innerText = response;
  document.querySelector("div#lyricsDiv").appendChild(displayLyrics);
}

// displays the synonymized lyrics, aka the new lyrics
function displaySynonymizedLyrics(synonymizedLyrics) {
  document.querySelector("div#synonymizedLyricsDiv").innerText = "";
  document.querySelector("div#synonymizedLyricsCard").setAttribute("class", "card text-bg-light border-danger");
  const displayLyrics = document.createElement("p");
  displayLyrics.innerText = synonymizedLyrics;
  document.querySelector("div#synonymizedLyricsDiv").appendChild(displayLyrics);
  document.querySelector("div#arrow").removeAttribute("class");
}

// accepts the synonymized lyrics as an argument, and converts these lyrics to speech
function textToSpeech(lyricsToSpeak) {
  // clears text to speech queue
  window.speechSynthesis.cancel();
  let lyrics = new SpeechSynthesisUtterance();
  let voices = window.speechSynthesis.getVoices();
  // parameters for text to speech voice
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

    // Calls getLyrics then waits for lyricsResponse return
    getLyrics(titleData, artistData).then(function (lyricsResponse) {
      // stores lyricsResponse in lyricsStorage Object
      lyricsStorage.lyricsApiResponse = lyricsResponse;
      displaySongLyrics(lyricsStorage.lyricsApiResponse);
      const txtToSpeechControlDiv = document.getElementById("text-to-speech-control-buttons");
      const synonymizerButton = document.getElementById("synonymize");
      synonymizerButton.classList.remove("hidden");
      
      synonymizerButton.addEventListener("click", function (evt) {
        const button = document.querySelector("#synonymize");
        txtToSpeechControlDiv.classList.remove("hidden");
        button.setAttribute("disabled", "true");
        button.textContent = "Working...";
        // calls getSynonymizedLyrics then waits for response
        getSynonymizedLyrics(lyricsStorage.lyricsApiResponse)
          .then(function (synonymizedLyricsResponse) {
            evt.preventDefault();
            // stores synonymizedLyricsResponse in lyricsStorage
            lyricsStorage.synonymizedLyricsApiResponse = synonymizedLyricsResponse;
            displaySynonymizedLyrics(lyricsStorage.synonymizedLyricsApiResponse);
          })
          .then(function() {
            button.removeAttribute("disabled");
            button.textContent = "Synonymize!"
          });
      });

      const playButton = document.getElementById("play-button");
      playButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        textToSpeech(lyricsStorage.synonymizedLyricsApiResponse);

        // text to speech pause and resume button - if pauseResumeButton value is 1, it switches to 2 and pauses, then resumes if button is pressed again
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
      
      // Prevents text to speech from playing outside of website.
      window.addEventListener("beforeunload", function () {
        window.speechSynthesis.cancel();
      });
    });
  });
});
