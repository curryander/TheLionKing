import { AfterViewInit } from '@angular/core';
import { AccordionComponent } from '../../components/accordion/accordion.component';
import { AriaAccordionItemComponent } from './aria-accordionitem.component';
import { type AriaAttributes } from '../../components/button/button.component';
import * as i0 from "@angular/core";
export declare class AriaAccordionComponent extends AccordionComponent implements AfterViewInit {
    readonly ariaItems: import("@angular/core").Signal<readonly AriaAccordionItemComponent[]>;
    private expandedAriaItems;
    /**
     * @returns {AriaAttributes} aria attributes
     * @internal
     */
    get buttonAriaAttributes(): AriaAttributes;
    /** @internal */
    toggleAll(): void;
    ngAfterViewInit(): void;
    private closeOtherArias;
    private initAriaWatchers;
    static ɵfac: i0.ɵɵFactoryDeclaration<AriaAccordionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AriaAccordionComponent, "drv-aria-accordion", never, {}, {}, ["ariaItems"], ["[headline]", "*"], true, never>;
}
