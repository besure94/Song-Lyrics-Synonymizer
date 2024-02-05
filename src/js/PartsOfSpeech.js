import Compendium from 'compendium-js'

export default class PartsOfSpeech {

  static preFilter(string) {
    // cut out [Verse] etc
    let newString = string.replaceAll(/\[.*\]\n/g, ``);
    // space linebreak characters (you /n How... instead of you/nHow...)
    newString = newString.replaceAll(`\n`,` \n `);

    return newString;
  }

  static async filterPos(string) {
    let filteredMap = await this.getPos(string);
    for (const key of filteredMap.keys()) {
      // remove unwanted entries in the pos map. See bottom
      if(!/^([JMNU]\w[^P]|V|RB)\w*/.test(key)) {
        filteredMap.delete(key);
      } else {
        // filter out contractions
        filteredMap.set(key, filteredMap.get(key).filter(word => !word.includes(`'`)));
      }
    }
    return filteredMap;
  }

  static async filterAsArray(string) {
    return Array.from(await this.filterPos(string)).map(element => element[1]).flat();
  }
  
  static async getPos(string) {
    const analysis = await Compendium.analyse(this.preFilter(string));
    console.log(analysis);
    let posMap = new Map();
    for (const sentence of analysis) {
      // execute on every token analyzed
      for (const wordData of sentence.tokens) {
        // lower case form
        const word = wordData.norm;
        const wordPos = wordData.pos;

        if (!posMap.has(wordPos)) {
          posMap.set(wordPos, [word]);
        } else if (!posMap.get(wordPos).includes(word)) {
          posMap.set(wordPos, posMap.get(wordPos).concat([word]));
        }
      }
    }
    return posMap;
  }
}

/* to allow:
JJ Adjective                big
JJR Adj., comparative       bigger
JJS Adj., superlative       biggest
MD Modal                    can,should
NN Noun, sing. or mass      dog
NNS Noun, plural            dogs
RB Adverb                   quickly, not
RBR Adverb, comparative     faster
RBS Adverb, superlative     fastest
UH Interjection             oh, oops
VB verb, base form          eat
VBD verb, past tense        ate
VBG verb, gerund            eating
VBN verb, past part         eaten
VBP Verb, present           eat
VBZ Verb, present           eats */