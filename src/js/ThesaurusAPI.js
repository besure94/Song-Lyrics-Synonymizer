import { thesaurus } from "thesaurus-js"

export default class ThesaurusAPI {
  
  static async get(wordInput) {
    const shuffle = (array) => {
      let oldElement;
      for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        oldElement = array[i];
        array[i] = array[rand];
        array[rand] = oldElement;
      }
      return array;
    }
    try {
      let response = await thesaurus(wordInput, `en`, [`reverso`]);
      
      if (!response) {
        throw new Error(`the API gave no response`);
      }
      if (response[0].synonyms.length === 0) {
        throw new Error(`'${wordInput}' has no synonyms`);
      }

      response[0].synonyms = shuffle(response[0].synonyms);

      return response[0];

    } catch(error) {
      console.error(error);
    }
  }
}