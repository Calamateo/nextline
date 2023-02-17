const request = require('supertest');
const createApp = require('../src/app');
const { models } = require('../src/db/sequelize');
const { downSeed, upSeed } = require('./utils/umzug');

describe('Name of the group', () => {
  let app = null;
  let server = null;
  let api = null;
  const apiKey = { api_key: `${process.env.API_KEY}` };
  let id = null;
  beforeAll(async () => {
    app = createApp();
    server = app.listen(9000);
    api = request(app);
    await upSeed();
  });

  describe('[GET] /api/v1/tasks', () => {
    it('should return status 200', async () => {
      const { statusCode } = await api.get('/api/v1/tasks')
        .set(apiKey);
      expect(statusCode).toEqual(200);
    });

    it('should return status 401 unauthorized', async () => {
      const { statusCode } = await api.get('/api/v1/tasks');
      expect(statusCode).toEqual(401);
    });
  });

  describe('[POST] /api/v1/tasks', () => {
    it('should return status 201 create', async () => {
      const task = {
        title: 'Create form input name',
        description: 'create input name of max. 20 characters, from the mail form',
        status: 'success',
        deliveryDate: '2023-02-16',
      };
      const { statusCode, body } = await api.post('/api/v1/tasks')
        .send(task)
        .set(apiKey);
      id = body.id;
      const data = await models.Task.findByPk(id);
      expect(statusCode).toEqual(201);
      expect(body.title).toEqual(data.title);
    });

    it('should return status 400 bad request', async () => {
      const task = {
        title: 'Create form input name',
        description: 'create input name of max. 20 characters, from the mail form',
      };
      const { statusCode, body } = await api.post('/api/v1/tasks')
        .send(task)
        .set(apiKey);
      expect(statusCode).toEqual(400);
      expect(body.error).toEqual('Bad Request');
    });

    it('should return status 401 unauthorized', async () => {
      const { statusCode } = await api.post('/api/v1/tasks');
      expect(statusCode).toEqual(401);
    });
  });

  describe('[GET] /api/v1/tasks/{id}', () => {
    it('should return status 200', async () => {
      const { statusCode, body } = await api.get(`/api/v1/tasks/${id}`)
        .set(apiKey);
      expect(statusCode).toEqual(200);
      const data = await models.Task.findByPk(id);
      expect(body.title).toEqual(data.title);
    });
    it('should return status 400 bad request', async () => {
      const { statusCode, body } = await api.get('/api/v1/tasks/dasd')
        .set(apiKey);
      expect(statusCode).toEqual(400);
      expect(body.error).toEqual('Bad Request');
    });

    it('should return status 401 unauthorized', async () => {
      const { statusCode } = await api.get(`/api/v1/tasks/${id}`);
      expect(statusCode).toEqual(401);
    });

    it('should return status 404', async () => {
      const { statusCode } = await api.get('/api/v1/tasks/-1')
        .set(apiKey);
      expect(statusCode).toEqual(404);
    });
  });

  describe('[PUT] /api/v1/tasks/{id}', () => {
    it('should return status 200 put task', async () => {
      const data = {
        status: 'process',
      };
      const { statusCode, body } = await api.put(`/api/v1/tasks/${id}`)
        .send(data)
        .set(apiKey);
      expect(statusCode).toEqual(200);
      expect(body.status).toEqual(data.status);
      const dataBase = await models.Task.findByPk(id);
      expect(body.status).toEqual(dataBase.status);
    });

    it('should return status 400 bad request', async () => {
      const { statusCode, body } = await api.put('/api/v1/tasks/dasd')
        .set(apiKey);
      expect(statusCode).toEqual(400);
      expect(body.error).toEqual('Bad Request');
    });

    it('should return status 401 unauthorized', async () => {
      const { statusCode } = await api.put(`/api/v1/tasks/${id}`);
      expect(statusCode).toEqual(401);
    });

    it('should return status 404', async () => {
      const { statusCode } = await api.put('/api/v1/tasks/-1')
        .set(apiKey);
      expect(statusCode).toEqual(404);
    });
  });

  describe('[DELETE] /api/v1/tasks/{id}', () => {
    it('should return status 200 Deleted', async () => {
      const { statusCode } = await api.delete(`/api/v1/tasks/${id}`)
        .set(apiKey);
      expect(statusCode).toEqual(200);
    });

    it('should return status 400 bad request', async () => {
      const { statusCode, body } = await api.delete('/api/v1/tasks/dasd')
        .set(apiKey);
      expect(statusCode).toEqual(400);
      expect(body.error).toEqual('Bad Request');
    });

    it('should return status 401 unauthorized', async () => {
      const { statusCode } = await api.delete(`/api/v1/tasks/${id}`);
      expect(statusCode).toEqual(401);
    });

    it('should return status 404 task not found', async () => {
      const { statusCode, body } = await api.delete(`/api/v1/tasks/${id}`)
        .set(apiKey);
      expect(statusCode).toEqual(404);
      expect(body.message).toEqual('Task not found');
    });
  });

  afterAll(async () => {
    await downSeed();
    server.close();
  });
});
