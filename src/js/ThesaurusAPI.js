import { thesaurus } from "thesaurus-js"

export default class ThesaurusAPI {
  
  static async get(wordInput) {
    try {
      const response = await thesaurus(wordInput, `en`, [`reverso`]);
      
      if (!response) {
        throw new Error(`the API gave no response`);
      }
      if (response[0].synonyms.length === 0) {
        throw new Error(`'${wordInput}' has no synonyms`);
      }
      return response[0];

    } catch(error) {
      console.error(error);
    }
  }
}