import { AfterViewInit } from '@angular/core';
import { AccordionItemComponent } from './accordionitem.component';
import type { AriaAttributes } from '../button/button.component';
import * as i0 from "@angular/core";
export declare class AccordionComponent implements AfterViewInit {
    multiselectable: boolean;
    showToggleAllButton: boolean;
    readonly toggleAllTextOpen: import("@angular/core").InputSignal<string>;
    readonly toggleAllTextClose: import("@angular/core").InputSignal<string>;
    readonly headline: import("@angular/core").InputSignal<string>;
    readonly items: import("@angular/core").Signal<readonly AccordionItemComponent[]>;
    private expandedItems;
    protected get buttonAriaAttributes(): AriaAttributes;
    ngAfterViewInit(): void;
    protected toggleAll(): void;
    private closeOthers;
    private initWatchers;
    static ɵfac: i0.ɵɵFactoryDeclaration<AccordionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AccordionComponent, "drv-accordion", never, { "multiselectable": { "alias": "multiselectable"; "required": false; }; "showToggleAllButton": { "alias": "showToggleAllButton"; "required": false; }; "toggleAllTextOpen": { "alias": "toggleAllTextOpen"; "required": false; "isSignal": true; }; "toggleAllTextClose": { "alias": "toggleAllTextClose"; "required": false; "isSignal": true; }; "headline": { "alias": "headline"; "required": false; "isSignal": true; }; }, {}, ["items"], ["[headline]", "*"], true, never>;
    static ngAcceptInputType_multiselectable: unknown;
    static ngAcceptInputType_showToggleAllButton: unknown;
}
