export interface AriaAttributes {
    [key: string]: unknown;
    describedby?: string;
    labelledby?: string;
    controls?: string;
    invalid?: boolean | 'true' | 'false';
    pressed?: boolean | 'true' | 'false';
}
