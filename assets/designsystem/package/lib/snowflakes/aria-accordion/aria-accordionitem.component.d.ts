import { AfterViewInit, ElementRef } from '@angular/core';
import { AccordionItemComponent } from '../../components/accordion/accordionitem.component';
import * as i0 from "@angular/core";
export declare class AriaAccordionItemComponent extends AccordionItemComponent implements AfterViewInit {
    /** @internal */
    readonly btnElement: import("@angular/core").Signal<ElementRef<any>>;
    readonly itemId: import("@angular/core").InputSignal<string>;
    readonly headingLevel: import("@angular/core").InputSignal<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;
    get open(): boolean | null;
    /** @internal */
    emitToggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AriaAccordionItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AriaAccordionItemComponent, "drv-aria-accordionitem", never, { "itemId": { "alias": "itemId"; "required": false; "isSignal": true; }; "headingLevel": { "alias": "headingLevel"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
