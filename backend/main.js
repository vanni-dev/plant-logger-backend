import Server from './server.js';

const server = new Server(5000);

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