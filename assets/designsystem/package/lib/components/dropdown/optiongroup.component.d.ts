import { OnChanges } from '@angular/core';
import { DrvDropdownOption } from './dropdown.component';
import * as i0 from "@angular/core";
export declare class OptionGroupComponent implements OnChanges {
    private dropdownService;
    readonly options: import("@angular/core").InputSignal<DrvDropdownOption[]>;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly disabled: import("@angular/core").InputSignal<boolean>;
    private parent;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OptionGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OptionGroupComponent, "drv-optiongroup", never, { "options": { "alias": "options"; "required": true; "isSignal": true; }; "label": { "alias": "label"; "required": true; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
