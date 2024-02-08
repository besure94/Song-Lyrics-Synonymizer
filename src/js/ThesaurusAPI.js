import { thesaurus } from "thesaurus-js"

export default class ThesaurusAPI {

  static filterSynonyms(array) {
    const newArray = array.filter(word => word !== `Collocations` && word.split(' ').length <= 3);
  }

  static shuffle(array) {
    let oldElement;
    for (let i = array.length - 1; i > 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      oldElement = array[i];
      array[i] = array[rand];
      array[rand] = oldElement;
    }
    return array;
  }
  
  static async get(wordInput) {
    try {
      let response = await thesaurus(wordInput, `en`, [`wordreference`]);
      if (!response) {
        throw new Error(`the API gave no response`);
      }
      if (typeof response !== `object`) {
        console.log(response)
        throw new Error(`The API gave an unexpected response: ${response}`);
      }
      if (response[0].synonyms.length === 0) {
        throw new Error(`'${wordInput}' has no synonyms`);
      }

      response[0].synonyms = this.shuffle(response[0].synonyms.filter(word => word !== `Collocations`));

      return response[0];

    } catch(error) {
      console.error(error);
    }
  }
}