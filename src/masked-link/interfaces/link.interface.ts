export interface Link {
    id: string;
    target: string;
    link: string;
    password?: string;
    expirationDate?: Date;
    redirectCount: number;
    valid: boolean;
}