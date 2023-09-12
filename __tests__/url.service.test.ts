import UrlModel from "../src/database/postgre/models/url";
import { UrlService } from "../src/url/url.service";
import { client as RedisClient}  from '../src/database/redis/redis';

describe('ShortenerService', () => {
  const urlService: UrlService = new UrlService(
    UrlModel,
  RedisClient
)
;
  it('should generate a short URL', async () => {
    const longUrl = 'https://www.example.com/some/long/url';
    const shortUrl = await urlService.createShortUrl(longUrl);
    expect(shortUrl).toBeDefined();
    urlService.deleteShortUrl(shortUrl.shortUrl)
  });

  it('should decode a short URL to its original long URL', async () => {
    const longUrl = 'https://www.example.com/some/long/url2';
    const shortUrl = await urlService.createShortUrl(longUrl);
    const decodedUrl = await urlService.getOrigByShort(shortUrl.shortUrl);
    expect(decodedUrl).toBe(longUrl);
    urlService.deleteShortUrl(shortUrl.shortUrl)
  });
});
