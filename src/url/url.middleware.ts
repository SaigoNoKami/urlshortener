import { Request, Response, NextFunction } from 'express';
import { HttpBadRequest } from './errors';
import { isValidUrl } from '../valid';

const validateShortUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req?.params?.shortUrl) {
    next(new HttpBadRequest('ShortUrl is required'));
  } else next();
};

const validateOriginalUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!isValidUrl(req?.body?.url)) {
    next(new HttpBadRequest('url parameter should be a valid URL identifier'));
  } else next();
};

export { validateShortUrl, validateOriginalUrl };