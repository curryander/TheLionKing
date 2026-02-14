import * as i0 from "@angular/core";
export declare class DetailsComponent {
    readonly isOpen: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly title: import("@angular/core").InputSignal<string>;
    readonly toggled: import("@angular/core").OutputEmitterRef<boolean>;
    protected toggleHandler(e: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DetailsComponent, "drv-details", never, { "isOpen": { "alias": "isOpen"; "required": false; "isSignal": true; }; "title": { "alias": "title"; "required": true; "isSignal": true; }; }, { "toggled": "toggled"; }, never, ["*"], true, never>;
}
