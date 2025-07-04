import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateLinkDto } from "./DTOs/create-link.dto";
import { Link } from "./interfaces/link.interface";

import { nanoid } from 'nanoid';

const links: Link[] = [];

@Injectable()
export class MaskedLinkService {

    createLink(createLinkDto: CreateLinkDto): any {
        
        const { url, password, expirationDate } = createLinkDto;
        
        const randomId = this.generateRandomId();
        const maskedUrl = this.maskUrl(randomId);

        const maskedLinkData: Link = {
            id: randomId,
            target: url,
            link: maskedUrl,
            password,
            expirationDate,
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

        return "The link has been invalidated"
    }

    getLinkByUrlId(urlId: string): Link {
        const link = links.find(({ id }) => id === urlId)
        if(!link?.valid)
            throw new BadRequestException("The link not exist or not valid")

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
