import { Body, Controller, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { MaskedLinkService } from "./masked-link.service";
import { CreateLinkDto } from "./DTOs/create-link.dto";
import { Response } from 'express';

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

    @Get(':id')
    redirect(
        @Param('id') urlId: string,
        @Query('password') password: string,
        @Res() res: Response
    ) {
        const link = this.maskedLinkService.getLinkByUrlId(urlId);

        this.maskedLinkService.validateAccess(link, password);

        return res.redirect(link.target);
    }
}
