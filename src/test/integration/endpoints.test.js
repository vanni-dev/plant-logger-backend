import request from 'supertest';
import Server from '../../server.js';

const testServer = new Server(5001, false);
const app = testServer.getApp()
const dummyData = {
  plantName: 'Dummy+Plant'
}

describe('Endpoint tests', () => {
  beforeAll(async () => {
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
    expect(res.statusCode).not.toBe(500);
    expect(res.body.message).toBe('Server is running!');
  });

  it(`should return status 200 for GET /plants?name=${dummyData['plantName']}`, async () => {
    const res = await request(app).get(`/plants?name=${dummyData['plantName']}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Plants loaded successfully');
  });

  it('should return status 200 for GET /plants/:id', async () => {
    const resPlant = await request(app).get(`/plants?name=${dummyData['plantName']}`);
    const dummyPlantId = resPlant.body.data.plants[0].id;
    const res = await request(app).get(`/plants/${dummyPlantId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(`${res.body.data.plant.id} loaded`);
  });

  it('should return status 200 for GET /logs/:plantId', async () => {
    const resPlant = await request(app).get(`/plants?name=${dummyData['plantName']}`);
    const dummyPlantId = resPlant.body.data.plants[0].id;
    const res = await request(app).get(`/logs/${dummyPlantId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(`get logs by plant ID loaded ${dummyPlantId}`);
  });

  it('should return status 200 for GET /changes/:plantId', async () => {
    const resPlant = await request(app).get(`/plants?name=${dummyData['plantName']}`);
    const dummyPlantId = resPlant.body.data.plants[0].id;
    const res = await request(app).get(`/changes/${dummyPlantId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe(`${dummyPlantId} loaded`);
  });
});
