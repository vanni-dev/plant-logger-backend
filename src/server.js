import express from 'express';

import Routes from './routes/Routes.js';

class Server {
  constructor(port = process.env.PORT || 5000, start=true) {
    this.app = express();
    this.port = port;
    Routes.setup(this.app);
    if (start) {
      this.start();
    }
  }y

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