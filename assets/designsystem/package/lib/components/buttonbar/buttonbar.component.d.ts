import * as i0 from "@angular/core";
export type ButtonBarVariant = 'actions' | 'narrow' | 'navigation' | 'navigation-no-line' | '';
export type ButtonBarPlacing = 'start' | 'center' | 'end' | 'space-between' | 'space-between-first' | 'space-between-last';
export type ButtonBarLayoutMobile = 'inline' | 'block' | 'wrap';
export declare class ButtonbarComponent {
    readonly variant: import("@angular/core").InputSignal<ButtonBarVariant>;
    readonly placing: import("@angular/core").InputSignal<ButtonBarPlacing>;
    readonly layoutMobile: import("@angular/core").InputSignal<ButtonBarLayoutMobile>;
    readonly wrap: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected get containerCssClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonbarComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonbarComponent, "drv-buttonbar", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "placing": { "alias": "placing"; "required": false; "isSignal": true; }; "layoutMobile": { "alias": "layoutMobile"; "required": false; "isSignal": true; }; "wrap": { "alias": "wrap"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
