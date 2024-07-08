import knex from "knex";
import knexConfig from "../config/knexfile.js";

class PlantLoggerDB {
  constructor() {
    if (!PlantLoggerDB.instance) {
      this._knex = knex(knexConfig);
      PlantLoggerDB.instance = this;
    }
    return PlantLoggerDB.instance;
  }

  async testConnection() {
    try {
      await this._knex.raw("SELECT 1+1 AS result");
      console.log("Database connection successful");
      return true;
    } catch (error) {
      console.error("Database connection failed:", error);
      return false;
    }
  }

  async destroy() {
    await this._knex.destroy();
  }
}

const instance = new PlantLoggerDB();
Object.freeze(instance);

export default instance;
