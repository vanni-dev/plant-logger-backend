import db from '../../lib/PlantLoggerDB.js';

describe('PlantLoggerDB', () => {
  afterAll(async () => {
    await db.destroy();
  })

  it('should return a successful connection message', async () => {
    const result = await db.testConnection();
    expect(result).toBe(true);
  })
});
