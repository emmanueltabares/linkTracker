import { Module } from '@nestjs/common';
import { MaskedLinkModule } from './masked-link/masked-link.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MaskedLinkModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
