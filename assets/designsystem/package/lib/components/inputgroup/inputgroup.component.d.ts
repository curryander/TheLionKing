import { AfterContentInit, OnChanges, TemplateRef, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ValueAccessorDirective } from '../../directives/valueaccessor.directive';
import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { BackgroundUI } from '../../types';
import { FormItemMessage } from '../formitem/formitem.component';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/valueaccessor.directive";
interface InputGroupChild {
    id: string;
    value: string | number;
    checked?: boolean;
    disabled: boolean;
}
export declare class InputGroupComponent implements AfterContentInit, OnChanges, OnDestroy, OnInit {
    readonly valueAccessor: ValueAccessorDirective<(string | number)[]>;
    private configService;
    private inputGroupService;
    readonly id: import("@angular/core").InputSignal<string>;
    readonly name: import("@angular/core").InputSignal<string>;
    readonly innerValue: import("@angular/core").ModelSignal<(string | number)[]>;
    readonly grouplabel: import("@angular/core").InputSignal<string>;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly required: import("@angular/core").ModelSignal<unknown>;
    readonly backgroundUI: import("@angular/core").InputSignal<BackgroundUI>;
    readonly layout: import("@angular/core").InputSignal<"inline" | "block" | "columns">;
    readonly requiredSign: import("@angular/core").ModelSignal<string>;
    readonly requiredSignTitleAttr: import("@angular/core").InputSignal<string>;
    readonly optionalText: import("@angular/core").ModelSignal<string>;
    readonly hasError: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly errorText: import("@angular/core").InputSignal<FormItemMessage[]>;
    readonly errorPrefix: import("@angular/core").InputSignal<string>;
    readonly hasInfo: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly infoText: import("@angular/core").InputSignal<FormItemMessage[]>;
    readonly infoPrefix: import("@angular/core").InputSignal<string>;
    readonly hasWarning: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly warningText: import("@angular/core").InputSignal<FormItemMessage[]>;
    readonly warningPrefix: import("@angular/core").InputSignal<string>;
    readonly toggletip: import("@angular/core").InputSignal<string>;
    readonly toggletipLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipCloseLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipTemplate: import("@angular/core").InputSignal<TemplateRef<unknown>>;
    readonly collapseMessages: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly visuallyHiddenLabel: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly announceChanges: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly wrapper: import("@angular/core").Signal<ElementRef<any>>;
    readonly valueChange: import("@angular/core").OutputEmitterRef<(string | number)[]>;
    /** @internal */
    children: Map<RadiobuttonComponent | CheckboxComponent, InputGroupChild>;
    protected trackByFn: (index: number) => number;
    private checkingState;
    private labelClicked;
    private destroyed$;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    get cssClasses(): string[];
    get isRadioInputGroup(): boolean;
    get isCheckboxInputGroup(): boolean;
    get value(): (string | number)[];
    set value(value: (string | number)[]);
    ngOnInit(): void;
    /** @internal */
    ngAfterContentInit(): void;
    /** @internal */
    ngOnChanges(): void;
    /** @internal */
    ngOnDestroy(): void;
    protected onFocusout(event: FocusEvent): void;
    protected onFocusIn(e: FocusEvent): void;
    protected labelClick({ target }: {
        target: any;
    }): void;
    private setValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<InputGroupComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<InputGroupComponent, "drv-inputgroup", never, { "id": { "alias": "id"; "required": false; "isSignal": true; }; "name": { "alias": "name"; "required": false; "isSignal": true; }; "innerValue": { "alias": "value"; "required": false; "isSignal": true; }; "grouplabel": { "alias": "grouplabel"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "backgroundUI": { "alias": "backgroundUI"; "required": false; "isSignal": true; }; "layout": { "alias": "layout"; "required": false; "isSignal": true; }; "requiredSign": { "alias": "requiredSign"; "required": false; "isSignal": true; }; "requiredSignTitleAttr": { "alias": "requiredSignTitleAttr"; "required": false; "isSignal": true; }; "optionalText": { "alias": "optionalText"; "required": false; "isSignal": true; }; "hasError": { "alias": "hasError"; "required": false; "isSignal": true; }; "errorText": { "alias": "errorText"; "required": false; "isSignal": true; }; "errorPrefix": { "alias": "errorPrefix"; "required": false; "isSignal": true; }; "hasInfo": { "alias": "hasInfo"; "required": false; "isSignal": true; }; "infoText": { "alias": "infoText"; "required": false; "isSignal": true; }; "infoPrefix": { "alias": "infoPrefix"; "required": false; "isSignal": true; }; "hasWarning": { "alias": "hasWarning"; "required": false; "isSignal": true; }; "warningText": { "alias": "warningText"; "required": false; "isSignal": true; }; "warningPrefix": { "alias": "warningPrefix"; "required": false; "isSignal": true; }; "toggletip": { "alias": "toggletip"; "required": false; "isSignal": true; }; "toggletipLabel": { "alias": "toggletipLabel"; "required": false; "isSignal": true; }; "toggletipCloseLabel": { "alias": "toggletipCloseLabel"; "required": false; "isSignal": true; }; "toggletipTemplate": { "alias": "toggletipTemplate"; "required": false; "isSignal": true; }; "collapseMessages": { "alias": "collapseMessages"; "required": false; "isSignal": true; }; "visuallyHiddenLabel": { "alias": "visuallyHiddenLabel"; "required": false; "isSignal": true; }; "announceChanges": { "alias": "announceChanges"; "required": false; "isSignal": true; }; }, { "innerValue": "valueChange"; "disabled": "disabledChange"; "required": "requiredChange"; "requiredSign": "requiredSignChange"; "optionalText": "optionalTextChange"; "valueChange": "valueChange"; }, never, ["*"], true, [{ directive: typeof i1.ValueAccessorDirective; inputs: {}; outputs: {}; }]>;
}
export {};
