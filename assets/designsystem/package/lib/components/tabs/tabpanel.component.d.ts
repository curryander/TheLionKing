import { TemplateRef, AfterContentInit } from '@angular/core';
import type { IconType } from '../../types/icons';
import * as i0 from "@angular/core";
export declare class TabpanelComponent implements AfterContentInit {
    private cdRef;
    readonly title: import("@angular/core").InputSignal<string>;
    readonly icon: import("@angular/core").InputSignal<IconType>;
    readonly active: import("@angular/core").ModelSignal<boolean>;
    /** @internal */
    readonly panelTemplate: import("@angular/core").Signal<TemplateRef<unknown>>;
    /** @internal */
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TabpanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TabpanelComponent, "drv-tabpanel", never, { "title": { "alias": "title"; "required": true; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "active": { "alias": "active"; "required": false; "isSignal": true; }; }, { "active": "activeChange"; }, never, ["*"], true, never>;
}
