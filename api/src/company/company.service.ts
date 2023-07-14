import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Company } from './schemas/company.schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Query } from 'express-serve-static-core';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: mongoose.Model<Company>,
    private jwtService: JwtService,
  ) { }

  async findAll(query: Query): Promise<Company[]> {
    const resPerPage = 10;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
        name: {
          $regex: query.keyword,
          $options: 'i',
        },
      }
      : {};

    const Companies = await this.companyModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return Companies;
  }

  async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
    const { name, cnpj, social_network, cep, state, city, ownerId, ownerName } = signUpDto;

    const company = await this.companyModel.create({
      name,
      cnpj,
      social_network,
      cep,
      state,
      city,
      ownerId,
      ownerName,
    });

    const message = 'Company created successfully.';

    this.jwtService.sign({ id: company._id });

    return {message};
  }

  async findById(id: Types.ObjectId): Promise<Company> {
    const isValidId = Types.ObjectId.isValid(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter a valid ID.');
    }

    const company = await this.companyModel.findById(id);

    if (!company) {
      throw new NotFoundException('Company not found.');
    }

    return company;
  }

  async updateById(id: mongoose.Types.ObjectId, company: Company): Promise<Company> {
    return await this.companyModel.findByIdAndUpdate(id, company, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: mongoose.Types.ObjectId): Promise<Company> {
    return await this.companyModel.findByIdAndDelete(id);
  }
}
