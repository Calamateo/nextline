const request = require('supertest');
const createApp = require('../src/app');

describe('Test for app', () => {
  let app = null;
  let server = null;
  let api = null;
  beforeEach(async () => {
    app = createApp();
    server = app.listen('9000');
    api = request(app);
  });

  describe('GET /', () => {
    it('should return name', async () => {
      const { text, statusCode } = await api.get('/');
      expect(statusCode).toEqual(200);
      expect(text).toEqual('Challenge nextline \nDaniel Calamateo');
    });
  });

  afterEach(() => {
    server.close();
  });
});
