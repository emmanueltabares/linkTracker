import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateLinkDto } from "./DTOs/create-link.dto";
import { Link } from "./interfaces/link.interface";

import { nanoid } from 'nanoid';

const links: Link[] = [];

@Injectable()
export class MaskedLinkService {

    createLink(createLinkDto: CreateLinkDto): any {
        
        const { url, password, expirationDate } = createLinkDto;

        const date = expirationDate ? new Date(expirationDate) : undefined;
        if (date && date.getTime() < new Date().getTime())
            throw new BadRequestException("The expiration date must be greater than the current date")

        const randomId = this.generateRandomId();
        const maskedUrl = this.maskUrl(randomId);

        const maskedLinkData: Link = {
            id: randomId,
            target: url,
            link: maskedUrl,
            password,
            expirationDate: date, 
            redirectCount: 0,
            valid: true
        }
        
        // Add the link to de links list
        links.push(maskedLinkData);

        // Return mask link
        return {
            target: url,
            link: maskedUrl,
            password,
            expirationDate,
            valid: maskedLinkData.valid,
        }
    }

    invalidateLink(urlId: string) {
        const link = this.getLinkByUrlId(urlId)

        link.valid = false;
        link.expirationDate = undefined;

        return link;
    }

    getLinkByUrlId(urlId: string): Link {
        const link = links.find(({ id }) => id === urlId)

        if(!link?.valid)
            throw new NotFoundException("The link does not exist or is invalid")

        return link;
    }

    generateRandomId(): string {
        return nanoid(6);
    }

    maskUrl(urlId: string): string {
        const maskedHost = "localhost"; // sacar de process.env
        const maskedPort = 3000; // Sacar de process.env;
        
        return `http://${maskedHost}:${maskedPort}/l/${urlId}`
    }

    validateAccess(link: Link, password?: string) {
        const foundLink = this.getLinkByUrlId(link.id)

        if(!foundLink.password)
            return;

        if(foundLink.password !== password)
            throw new BadRequestException();

        if(new Date() > foundLink.expirationDate)
            throw new NotFoundException("The link has been expired");
    }

    registerRedirect(urlId: string) {
        const link = this.getLinkByUrlId(urlId)
        link.redirectCount++
    }

    getStats(urlId: string) {
        const link = this.getLinkByUrlId(urlId)
        return link.redirectCount;
    }
}
