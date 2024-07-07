// import 'dotenv/config';
import pool from '../../config/db.js';

describe('Database Connection', () => {
  afterAll(async () => {
    await pool.end(); // Properly close the pool after all tests
  });
  
  it('should connect to the database and perform a query', async () => {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query('SELECT 1 as val');
      expect(rows).toEqual([{ val: 1 }]);
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  });
});
