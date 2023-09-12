import { NextFunction, Request, Response } from 'express';
import { IUrlService } from './interfaces/url.service.interface';

class UrlController {
  constructor(private urlService: IUrlService) {}

  async createShortUrl(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { url } = req.body;
    try {
      const shortUrl = await this.urlService.createShortUrl(url);
      res.status(200).send(shortUrl);
    } catch (err) {
      next(err);
    }
  }

  async redirectToOriginal(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { shortUrl } = req.params;
    try {
      const url = await this.urlService.getOrigByShort(shortUrl);
      if(!url){
        res.status(404).send('ShortUrl don`t found')
      }else{
        res.status(301).redirect(url);
      }
    } catch (err) {
      next(err);
    }
  }
}

export { UrlController };