import { generateShortUrl} from '../src/shortener';
import { isValidUrl } from '../src/valid'
import { Expired } from '../src/date'

describe('URL Shortener', () => {
  it('should generate a short URL', () => {
    const longUrl = 'https://www.example.com/some/long/url';
    const shortUrl = generateShortUrl(longUrl);
    expect(shortUrl).toBeDefined();
  });


  it('should handle invalid input gracefully', () => {
    const invalidUrl = 'not_a_valid_url';
    const shortUrl = isValidUrl(invalidUrl);
    expect(shortUrl).toBeFalsy();
  });

  it('date is expired', () => {
    const expiresDate: Date = new Date()
    expiresDate.setDate(expiresDate.getDate() + 1);
    const result = Expired(expiresDate);
    expect(result).toBeFalsy();
  });
});

