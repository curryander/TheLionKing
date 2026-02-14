import { TemplateRef, AfterContentInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ItemlistItemComponent implements AfterContentInit {
    private cdRef;
    readonly hostClass: import("@angular/core").InputSignal<string>;
    /** @internal */
    readonly itemTemplate: import("@angular/core").Signal<TemplateRef<unknown>>;
    /** @internal */
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ItemlistItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ItemlistItemComponent, "drv-itemlistitem", never, { "hostClass": { "alias": "hostClass"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
