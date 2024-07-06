import express from 'express';

import statusRoutes from './status.js';
import plantRoutes from './plants.js';
import logRoutes from './logs.js';
import changeRoutes from './changes.js';

const load = (app) => {
  app.use('/', statusRoutes);
  app.use('/status', statusRoutes);
  app.use('/plants', plantRoutes);
  app.use('/logs', logRoutes);
  app.use('/changes', changeRoutes);
};

// Example of an additional useful function
const setupMiddlewares = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // Add more middlewares as needed
};

export {
  load,
  setupMiddlewares
};
