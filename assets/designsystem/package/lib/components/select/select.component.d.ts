import { TemplateRef, ElementRef } from '@angular/core';
import { type AriaAttributes } from '../../types';
import { FormitemComponent } from '../formitem/formitem.component';
import { ValueAccessorDirective } from '../../directives/valueaccessor.directive';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/valueaccessor.directive";
export interface SelectBoxOption {
    label: string;
    value: string;
    disabled?: boolean;
}
export declare class SelectBoxComponent extends FormitemComponent {
    readonly valueAccessor: ValueAccessorDirective<string | number | boolean>;
    private configService;
    readonly id: import("@angular/core").InputSignal<string>;
    readonly name: import("@angular/core").InputSignal<string>;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly placeholder: import("@angular/core").InputSignal<string>;
    readonly required: import("@angular/core").ModelSignal<boolean>;
    readonly options: import("@angular/core").InputSignal<SelectBoxOption[]>;
    readonly ariaAttributes: import("@angular/core").InputSignal<AriaAttributes>;
    readonly toggletip: import("@angular/core").InputSignal<string>;
    readonly toggletipLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipCloseLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipTemplate: import("@angular/core").InputSignal<TemplateRef<unknown>>;
    readonly requiredSign: import("@angular/core").ModelSignal<string>;
    readonly requiredSignTitleAttr: import("@angular/core").InputSignal<string>;
    readonly optionalText: import("@angular/core").ModelSignal<string>;
    readonly visuallyHiddenLabel: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly input: import("@angular/core").Signal<ElementRef<any>>;
    protected externalId: string;
    protected trackByFn: (index: number) => number;
    private innerValue;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get containerCssClasses(): string;
    protected get inputAriaAttributes(): AriaAttributes;
    protected get cssElementClass(): string;
    get value(): number | boolean | string;
    set value(value: number | boolean | string);
    protectedonFocusout(event: FocusEvent): void;
    protected entrySelected(value: number | boolean | string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SelectBoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SelectBoxComponent, "drv-select", never, { "id": { "alias": "id"; "required": false; "isSignal": true; }; "name": { "alias": "name"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "options": { "alias": "options"; "required": false; "isSignal": true; }; "ariaAttributes": { "alias": "ariaAttributes"; "required": false; "isSignal": true; }; "toggletip": { "alias": "toggletip"; "required": false; "isSignal": true; }; "toggletipLabel": { "alias": "toggletipLabel"; "required": false; "isSignal": true; }; "toggletipCloseLabel": { "alias": "toggletipCloseLabel"; "required": false; "isSignal": true; }; "toggletipTemplate": { "alias": "toggletipTemplate"; "required": false; "isSignal": true; }; "requiredSign": { "alias": "requiredSign"; "required": false; "isSignal": true; }; "requiredSignTitleAttr": { "alias": "requiredSignTitleAttr"; "required": false; "isSignal": true; }; "optionalText": { "alias": "optionalText"; "required": false; "isSignal": true; }; "visuallyHiddenLabel": { "alias": "visuallyHiddenLabel"; "required": false; "isSignal": true; }; }, { "disabled": "disabledChange"; "required": "requiredChange"; "requiredSign": "requiredSignChange"; "optionalText": "optionalTextChange"; }, never, never, true, [{ directive: typeof i1.ValueAccessorDirective; inputs: {}; outputs: {}; }]>;
}
