import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
/** CollapsibleOnlyType breakpointa – when is it a collapsible, when not */
export type CollapsibleOnlyType = 'only-xlg' | 'only-lg' | 'only-md' | 'only-sm';
export declare class CollapsibleComponent {
    readonly buttonText: import("@angular/core").InputSignal<string>;
    readonly collapsibleOnly: import("@angular/core").InputSignal<CollapsibleOnlyType>;
    readonly fullWidthStretch: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly activeStateTemplate: import("@angular/core").InputSignal<TemplateRef<unknown>>;
    protected isOpen: boolean;
    protected get contentClasses(): string;
    protected toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CollapsibleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CollapsibleComponent, "drv-collapsible", never, { "buttonText": { "alias": "buttonText"; "required": false; "isSignal": true; }; "collapsibleOnly": { "alias": "collapsibleOnly"; "required": false; "isSignal": true; }; "fullWidthStretch": { "alias": "fullWidthStretch"; "required": false; "isSignal": true; }; "activeStateTemplate": { "alias": "activeStateTemplate"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
