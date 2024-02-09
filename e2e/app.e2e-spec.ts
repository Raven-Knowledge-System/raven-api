import request from 'supertest';

describe('AppController (e2e)', () => {
  it('/ (GET)', () => {
    return request('http://localhost:3000')
      .get('/v1')
      .expect(200)
      .expect('Hello World!');
  });
});
