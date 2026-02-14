import { TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, Validator } from '@angular/forms';
import { MaskitoOptions } from '@maskito/core';
import { FormitemComponent } from '../formitem/formitem.component';
import { type AriaAttributes } from '../../types';
import * as i0 from "@angular/core";
type CallbackFunction = () => void;
export declare class InsuranceNumberComponent extends FormitemComponent implements ControlValueAccessor, Validator, OnInit, OnDestroy {
    private controlContainer;
    private configService;
    readonly id: import("@angular/core").InputSignal<string>;
    readonly name: import("@angular/core").InputSignal<string>;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly placeholder: import("@angular/core").InputSignal<string>;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly required: import("@angular/core").ModelSignal<boolean>;
    readonly readonly: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly ariaAttributes: import("@angular/core").InputSignal<AriaAttributes>;
    /** ensures that users type VSNR according to predefined format */
    readonly strict: import("@angular/core").ModelSignal<boolean>;
    /** content of the toggletip */
    readonly toggletip: import("@angular/core").InputSignal<string>;
    readonly toggletipLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipCloseLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipTemplate: import("@angular/core").InputSignal<TemplateRef<unknown>>;
    readonly requiredSign: import("@angular/core").ModelSignal<string>;
    readonly requiredSignTitleAttr: import("@angular/core").InputSignal<string>;
    readonly optionalText: import("@angular/core").ModelSignal<string>;
    readonly visuallyHiddenLabel: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly validationErrorMessage: import("@angular/core").InputSignal<string>;
    readonly requiredErrorMessage: import("@angular/core").InputSignal<string>;
    readonly checksumErrorMessage: import("@angular/core").InputSignal<string>;
    readonly areacodeErrorMessage: import("@angular/core").InputSignal<string>;
    readonly formControlName: import("@angular/core").InputSignal<string>;
    readonly input: import("@angular/core").Signal<{
        nativeElement: HTMLInputElement;
    }>;
    protected externalId: string;
    protected get containerCssClasses(): string;
    readonly maskitoOptions: MaskitoOptions;
    protected maxLength: number;
    private innerValue?;
    private control;
    private onTouchedCallback?;
    private onChangeCallback?;
    private destroyed$;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get inputAriaAttributes(): AriaAttributes;
    protected get cssInputClass(): string;
    get value(): string;
    set value(value: string);
    protected onFocusout(target: HTMLElement): void;
    /**
     * @param {FormControl} control FormControl
     * @returns {Record<string, unknown> | null} Validation result
     * @internal
     */
    validate(control: FormControl): Record<string, unknown> | null;
    /** @internal */
    ngOnInit(): void;
    /** @internal */
    ngOnDestroy(): void;
    /** @internal */
    onBlur(): void;
    /**
     * @param {string} value Value to write
     * @internal
     */
    writeValue(value: string): void;
    /**
     * @param {CallbackFunction} fn Callback function
     * @internal
     */
    registerOnChange(fn: CallbackFunction): void;
    /**
     * @param {CallbackFunction} fn Callback function
     * @internal
     */
    registerOnTouched(fn: CallbackFunction): void;
    /**
     * @param {boolean} isDisabled Is disabled
     * @internal
     */
    setDisabledState(isDisabled: boolean): void;
    protected onInputChange(value: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<InsuranceNumberComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InsuranceNumberComponent, "drv-insurancenumber", never, { "id": { "alias": "id"; "required": false; "isSignal": true; }; "name": { "alias": "name"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "readonly": { "alias": "readonly"; "required": false; "isSignal": true; }; "ariaAttributes": { "alias": "ariaAttributes"; "required": false; "isSignal": true; }; "strict": { "alias": "strict"; "required": false; "isSignal": true; }; "toggletip": { "alias": "toggletip"; "required": false; "isSignal": true; }; "toggletipLabel": { "alias": "toggletipLabel"; "required": false; "isSignal": true; }; "toggletipCloseLabel": { "alias": "toggletipCloseLabel"; "required": false; "isSignal": true; }; "toggletipTemplate": { "alias": "toggletipTemplate"; "required": false; "isSignal": true; }; "requiredSign": { "alias": "requiredSign"; "required": false; "isSignal": true; }; "requiredSignTitleAttr": { "alias": "requiredSignTitleAttr"; "required": false; "isSignal": true; }; "optionalText": { "alias": "optionalText"; "required": false; "isSignal": true; }; "visuallyHiddenLabel": { "alias": "visuallyHiddenLabel"; "required": false; "isSignal": true; }; "validationErrorMessage": { "alias": "validationErrorMessage"; "required": false; "isSignal": true; }; "requiredErrorMessage": { "alias": "requiredErrorMessage"; "required": false; "isSignal": true; }; "checksumErrorMessage": { "alias": "checksumErrorMessage"; "required": false; "isSignal": true; }; "areacodeErrorMessage": { "alias": "areacodeErrorMessage"; "required": false; "isSignal": true; }; "formControlName": { "alias": "formControlName"; "required": false; "isSignal": true; }; }, { "disabled": "disabledChange"; "required": "requiredChange"; "strict": "strictChange"; "requiredSign": "requiredSignChange"; "optionalText": "optionalTextChange"; }, never, never, true, never>;
}
export {};
