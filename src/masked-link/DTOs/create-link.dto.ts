import { IsDateString, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateLinkDto {

    @IsUrl()
    url: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsDateString({}, {
        message: "ExpirationDate must be a valid ISO 8601 date string (ej: 2025-07-01T12:00:00)"
    })
    expirationDate?: string;
}