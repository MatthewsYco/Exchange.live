import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Will add modules here once created
// import { UsersModule } from './users/users.module';
// import { InvestModule } from './invest/invest.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'investment_autopilot',
      autoLoadEntities: true,
      synchronize: true, // Use false in prod; true for MVP speed
    }),
    // UsersModule,
    // InvestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
