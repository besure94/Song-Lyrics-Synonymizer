import Compendium from 'compendium-js'

export default class PartsOfSpeech {
  
  static async getPos(string) {
    const analysis = await Compendium.analyse(string, null, [`sentiment`, `entities`, `negation`, `type`, `numeric`])[0].tokens;
    console.log(analysis)
    let posMap = new Map()
    for (const wordData of analysis) {
      const word = wordData.raw
      const wordPos = wordData.pos;
      if (!posMap.has(wordPos)) {
        posMap.set(wordPos, [word]);
      } else {
        posMap.set(wordPos, posMap.get(wordPos).concat([word]))
      }
    }
    return posMap;
  }


  // static filterValidSynonyms(string) {
  //   const taggedWords = this.tagWords(string);
  //   // this regex checks for only allowed tags. See below
  //   let list = [];

  //   for (const [word, tag] of taggedWords) {
  //     if (this.isValidTag(tag)) {
  //       list.push(word);
  //     }
  //   }
  //   return list;
  // }
}

/* to allow:
JJ Adjective                big
JJR Adj., comparative       bigger
JJS Adj., superlative       biggest
NN Noun, sing. or mass      dog
NNS Noun, plural            dogs
RB Adverb                   quickly
RBR Adverb, comparative     faster
RBS Adverb, superlative     fastest
UH Interjection             oh, oops
VB verb, base form          eat
VBD verb, past tense        ate
VBG verb, gerund            eating
VBN verb, past part         eaten
VBP Verb, present           eat
VBZ Verb, present           eats */