import { Body, Controller, Get, Param, Post, Query, Res } from "@nestjs/common";
import { MaskedLinkService } from "./masked-link.service";
import { CreateLinkDto } from "./DTOs/create-link.dto";

@Controller('l')
export class MaskedLinkController {
    
    constructor (private readonly maskedLinkService: MaskedLinkService) {}

    @Post()
    createLink(@Body() createLinkDTO: CreateLinkDto) {
        return this.maskedLinkService.createLink(createLinkDTO);
    }

}
