import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { MaskedLinkService } from "./masked-link.service";
import { CreateLinkDto } from "./DTOs/create-link.dto";

@Controller('l')
export class MaskedLinkController {
    
    constructor (private readonly maskedLinkService: MaskedLinkService) {}

    @Post()
    createLink(@Body() createLinkDTO: CreateLinkDto) {
        return this.maskedLinkService.createLink(createLinkDTO);
    }

    @Put(':id')
    invalidateLink(@Param('id') urlId: string) {
        return this.maskedLinkService.invalidateLink(urlId);
    }
}
