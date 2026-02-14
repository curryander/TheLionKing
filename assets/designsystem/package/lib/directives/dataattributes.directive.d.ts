import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class DataAttributeDirective implements OnInit {
    private elRef;
    private renderer;
    readonly dataAttributes: import("@angular/core").InputSignal<Record<string, unknown>>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DataAttributeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<DataAttributeDirective, "[data-attributes]", never, { "dataAttributes": { "alias": "data-attributes"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
