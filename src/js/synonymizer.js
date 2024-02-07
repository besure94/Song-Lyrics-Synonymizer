import PartsOfSpeech from './PartsOfSpeech.js';
import ThesaurusAPI from './ThesaurusAPI.js';

export default class Synonymizer {

  static async buildSynMap(response) {
    const lyrics = PartsOfSpeech.preFilter(response.lyrics);
    let toSynonymize = await PartsOfSpeech.filterAsArray(lyrics);
    let synLength;
    let synonymMap = new Map();

    if (toSynonymize.length >= 100) {
      synLength = 100;
      toSynonymize = ThesaurusAPI.shuffle(toSynonymize);
    } else {
      synLength = toSynonymize.length;
    }

    for (let i = 0; i < synLength; i++) {
      const response = await ThesaurusAPI.get(toSynonymize[i]);
      if (response.hasOwnProperty(`synonyms`)) {
        synonymMap.set(toSynonymize[i], response.synonyms[0]);
      }
    }

    return synonymMap;
  }

  static async synonymize(response) {

    // refactor here

    for (const word of lyrics.split(' ')) {
      if (skip === 1) {
        synonymizedLyrics.push(word);
        if (!word.endsWith(']')) {
          continue;
        }
        else {
          skip = 0;
          continue;
        }
      }
      else if (word.startsWith('[') && word.endsWith(']')) {
        synonymizedLyrics.push(word);
        continue;
      }
      else if (word.startsWith('[')) {
        synonymizedLyrics.push(word);
        skip = 1;
        continue;
      }
      for (let index = 0; index < filteredLyrics.length; index++) {
        const element = filteredLyrics[index];
        if (word.toLowerCase() === element.toLowerCase()) {
          if (synonymMap.has(word)) {
            let synonym = synonymMap.get(word);
            if (word.charAt(0) === word.charAt(0).toUpperCase()) {
              synonym = synonym.slice(0, 1).toUpperCase() + synonym.slice(1, synonym.length);
            }
            synonymizedLyrics.push(synonym);
            break;
          }
          else {
            const synonyms = await ThesaurusAPI.get(word);
            synonymMap.set(word, synonyms.synonyms[0]);
            let synonym = synonyms.synonyms[0];
            if (word.charAt(0) === word.charAt(0).toUpperCase()) {
              synonym = synonym.slice(0, 1).toUpperCase() + synonym.slice(1, synonym.length);
            }
            synonymizedLyrics.push(synonym);
            break;
          }
        }
        else if (word.toLowerCase() != element.toLowerCase() && index === filteredLyrics.length - 1)
        {
          synonymizedLyrics.push(word);
        }
      }
    }
    return synonymizedLyrics.join(' ').replaceAll(' ,', ',').replaceAll(' \n ', '\n');
  }
}