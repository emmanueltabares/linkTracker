import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateLinkDto } from "./DTOs/create-link.dto";
import { Link } from "./interfaces/link.interface";

import { nanoid } from 'nanoid';

const links: Link[] = [];

@Injectable()
export class MaskedLinkService {

    createLink(createLinkDto: CreateLinkDto) {
        
        const { url, password, expirationDate } = createLinkDto;

        // Check if the link already exists
        const link = this.findLink(url);
        
        if (link) {
            return "The link already exists";
        }

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
        return maskedLinkData;
    }

    invalidateLink(urlId: string) {
        const link = this.findLink(urlId)

        if(!link)
            throw new NotFoundException("The link provide not exists");

        if(!link.valid)
            return "The link already invalidated"

        link.valid = false;
        link.expirationDate = undefined;

        return "The link has been invalidated"
    }

    findLink(urlId: string): Link {
        return links.find(({ id }) => id === urlId)
    }

    generateRandomId(): string {
        return nanoid(6);
    }

    maskUrl(urlId: string): string {
        const maskedHost = "localhost"; // sacar de process.env
        const maskedPort = 3000; // Sacar de process.env;
        
        return `http://${maskedHost}:${maskedPort}/l/${urlId}`
    }
}
