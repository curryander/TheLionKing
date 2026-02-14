import * as i0 from "@angular/core";
interface AriaAttributes {
    [key: string]: string | number | undefined;
    label?: string;
    valuetext?: string;
    valuemax: number;
    valuenow: number;
}
export declare class ProgressBarComponent {
    readonly value: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly max: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly ariaLabel: import("@angular/core").InputSignal<string>;
    readonly ariaValuetext: import("@angular/core").InputSignal<string>;
    readonly variant: import("@angular/core").InputSignal<"default" | "sticky">;
    protected isNaN: typeof Number.isNaN;
    get inputAriaAttributes(): AriaAttributes;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProgressBarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProgressBarComponent, "drv-progressbar", never, { "value": { "alias": "value"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "ariaLabel"; "required": false; "isSignal": true; }; "ariaValuetext": { "alias": "ariaValuetext"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
export {};
