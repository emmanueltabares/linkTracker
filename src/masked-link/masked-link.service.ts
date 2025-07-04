import { Injectable } from "@nestjs/common";
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

        // Mask the link
        const maskedUrl = this.maskUrl(url);

        const maskedLinkData: Link = {
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

    invalidateLink() {
        return "The link has been invalidated"
    }

    findLink(url: string): Link {
        return links.find(({ target }) => target === url)
    }

    maskUrl(url: string): string {
        const maskedUrl = nanoid(6);
        const maskedHost = "localhost"; // sacar de process.env
        const maskedPort = 3000; // Sacar de process.env;
        
        return `http://${maskedHost}:${maskedPort}/l/${maskedUrl}`
    }
}
