import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './company.service';
import { Company } from './schemas/company.schemas';
import { SignUpDto } from './dto/signup-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import mongoose from 'mongoose';

@Controller('/company')
export class CompanyController {
  constructor(private readonly Companieservice: CompaniesService) {}
  @Get()
  async getAllCompanies(@Query() query: ExpressQuery): Promise<Company[]> {
    return this.Companieservice.findAll(query);
  }

  @Post('/signup')
  async signUp(
    @Body()
    signUpDto: SignUpDto,
  ): Promise<{ token: string }> {
    return this.Companieservice.signUp(signUpDto);
  }

  @Get('/:id')
  async getCompany(@Param('id') id: mongoose.Types.ObjectId) {
    const company = await this.Companieservice.findById(id);
    return company;
  }

  @Put('/:id')
  async updateCompany(
    @Param('id')
    id: mongoose.Types.ObjectId,
    @Body()
    company: UpdateCompanyDto,
  ): Promise<Company> {
    return this.Companieservice.updateById(id, company);
  }

  @Delete('/:id')
  async deleteCompany(@Param('id') id: mongoose.Types.ObjectId) {
    const company = await this.Companieservice.deleteById(id);
    return company;
  }
}
