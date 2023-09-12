import { UrlDto } from "../../dto/url.service.dto";

export interface IUrlService {
  getOrigByShort(shortUrl: string): Promise<string>;
  createShortUrl(originalUrl: string): Promise<UrlDto>;
  deleteShortUrl(shortUrl: string): Promise<void>;
  getShortByOrig(originalUrl: string): Promise<UrlDto | null>
} 