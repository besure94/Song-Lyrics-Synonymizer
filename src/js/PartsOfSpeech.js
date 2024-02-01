import * as Pos from 'parts-of-speech'

export default class PartsOfSpeech {
  static tagWords(string) {
    const words = new Pos.Lexer().lex(string);
    const tagger = new Pos.Tagger();
    return tagger.tag(words);
  }
  static filterValidSynonyms(string) {
    const taggedWords = this.tagWords(string);
    const regex = new RegExp(/^[JVUNR][^P]\w*/);
    let list = [];

    for (const [word, tag] of taggedWords) {
      if (regex.test(tag)) {
        list.push(word);
      }
    }
    return list
  }
}

/*
// ^[JVUNR][^P] /g
to allow:
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
VBZ Verb, present           eats
*/