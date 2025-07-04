import { IsDateString, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateLinkDto {

    @IsUrl()
    url: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsDateString()
    expirationDate?: string;
}