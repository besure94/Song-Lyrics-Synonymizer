import PartsOfSpeech from './PartsOfSpeech.js';
import ThesaurusAPI from './ThesaurusAPI.js';

export default class Synonymizer {

  static async buildSynMap(response) {
    let toSynonymize = await PartsOfSpeech.filterAsArray(response.lyrics);
    let synonymMap = new Map();

    for (let i = 0; i < toSynonymize.length; i++) {
      const response = await ThesaurusAPI.get(toSynonymize[i]);
      if (response.hasOwnProperty(`synonyms`)) {
        synonymMap.set(toSynonymize[i], response.synonyms[0]);
      } else {
        console.error(response);
      }
    }

    return synonymMap;
  }

  static replaceFromMap(text, map) {
    // match every key from the map (regexps are insane)
    const pattern = new RegExp(`\\b(${[...map.keys()].join('|')})\\b`, 'gi');

    return text.replace(pattern, (match) => {
      // get the replacement text
      const replacement = map.get(match.toLowerCase()); 

      // match case
      if (match[0] === match[0].toUpperCase()) {

      return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      } else {
      
      // use the replacement as is for lowercase matches
      return replacement;
      }
    });
  }

  static async synonymize(response) {
    const map = await this.buildSynMap(response);

    if (map) {
      return this.replaceFromMap(response.lyrics, map);
    }
  }
}