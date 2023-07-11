import fastify from 'fastify';
import connectDatabase from './database/db';
import dotenv from "dotenv"
const server = fastify();
dotenv.config();
server.get('/', async () => {
  return { message: 'Hello, World!' };
});

const startServer = async () => {
  try {
    await connectDatabase();

    await server.listen(3000);
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();
