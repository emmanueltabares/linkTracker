export interface Link {
    id: string;
    target: string;
    link: string;
    password?: string;
    expirationDate?: string;
    redirectCount: number;
    valid: boolean;
}