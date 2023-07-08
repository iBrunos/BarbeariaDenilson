import { FastifyRequest, FastifyReply } from 'fastify';
import CompanyModel from '../models/company';
import { Document as MongooseDocument } from 'mongoose';

interface ICompany extends MongooseDocument {
  name: string;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    tiktok?: string;
  };
  cnpj: string;
  cep: string;
  state: string;
  city: string;
}

export const createCompany = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { name, socialMedia, cnpj, cep, state, city } = request.body as ICompany;
    const company = new CompanyModel({ name, socialMedia, cnpj, cep, state, city });
    const createdCompany = await company.save();
    reply.code(201).send(createdCompany);
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

export const getCompanies = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const companies = await CompanyModel.find();
    reply.code(200).send(companies);
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

export const getCompanyById = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const { id } = request.params;
    const company = await CompanyModel.findById(id);
    if (company) {
      reply.code(200).send(company);
    } else {
      reply.code(404).send({ error: 'Company not found' });
    }
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

export const updateCompany = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const { id } = request.params;
    const { name, socialMedia, cnpj, cep, state, city } = request.body as ICompany;
    const updatedCompany = await CompanyModel.findByIdAndUpdate(
      id,
      { name, socialMedia, cnpj, cep, state, city },
      { new: true }
    );
    if (updatedCompany) {
      reply.code(200).send(updatedCompany);
    } else {
      reply.code(404).send({ error: 'Company not found' });
    }
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};

export const deleteCompany = async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  try {
    const { id } = request.params;
    const deletedCompany = await CompanyModel.findByIdAndDelete(id);
    if (deletedCompany) {
      reply.code(200).send(deletedCompany);
    } else {
      reply.code(404).send({ error: 'Company not found' });
    }
  } catch (error) {
    reply.code(500).send({ error: 'Internal Server Error' });
  }
};