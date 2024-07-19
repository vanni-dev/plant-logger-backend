import db from '../lib/PlantLoggerDB.js';
import { validatePlantQuery } from '../validators/plantQueryValidator.js'
import { ValidationError, NotFoundError, DatabaseError } from '../common/errors.js';

class PlantsService {
  constructor() {
    if (!PlantsService.instance) {
      PlantsService.instance = this;
    }
    return PlantsService.instance;
  }

  async createPlant(plantData) {
    const plantDataWithDefaults = {
      gender: plantData.gender || 'f',
      is_clone_generator: plantData.is_clone_generator || false,
      ...plantData,
    };

    const validationResult = validatePlantQuery({
      data: plantDataWithDefaults,
      mandatory: ['name', 'gender', 'is_clone_generator', 'strain_id', 'start_stage']
    });
    if (!validationResult.isValid) {
      throw new ValidationError(validationResult.errors.join(' / '));
    }

    try {
      const [id] = await db.create('fact_plants', validationResult.transformed_data);
      return id;
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new DatabaseError(`Error creating plant: ${error.message}`);
    }
  }

  async getPlants(query) {
    const validationResult = validatePlantQuery({data: query});
    if (!validationResult.isValid) {
      throw new ValidationError(validationResult.errors.join(' / '));
    }
    try {
      const plants = await db.get('fact_plants', query);
      if (!plants || plants.length === 0) {
        throw new NotFoundError('No plants found');
      }
      return plants;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError) {
        throw error;
      } else {
        throw new DatabaseError('Error retrieving plants:', error);
      }
    }
  }

  async getPlantById(id) {
    const validationResult = validatePlantQuery({ data: { id }});
    if (!validationResult.isValid) {
      throw new ValidationError(validationResult.errors.join(' / '));
    }
    try {
      const plant = await db.getById('fact_plants', id);
      if (!plant) {
        throw new NotFoundError(`Plant ${id} not found`);
      }
      return plant;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError) {
        throw error;
      } else {
        throw new DatabaseError(`Error retrieving plant ${id}:`, error);
      }
    }
  }

  async updatePlant(id, plantData) {
    const validationResult = validatePlantQuery({ data: plantData, forbiddenFields: ['id'] });
    const validationId = validatePlantQuery({ data: { id }});
    if (!validationResult.isValid || !validationId.isValid) {
      throw new ValidationError(validationResult.errors.join(' / '));
    }
    try {
      const updated = await db.update('fact_plants', id, plantData);
      if (updated === 0) {
        throw new NotFoundError(`Plant ${id} not found`);
      }
      return { id, ...plantData };
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError) {
        throw error
      }
      throw new DatabaseError(`Error updating plant ${id}:`, error);
    }
  }

  async deletePlant(id) {
    const validationResult = validatePlantQuery({ data: { id }});
    if (!validationResult.isValid) {
      throw new ValidationError(validationResult.errors.join(' / '));
    }
    try {
      const deleted = await db.delete('fact_plants', id);
      if (deleted === 0) {
        throw new NotFoundError(`Plant ${id} not found`);
      }
      return { plant: deleted };
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof ValidationError) {
        throw error;
      }
      throw new DatabaseError(`Error deleting plant ${id}:`, error);
    }
  }
}

const instance = new PlantsService();
Object.freeze(instance);

export default instance;
