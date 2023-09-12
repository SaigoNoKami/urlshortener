import { IUrlModel } from './interfaces/url.model.interface';
import { generateShortUrl } from '../shortener';
import { UrlDto } from '../dto/url.service.dto';
import { Expired } from '../date';
import { RedisClient } from '../url/interfaces/redis.client.interface'
import { error } from 'console';

class UrlService{
  constructor(
    private UrlModel: IUrlModel,
    private RedisClient: RedisClient,
    private expiresDays: number = 365

  ) {}
  
async  createShortUrl(originalUrl: string): Promise<UrlDto> {
    const expiresDate: Date = new Date()
    expiresDate.setDate(expiresDate.getDate() + this.expiresDays);
    const shortUrl: string = generateShortUrl(originalUrl)
    if(await this.getShortByOrig(originalUrl)){
      throw error('Url already exist')
    }
    const result =  this.UrlModel.create({ originalUrl, shortUrl, expiresAt: expiresDate });
    if(!result){
      throw error('Unable to create shortUrl')
    }
    return result
}

async  getShortByOrig(originalUrl: string): Promise<UrlDto | null> {
  return this.UrlModel.findOne({
    where: { originalUrl},
  });
}

async  getOrigByShort(shortUrl: string): Promise<string> {
  let url = await this.RedisClient.get(shortUrl)
  if(url){
    return url
  }
    url = await this.UrlModel.findOne({
      where: { shortUrl},
    });
    if(url){
      if(Expired(url.expiresAt)){
        await this.deleteShortUrl(url.shortUrl);
      }else{
        await this.RedisClient.set(shortUrl, url.originalUrl);
      }
    }
    if(!url){
      throw error('shortUrl is invalid or expired')
    }
    return url.originalUrl
   
}

async deleteShortUrl(shortUrl: string): Promise<void> {
  this.UrlModel.destroy({ where: { shortUrl } });
}
}

export { UrlService };