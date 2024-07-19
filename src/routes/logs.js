import express from 'express';
// import { 
//   upload,
//   createLog,
//   getLogsByPlantId,
//   updateLogById,
//   deleteLogById
// } from '../services/LogService.js';

const router = express.Router();

// Log endpoints
// router.post('/', upload.single('photo'), async (req, res) => {
//   try {
//     const year = new Date().getFullYear();
//     const logData = {
//       date: req.body.date,
//       plantId: req.body.plantId,
//       temperature: req.body.temperature,
//       humidity: req.body.humidity,
//       pH: req.body.pH,
//       stage: req.body.stage,
//       lightCycle: req.body.lightCycle,
//       photo: req.file ? `/uploads/logs/${year}/${req.file.filename}` : null // Store the file path in the database
//     };
//     // const log = await createLog(logData);
//     const log = {"message": "log created", "data": logData};
//     if (log) {
//       res.status(201).json(log);
//     } else {
//       res.status(409).json({ error: 'Log entry already exists for this plantId and timestamp' });
//     }
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// Get logs by plant ID
router.get('/:plantId', async (req, res) => {
  try {
    // const logs = await getLogsByPlantId(req.params.plantId);
    const logs = {"message": "get logs by plant ID loaded " + req.params.plantId};
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update log by ID
router.put('/:id', async (req, res) => {
  try {
    // const updatedLog = await updateLogById(req.params.id, req.body);
    // res.json(updatedLog);
    res.json({});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete log by ID
router.delete('/:id', async (req, res) => {
  try {
    // await deleteLogById(req.params.id);
    // res.status(204).end();
    res.json({});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
