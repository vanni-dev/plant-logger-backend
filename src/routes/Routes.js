import express from 'express';
import cors from 'cors';

import statusRoutes from './status.js';
import plantRoutes from './plants.js';
import logRoutes from './logs.js';
import changeRoutes from './changes.js';

const setupRoutes = (app) => {
  app.use('/', statusRoutes);
  app.use('/status', statusRoutes);
  app.use('/plants', plantRoutes);
  app.use('/logs', logRoutes);
  app.use('/changes', changeRoutes);
};

const setupMiddlewares = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

const setupUploads = (app) => {
  app.use('/uploads', express.static('./uploads'));
};

const setup = (app) => {
  setupMiddlewares(app);
  setupUploads(app);
  setupRoutes(app);
}

const Routes = { setup, setupRoutes, setupMiddlewares, setupUploads };

export default Routes;
