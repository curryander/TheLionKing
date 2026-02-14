import { TemplateRef, ElementRef } from '@angular/core';
import { FormitemComponent } from '../formitem/formitem.component';
import { AriaAttributes } from '../../types';
import { ValueAccessorDirective } from '../../directives/valueaccessor.directive';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/valueaccessor.directive";
export type SliderComponentVariant = 'default' | 'small';
export declare class SliderComponent extends FormitemComponent {
    readonly valueAccessor: ValueAccessorDirective<string>;
    private configService;
    readonly name: import("@angular/core").InputSignal<string>;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly min: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly max: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly required: import("@angular/core").ModelSignal<boolean>;
    readonly toggletip: import("@angular/core").InputSignal<string>;
    readonly toggletipLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipCloseLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipTemplate: import("@angular/core").InputSignal<TemplateRef<unknown>>;
    readonly requiredSign: import("@angular/core").ModelSignal<string>;
    readonly requiredSignTitleAttr: import("@angular/core").InputSignal<string>;
    readonly optionalText: import("@angular/core").ModelSignal<string>;
    readonly visuallyHiddenLabel: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly ariaAttributes: import("@angular/core").InputSignal<AriaAttributes>;
    readonly variant: import("@angular/core").InputSignal<SliderComponentVariant>;
    readonly minLabel: import("@angular/core").InputSignal<string>;
    readonly maxLabel: import("@angular/core").InputSignal<string>;
    readonly step: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly hideTextInput: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly input: import("@angular/core").Signal<ElementRef<any>>;
    protected externalId: string;
    readonly numberInput: import("@angular/core").Signal<ElementRef<any>>;
    private innerValue?;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get containerCssClasses(): string;
    protected get cssWrapperClass(): string;
    protected get cssInputClass(): string;
    protected get cssNumberInputClass(): string;
    protected get cssVars(): string;
    protected get inputAriaAttributes(): AriaAttributes;
    protected get getMaxValueLength(): number;
    get value(): string | number;
    set value(value: string);
    protected inputHandler({ target }: {
        target: any;
    }): void;
    protected rangeHandler({ target }: {
        target: any;
    }): void;
    protected onFocusout(event: FocusEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SliderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SliderComponent, "drv-slider", never, { "name": { "alias": "name"; "required": true; "isSignal": true; }; "label": { "alias": "label"; "required": true; "isSignal": true; }; "min": { "alias": "min"; "required": true; "isSignal": true; }; "max": { "alias": "max"; "required": true; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "toggletip": { "alias": "toggletip"; "required": false; "isSignal": true; }; "toggletipLabel": { "alias": "toggletipLabel"; "required": false; "isSignal": true; }; "toggletipCloseLabel": { "alias": "toggletipCloseLabel"; "required": false; "isSignal": true; }; "toggletipTemplate": { "alias": "toggletipTemplate"; "required": false; "isSignal": true; }; "requiredSign": { "alias": "requiredSign"; "required": false; "isSignal": true; }; "requiredSignTitleAttr": { "alias": "requiredSignTitleAttr"; "required": false; "isSignal": true; }; "optionalText": { "alias": "optionalText"; "required": false; "isSignal": true; }; "visuallyHiddenLabel": { "alias": "visuallyHiddenLabel"; "required": false; "isSignal": true; }; "ariaAttributes": { "alias": "ariaAttributes"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "minLabel": { "alias": "minLabel"; "required": false; "isSignal": true; }; "maxLabel": { "alias": "maxLabel"; "required": false; "isSignal": true; }; "step": { "alias": "step"; "required": false; "isSignal": true; }; "hideTextInput": { "alias": "hideTextInput"; "required": false; "isSignal": true; }; }, { "disabled": "disabledChange"; "required": "requiredChange"; "requiredSign": "requiredSignChange"; "optionalText": "optionalTextChange"; }, never, never, true, [{ directive: typeof i1.ValueAccessorDirective; inputs: {}; outputs: {}; }]>;
}
