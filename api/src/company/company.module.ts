import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompaniesService } from './company.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Companieschema } from './schemas/company.schemas';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES'),
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'Company', schema: Companieschema }]),
  ],
  controllers: [CompanyController],
  providers: [CompaniesService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class CompanyModule {}
