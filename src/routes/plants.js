import express from 'express';
import PlantsService from '../services/PlantsService.js';
import { validatePlantQuery } from '../validators/plantQueryValidator.js'
import { NotFoundError, ValidationError, DatabaseError } from '../common/errors.js';

const router = express.Router();

const formatResponse =
  (status_code, message, data = undefined, error = undefined) => {
    return { 
      status_code: status_code,
      message: message,
      data: data || undefined,
      error: error || undefined
   };
  };

const formatErrors = (res, err, action) => {
  if (err instanceof NotFoundError) {
    res.status(404).json(
      formatResponse(404, `NotFoundError: ${action}`, null, err.message)
    );
  } else if (err instanceof ValidationError) {
    res.status(400).json(
      formatResponse(400, `ValidationError: ${action}`, null, err.message)
    );
  } else if (err instanceof DatabaseError) {
    res.status(500).json(
      formatResponse(500, `DatabaseError: ${action}`, null, err.message)
    );
  } else {
    res.status(500).json(
      formatResponse(500, 'An unexpected error occurred', null, err.message)
    );
  }
}

router.post('/', async (req, res) => {
  try {
    const plantId = await PlantsService.createPlant(req.body);
    res.status(201).json(
      formatResponse(201, 'Plant created successfully', { id: plantId })
    );
  } catch (err) {
    formatErrors(res, err, "Failed to create plant");
  }
});

router.get('/', async (req, res) => {
  const query = req.query;
  try {
    const plants = await PlantsService.getPlants(query);
    res.json(
      formatResponse(200, 'Plants loaded successfully', { plants })
    );
  } catch (err) {
    formatErrors(res, err, "Failed to load plants");
  }
});

router.get('/:id', async (req, res) => {
  try {
    const plant = await PlantsService.getPlantById(req.params.id);
    res.json(
      formatResponse(200, `${req.params.id} loaded`, { plant })
    );
  } catch (err) {
    formatErrors(res, err, `Failed to load the plant '${req.params.id}'`);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedPlant = await PlantsService.updatePlant(req.params.id, req.body);
    res.json(
      formatResponse(200, 'Plant updated successfully', { plant: updatedPlant })
    );
  } catch (err) {
    formatErrors(res, err, `Failed to update the plant '${req.params.id}'`);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedPlant = await PlantsService.deletePlant(req.params.id);
    res.status(204).json(
      formatResponse(204, `${req.params.id} deleted`, { plant: deletedPlant })
    );
  } catch (err) {
    formatErrors(res, err, `Failed to delete the plant '${req.params.id}'`);
  }
});

export default router;
