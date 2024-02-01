export default class LyricsService {
  static async getData(artist, title) {
    if (artist === "") {
      const response = await fetch(`https://lyrist.vercel.app/api/${title}`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${jsonifiedResponse['error-type']}`;
        return errorMessage;
      }
      return jsonifiedResponse;
    }
    else
    {
      const response = await fetch(`https://lyrist.vercel.app/api/${artist}/${title}`);
      const jsonifiedResponse = await response.json();
      if (!response.ok) {
        const errorMessage = `${response.status} ${jsonifiedResponse['error-type']}`;
        return errorMessage;
      }
      return jsonifiedResponse;
    }
  }
}