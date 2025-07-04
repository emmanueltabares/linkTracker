export interface Link {
    target: string;
    link: string;
    password?: string;
    expirationDate?: string;
    redirectCount: number;
    valid: boolean;
}