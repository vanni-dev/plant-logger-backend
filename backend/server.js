import express from 'express';
import cors from 'cors';

import statusRoutes from './routes/status.js';
import plantRoutes from './routes/plants.js';
import logRoutes from './routes/logs.js';
import changeRoutes from './routes/changes.js';

class Server {
  constructor(port = process.env.PORT || 5000, start=true) {
    this.app = express();
    this.port = port;
    this.setupApp();
    if (start) {
      this.start();
    }
  }

  setupApp() {
    // Middlewares
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //Uploads
    this.app.use('/uploads', express.static('./uploads'));

    // Routes
    this.app.use('/', statusRoutes);
    this.app.use('/status', statusRoutes);
    this.app.use('/plants', plantRoutes);
    this.app.use('/logs', logRoutes);
    this.app.use('/changes', changeRoutes);
  }

  start() {
    try {
      this.serverInstance = this.app.listen(this.port, () => {
        console.log(`Server running on port ${this.port}`);
      });
    } catch (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    }
  }

  close(callback) {
    if (this.serverInstance) {
      this.serverInstance.close((err) => {
        if (err)
          console.error('Error closing server:', err);
        else if (callback && typeof callback === 'function')
          callback();
      });
    }
  }

  getApp() {
    return this.app;
  }
}

export default Server;