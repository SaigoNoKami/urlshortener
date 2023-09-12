const redis = require('ioredis');

export type RedisClient = ReturnType<typeof redis>;