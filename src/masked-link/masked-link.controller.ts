import { Body, Controller, Get, Param, Post, Put, Query, Res } from "@nestjs/common";
import { MaskedLinkService } from "./masked-link.service";
import { CreateLinkDto } from "./DTOs/create-link.dto";
import { Response } from 'express';
import { ApiResponse } from "./interfaces/apiResponse.interface";

@Controller('l')
export class MaskedLinkController {
    
    constructor (private readonly maskedLinkService: MaskedLinkService) {}

    @Post()
    createLink(@Body() createLinkDTO: CreateLinkDto): ApiResponse {
        try {
            const createdLink = this.maskedLinkService.createLink(createLinkDTO);
            return {
                success: true,
                message: "The link has been created successfully",
                data: createdLink,
            }            
        } catch (error: any) {

            return {
                success: false,
                message: error.message ?? 'The link cannot be created',
                error: {
                    statusCode: error.status ?? 500,
                    timestamp: new Date(),
                },
            }
        }
    }

    @Put(':id')
    invalidateLink(@Param('id') urlId: string): ApiResponse {
        try {
            const invalidateLink = this.maskedLinkService.invalidateLink(urlId);
            return {
                success: true,
                message: "The link has been invalidate",
                data: invalidateLink
            }
        } catch (error: any) {

            return {
                success: false,
                message: error.message ?? 'The link cannot be invalidated',
                error: {
                    statusCode: error.status ?? 500,
                    timestamp: new Date(),
                },
            }
        }
    }

    @Get(':id')
    redirect(
        @Param('id') urlId: string,
        @Query('password') password: string,
        @Res() res: Response
    ) {
        try {
            const link = this.maskedLinkService.getLink(urlId);
            this.maskedLinkService.validateAccess(link, password);
            this.maskedLinkService.registerRedirect(urlId);
    
            return res.redirect(link.target);
        } catch (error: any) {

            return res.status(error.status).json({
                success: false,
                message: error.message ?? 'Cannot redirect to Link',
                error: {
                    statusCode: error.status ?? 500,
                    timestamp: new Date(),
                },
            });
        }
    }

    @Get(':id/stats')
    getStatistics(
        @Param('id') urlId: string
    ): ApiResponse {
        try {
            const stats = this.maskedLinkService.getStats(urlId);
            return {
                success: true,
                data: {
                    redirectCount: stats
                }
            }
        } catch (error: any) {

            return {
                success: false,
                message: error.message ?? 'Statistics cannot be obtained',
                error: {
                    statusCode: error.status ?? 500,
                    timestamp: new Date(),
                },
            }
        }
    }
}
