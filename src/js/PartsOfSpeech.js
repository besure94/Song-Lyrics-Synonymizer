import * as Pos from 'parts-of-speech'

export default class PartsOfSpeech {
  static tagWords(string) {
    const words = new Pos.Lexer().lex(string);
    const tagger = new Pos.Tagger();
    return tagger.tag(words);
  }

  static isValidTag(tag) {
    // regex checks for only allowed tags. See below
    const regex = new RegExp(/^[JVUNR][^P]\w*/);

    return regex.test(tag);
  }

  static filterValidSynonyms(string) {
    const taggedWords = this.tagWords(string);
    // this regex checks for only allowed tags. See below
    let list = [];

    for (const [word, tag] of taggedWords) {
      if (this.isValidTag(tag)) {
        list.push(word);
      }
    }
    return list;
  }
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