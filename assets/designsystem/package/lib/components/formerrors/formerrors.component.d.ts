import * as i0 from "@angular/core";
export interface FormError {
    id: string;
    text: string;
}
export declare class FormerrorsComponent {
    readonly routerLink: import("@angular/core").InputSignal<string[]>;
    readonly errorHeadline: import("@angular/core").InputSignal<string>;
    readonly hintHeadline: import("@angular/core").InputSignal<string>;
    readonly hasErrors: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly hasHints: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected trackByFn: (index: number) => number;
    private _errors;
    private _hints;
    get errors(): FormError[];
    set errors(errorArray: FormError[]);
    get hints(): FormError[];
    set hints(errorArray: FormError[]);
    removeNullValues(array: FormError[]): FormError[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FormerrorsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FormerrorsComponent, "drv-formerrors", never, { "routerLink": { "alias": "routerLink"; "required": false; "isSignal": true; }; "errorHeadline": { "alias": "errorHeadline"; "required": true; "isSignal": true; }; "hintHeadline": { "alias": "hintHeadline"; "required": true; "isSignal": true; }; "hasErrors": { "alias": "hasErrors"; "required": false; "isSignal": true; }; "hasHints": { "alias": "hasHints"; "required": false; "isSignal": true; }; "errors": { "alias": "errors"; "required": false; }; "hints": { "alias": "hints"; "required": false; }; }, {}, never, never, true, never>;
}
