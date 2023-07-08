import { FastifyInstance } from 'fastify';
import { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany } from '../controllers/controllerCompany';

const companyRoutes = async (server: FastifyInstance): Promise<void> => {
  server.post('/companies', createCompany);
  server.get('/companies', getCompanies);
  server.get('/companies/:id', getCompanyById);
  server.put('/companies/:id', updateCompany);
  server.delete('/companies/:id', deleteCompany);
};

export default companyRoutes;