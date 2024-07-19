import knex from "knex";
import knexConfig from "../../knexfile.js";

class PlantLoggerDB {
  constructor() {
    if (!PlantLoggerDB.instance) {
      this._knex = knex(knexConfig);
      PlantLoggerDB.instance = this;
    }
    return PlantLoggerDB.instance;
  }

  async testConnection() {
    return await this._knex.raw("SELECT 1+1 AS result") !== undefined;
  }

  async destroy() {
    await this._knex.destroy();
  }

  async create(table, data) {
    return await this._knex(table).insert(data);
  }

  async get(table, query) {
    return await this._knex(table).where(query);
  }

  async getById(table, id) {
    return await this._knex(table).where({ id }).first();
  }

  async getAll(table) {
    return await this._knex(table).select('*');
  }

  async update(table, id, data) {
    return await this._knex(table).where({ id }).update(data);
  }

  async delete(table, id) {
    return await this._knex(table).where({ id }).del();
  }
}

const instance = new PlantLoggerDB();
Object.freeze(instance);

export default instance;
