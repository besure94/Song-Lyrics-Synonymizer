export default class Lyrist {
  static getSongLyrics() {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://lyrist.vercel.app/api/colony`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        console.log(response);
        if (this.status === 200) {
          resolve([response]);
        } else {
          reject([this, response]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}