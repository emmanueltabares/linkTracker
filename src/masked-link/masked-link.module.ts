import { Module } from "@nestjs/common";
import { MaskedLinkController } from "./masked-link.controller";
import { MaskedLinkService } from "./masked-link.service";

@Module({
  imports: [],
  controllers: [MaskedLinkController],
  providers: [MaskedLinkService],
})
export class MaskedLinkModule {}
