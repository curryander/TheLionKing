import { OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export declare class AriaAttributeDirective implements OnChanges {
    private elRef;
    private renderer;
    readonly ariaAttributes: import("@angular/core").InputSignal<Record<string, unknown>>;
    ngOnChanges(changes: SimpleChanges): void;
    private setAttributes;
    static ɵfac: i0.ɵɵFactoryDeclaration<AriaAttributeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AriaAttributeDirective, "[aria-attributes]", never, { "ariaAttributes": { "alias": "aria-attributes"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
