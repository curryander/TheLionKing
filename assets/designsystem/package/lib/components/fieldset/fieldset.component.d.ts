import { ElementRef, OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export type FieldsetLegendStyle = 'underlined' | 'none';
export declare class FieldsetComponent implements OnInit {
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly fieldsetTitle: import("@angular/core").InputSignal<string>;
    readonly legendStyle: import("@angular/core").InputSignal<FieldsetLegendStyle>;
    readonly fieldsetElement: import("@angular/core").Signal<ElementRef<any>>;
    readonly id: import("@angular/core").InputSignal<string>;
    private fieldsetService;
    protected get legendCssClasses(): string;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FieldsetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FieldsetComponent, "drv-fieldset", never, { "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "fieldsetTitle": { "alias": "fieldsetTitle"; "required": false; "isSignal": true; }; "legendStyle": { "alias": "legendStyle"; "required": false; "isSignal": true; }; "id": { "alias": "id"; "required": false; "isSignal": true; }; }, {}, never, ["[asFieldsetTitle]", "*"], true, never>;
}
