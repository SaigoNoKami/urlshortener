/* eslint-disable @typescript-eslint/no-var-requires */
const request = require('supertest');
const app = require('../src/index'); 

describe('API Status Tests', () => {
  it('should return 302 status', async () => {
    const response = await request(app).get('/localhostAvfF1');
    expect(response.status).toBe(302);
  });

  it('should return 404 status', async () => {
    const response = await request(app).get('/qweqeweq');
    expect(response.status).toBe(404);
  });

  it('should return 400 status', async () => {
    const response = await request(app).post('/').send({ url: 'qweqwe' });
    expect(response.status).toBe(400);
  });

  it('should return 200 status', async () => {
    const response = await request(app).post('/').send({ url: 'http://www.library.univ.kiev.ua/ukr/elcat/new/poshuk.php3' });
    expect(response.status).toBe(200);
  });
});