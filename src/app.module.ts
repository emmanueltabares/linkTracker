import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaskedLinkModule } from './masked-link/masked-link.module';

@Module({
  imports: [
    MaskedLinkModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
