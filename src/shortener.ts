// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();


function keepFirstSixCharacters(inputUrl: string): string {
    if (inputUrl.length >= 6) {
      return inputUrl.slice(0, 6);
    } else {
      return inputUrl;
    }
  }

  function removeProtocolAndWww(url: string): string {
    const httpsPrefix = 'https://';
    const httpPrefix = 'http://';
    const wwwPrefix = 'www.'
    if (url.startsWith(httpsPrefix)) {
      url = url.slice(httpsPrefix.length); 
    }
    else if (url.startsWith(httpPrefix)) {
      url =  url.slice(httpPrefix.length); 
    }
    if(url.startsWith(wwwPrefix)){
        url =  url.slice(wwwPrefix.length)
    }
    return url
  }
  
  

export function generateShortUrl(url: string): string {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength: number = 5; 
    url  =  removeProtocolAndWww(url)
    let shortUrl: string = process.env.HOST || 'localhost'
    shortUrl+=keepFirstSixCharacters(url)
    for (let i: number = 0; i < codeLength; i++) {
      const randomIndex: number = Math.floor(Math.random() * characters.length);
      shortUrl += characters.charAt(randomIndex);
    }
  
    return shortUrl;
  }
  

  