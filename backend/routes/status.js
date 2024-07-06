import express from 'express';

const router = express.Router();

// Status endpoint
router.get('/', (req, res) => {
  res.send({ 'message': 'Server is running!' });
});

export default router;
