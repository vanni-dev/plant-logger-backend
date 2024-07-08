import express from 'express';
// import {
//   createPlant,
//   getPlantById,
//   getAllPlants,
//   updatePlantById,
//   deletePlantById
// } from '../services/PlantService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // const plant = await createPlant(req.body);
    res.status(201).json(req.body);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    // const plants = await getAllPlants();
    res.json({"message": "get all plants loaded successfully"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    // const plant = await getPlantById(req.params.id);
    const plant = {"message": req.params.id + " loaded"};
    if (!plant) {
      res.status(404).json({ error: 'Plant not found' });
    } else {
      res.json(plant);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    // const updatedPlant = await updatePlantById(req.params.id, req.body);
    res.json([req.params.id, req.body]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // await deletePlantById(req.params.id);
    // res.status(204).end();
    res.send([req.params.id, "deleted"])
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
