import express from 'express';
// import { createChange, getChangesByPlantId } from '../services/ChangeService.js';

const router = express.Router();

// Change endpoints
router.post('/', async (req, res) => {
  try {
    res.json({
      "message": "Change creation loaded",
      "body": req.body
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:plantId', async (req, res) => {
  try {
    res.json({
      "message": req.params.plantId + " loaded"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
