import * as i0 from "@angular/core";
interface ColOptions {
    bleed?: 'left' | 'right' | 'both';
    nobleed?: 'left' | 'right' | 'both';
}
interface ColOptionsDefault extends ColOptions {
    offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
    span: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
}
interface ColOptionsSmall extends ColOptions {
    offset?: 0 | 1 | 2 | 3;
    span: 0 | 1 | 2 | 3 | 4;
}
export declare class ColDirective {
    readonly sm: import("@angular/core").InputSignal<number | ColOptionsSmall>;
    readonly md: import("@angular/core").InputSignal<number | ColOptionsDefault>;
    readonly lg: import("@angular/core").InputSignal<number | ColOptionsDefault>;
    readonly xlg: import("@angular/core").InputSignal<number | ColOptionsDefault>;
    readonly max: import("@angular/core").InputSignal<number | ColOptionsDefault>;
    readonly noGutter: import("@angular/core").InputSignal<"" | "right" | "left" | "both">;
    readonly padding: import("@angular/core").InputSignal<boolean>;
    protected get combinedClassNames(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ColDirective, "[drv-col]", never, { "sm": { "alias": "sm"; "required": false; "isSignal": true; }; "md": { "alias": "md"; "required": false; "isSignal": true; }; "lg": { "alias": "lg"; "required": false; "isSignal": true; }; "xlg": { "alias": "xlg"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; "noGutter": { "alias": "noGutter"; "required": false; "isSignal": true; }; "padding": { "alias": "padding"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
export {};
