# Song Lyrics Synonymizer

#### An application that replaces certain words in song lyrics with synonyms.

#### By Aidan Williams, Brian Scherner, Samantha Callie, and Jason Falk

## Technologies Used

* HTML
* CSS
* Bootstrap
* JavaScript
* Webpack
* Node Package Manager
* Jest
* Lyrist API
* Thesaurus API
* Compendium JS

## Description

This application uses the [lyrist](https://lyrist.vercel.app/), [Compendium JS](https://www.npmjs.com/package/compendium-js), and [Thesaurus](https://www.npmjs.com/package/thesaurus-js) APIs. Users are given a form where they can enter the title of a song to search for its lyrics. They can also optionally enter an artist name as well. The `lyrist` API retrieves the song's lyrics and displays them on the page. A button labeled `Synonymize!` is then shown. The user then clicks the button, and an edited version of the song's lyrics are displayed to the right of the original lyrics. The user can then press a `Play` button to hear the new song lyrics spoken to them by their web browser. They can also press `Pause` to pause the speech.

## Setup/Installation Requirements

* Select the green "Code" button, copy the repository URL, and clone it to your desktop.
* In your terminal, go to your project folder and run the command `$ npm install` to install node_modules.
* Run the command `$ npm run build` to bundle together JS files.
* Enter the command `$ npm run start` to start a live development server.
* Enter the command `$ npm run lint` to check for errors.

## Known Bugs

The "artist" search feature does not work for artists whose name contains special characters.

## License

MIT

Copyright(c) 2024 Aidan Williams, Brian Scherner, Samantha Callie, Jason Falk