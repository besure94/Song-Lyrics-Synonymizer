import PartsOfSpeech from './js/PartsOfSpeech.js';
import ThesaurusAPI from './js/ThesaurusAPI.js';

export default class LyricProcessor {
  static async getSynonyms(response, amount) {
    const lyrics = response.lyrics;
    const filteredLyrics = PartsOfSpeech.filterValidSynonyms(lyrics);
    const synonymizedLyrics = [];
    for (const word of filteredLyrics) {
      const synonyms = await ThesaurusAPI.get(word);
      synonymizedLyrics.push(synonyms.synonyms[0]);
    };
    return synonymizedLyrics;
  }
}