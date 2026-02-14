import { OnInit, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class LabelComponent implements OnInit {
    private elementRef;
    private configService;
    readonly id: import("@angular/core").InputSignal<string>;
    readonly required: import("@angular/core").ModelSignal<unknown>;
    readonly toggletip: import("@angular/core").InputSignal<string>;
    readonly toggletipLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipCloseLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipTemplate: import("@angular/core").InputSignal<TemplateRef<unknown>>;
    readonly requiredSign: import("@angular/core").ModelSignal<string>;
    readonly requiredSignTitleAttr: import("@angular/core").InputSignal<string>;
    readonly optionalText: import("@angular/core").ModelSignal<string>;
    readonly visuallyHidden: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly removeHost: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get combinedClasses(): string;
    /** @internal */
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LabelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LabelComponent, "drv-label", never, { "id": { "alias": "for"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "toggletip": { "alias": "toggletip"; "required": false; "isSignal": true; }; "toggletipLabel": { "alias": "toggletipLabel"; "required": false; "isSignal": true; }; "toggletipCloseLabel": { "alias": "toggletipCloseLabel"; "required": false; "isSignal": true; }; "toggletipTemplate": { "alias": "toggletipTemplate"; "required": false; "isSignal": true; }; "requiredSign": { "alias": "requiredSign"; "required": false; "isSignal": true; }; "requiredSignTitleAttr": { "alias": "requiredSignTitleAttr"; "required": false; "isSignal": true; }; "optionalText": { "alias": "optionalText"; "required": false; "isSignal": true; }; "visuallyHidden": { "alias": "visuallyHidden"; "required": false; "isSignal": true; }; "removeHost": { "alias": "removeHost"; "required": false; "isSignal": true; }; }, { "required": "requiredChange"; "requiredSign": "requiredSignChange"; "optionalText": "optionalTextChange"; }, never, ["*"], true, never>;
}
