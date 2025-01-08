import Server from './server.js';
import 'dotenv/config';

if (!process.env.NODE_PORT) {
  console.error('Environment variable NODE_PORT is required');
  process.exit(1);
}

const server = new Server(process.env.NODE_PORT).start();

process.on('SIGINT', shutdown); 
process.on('SIGTERM', shutdown);
process.on('SIGHUP', shutdown);

async function shutdown() {
  console.log('Received kill signal, shutting down gracefully');
  try {
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  } catch (err) {
    console.error('Error shutting down:', err);
    process.exit(1);
  }
}