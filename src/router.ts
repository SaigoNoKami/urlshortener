import { Application } from 'express';
import  UrlModel  from './database/postgre/models/url';
import { UrlService } from './url/url.service';
import { UrlController } from './url/url.controller';
import { client as RedisClient}  from './database/redis/redis';
import { validateOriginalUrl, validateShortUrl } from './url/url.middleware';

abstract class BaseRouter {
  protected readonly app: Application;
  protected readonly name: string;

  constructor(app: Application, name: string) {
    this.app = app;
    this.name = name;
    this.registerRoutes();
  }

  protected abstract registerRoutes(): Application;
}

class UrlRouter extends BaseRouter {
    constructor(app: Application) {
      super(app, 'urlRouter');
    }
  
    protected registerRoutes(): Application {
      const urlController = new UrlController(
        new UrlService(
            UrlModel,
          RedisClient
        )
      );
  
      this.app.post(
        '/',
        validateOriginalUrl,
        urlController.createShortUrl.bind(urlController)
      );
  
      this.app.get(
        '/:shortUrl',
        validateShortUrl,
        urlController.redirectToOriginal.bind(urlController)
      );
  
      return this.app;
    }
  }
  
  const initRouters = (app: Application): BaseRouter[] => {
    const routers: BaseRouter[] = [];
    routers.push(new UrlRouter(app));
    return routers;
  };
  
  export { initRouters };