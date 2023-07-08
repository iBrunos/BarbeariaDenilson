import fastify, { FastifyInstance } from 'fastify';
import dotenv from 'dotenv';
import { connectToDatabase } from './database/database';
import companyRoutes from './routes/routeCompany';

dotenv.config();

const server: FastifyInstance = fastify();

// Configurando as rotas da entidade "Company"
companyRoutes(server);

const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase();
    await server.listen(3000, '0.0.0.0');
    console.log('Server listening at port 3000');
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

startServer();