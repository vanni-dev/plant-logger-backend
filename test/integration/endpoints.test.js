import request from 'supertest';
import Server from '../../server.js';

const testServer = new Server(5001, false);
const app = testServer.getApp()

describe('Endpoint tests', () => {
  beforeAll(() => {
    testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  it('should return status 200 for GET /', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Server is running!');
  });

  it('should return status 200 for GET /status', async () => {
    const res = await request(app).get('/status');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Server is running!');
  });

  it('should return status 200 for GET /plants', async () => {
    const res = await request(app).get('/plants');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('get all plants loaded successfully');
  });

  it('should return status 200 for GET /plants/:id', async () => {
    const testId = '123';
    const res = await request(app).get(`/plants/${testId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(`${testId} loaded`);
  });

  it('should return status 200 for GET /logs/:plantId', async () => {
    const testPlantId = '123';
    const res = await request(app).get(`/logs/${testPlantId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(`get logs by plant ID loaded ${testPlantId}`);
  });

  it('should return status 200 for GET /changes/:plantId', async () => {
    const testPlantId = '123';
    const res = await request(app).get(`/changes/${testPlantId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(`${testPlantId} loaded`);
  });
});
