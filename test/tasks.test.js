const request = require('supertest');
const createApp = require('../src/app');

describe('Name of the group', () => {
  let app = null;
  let server = null;
  let api = null;
  let apiKey = null;
  let id = null;
  beforeAll(async () => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
    apiKey = { api_key: `${process.env.API_KEY}` };
  });

  describe('[GET] /tasks', () => {
    it('should return status 200', async () => {
      const { statusCode } = await api.get('/tasks')
        .set(apiKey);
      expect(statusCode).toEqual(200);
    });
    it('should return status 401 unauthorized', async () => {
      const { statusCode } = await api.get('/tasks');
      expect(statusCode).toEqual(401);
    });
  });

  describe('[POST] /tasks', () => {
    it('should return status 201 create', async () => {
      const task = {
        title: 'Create form input name',
        description: 'create input name of max. 20 characters, from the mail form',
        status: 'success',
        deliveryDate: '01/01/2024',
      };
      const { statusCode, body } = await api.post('/tasks')
        .send(task)
        .set(apiKey);
      id = body.id;
      expect(statusCode).toEqual(201);
    });
    it('should return status 400 bad request', async () => {
      const task = {
        title: 'Create form input name',
        description: 'create input name of max. 20 characters, from the mail form',
      };
      const { statusCode } = await api.post('/tasks')
        .send(task)
        .set(apiKey);
      expect(statusCode).toEqual(400);
    });
  });

  describe('[GET] /tasks/{id}', () => {
    it('should return status 200', async () => {
      const { statusCode } = await api.get(`/tasks/${id}`)
        .set(apiKey);
      expect(statusCode).toEqual(200);
    });
    it('should return status 404', async () => {
      const { statusCode } = await api.get('/tasks/-1')
        .set(apiKey);
      expect(statusCode).toEqual(404);
    });
    it('should return status 5XX server error', async () => {
      const { statusCode } = await api.get('/tasks/dasd');
      expect(statusCode).toEqual(500);
    });
  });

  describe('[PUT] /tasks/{id}', () => {
    it('should return status 200 put task', async () => {
      const data = {
        status: 'process',
      };
      const { statusCode, body } = await api.put(`/tasks/${id}`)
        .send(data)
        .set(apiKey);
      expect(statusCode).toEqual(200);
      expect(body.status).toEqual(data.status);
    });
  });

  describe('[DELETE] /tasks/{id}', () => {
    it('should return status 200 Deleted', async () => {
      const { statusCode } = await api.delete(`/tasks/${id}`)
        .set(apiKey);
      expect(statusCode).toEqual(200);
    });

    it('should return status 404 task not found', async () => {
      const { statusCode, body } = await api.delete(`/tasks/${id}`)
        .set(apiKey);
      expect(statusCode).toEqual(404);
      expect(body.message).toEqual('Task not found');
    });
  });

  afterAll(() => {
    server.close();
  });
});
