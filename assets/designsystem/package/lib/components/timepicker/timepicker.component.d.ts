import { AfterViewInit, OnChanges, SimpleChanges, ElementRef, TemplateRef, OnDestroy } from '@angular/core';
import { FormitemComponent } from '../formitem/formitem.component';
import { ValueAccessorDirective } from '../../directives/valueaccessor.directive';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/valueaccessor.directive";
export declare class TimePickerComponent extends FormitemComponent implements AfterViewInit, OnChanges, OnDestroy {
    private configService;
    private elementRef;
    readonly valueAccessor: ValueAccessorDirective<string>;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly required: import("@angular/core").ModelSignal<boolean>;
    readonly native: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly inline: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly pickrLocale: import("@angular/core").InputSignal<any>;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly nextMonthButtonLabel: import("@angular/core").InputSignal<string>;
    readonly prevMonthButtonLabel: import("@angular/core").InputSignal<string>;
    readonly minuteIncrement: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly placeholder: import("@angular/core").InputSignal<string>;
    readonly toggletip: import("@angular/core").InputSignal<string>;
    readonly toggletipLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipCloseLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipTemplate: import("@angular/core").InputSignal<TemplateRef<unknown>>;
    readonly requiredSign: import("@angular/core").ModelSignal<string>;
    readonly requiredSignTitleAttr: import("@angular/core").InputSignal<string>;
    readonly optionalText: import("@angular/core").ModelSignal<string>;
    readonly visuallyHiddenLabel: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly input: import("@angular/core").Signal<ElementRef<any>>;
    readonly inlineHolder: import("@angular/core").Signal<ElementRef<any>>;
    protected externalId: string;
    protected get containerCssClasses(): string;
    protected iconSpritePath: string;
    private innerValue;
    private instance;
    private changeableOptions;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get cssClasses(): string[];
    protected get describedBy(): string | null;
    protected onFocusout(event: FocusEvent): void;
    /** @internal */
    ngAfterViewInit(): void;
    /**
     * @param {SimpleChanges} changes SimpleChanges
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    /** @internal */
    ngOnDestroy(): void;
    protected onChange({ target }: {
        target: any;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TimePickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TimePickerComponent, "drv-timepicker", never, { "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "native": { "alias": "native"; "required": false; "isSignal": true; }; "inline": { "alias": "inline"; "required": false; "isSignal": true; }; "pickrLocale": { "alias": "pickrLocale"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "nextMonthButtonLabel": { "alias": "nextMonthButtonLabel"; "required": false; "isSignal": true; }; "prevMonthButtonLabel": { "alias": "prevMonthButtonLabel"; "required": false; "isSignal": true; }; "minuteIncrement": { "alias": "minuteIncrement"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "toggletip": { "alias": "toggletip"; "required": false; "isSignal": true; }; "toggletipLabel": { "alias": "toggletipLabel"; "required": false; "isSignal": true; }; "toggletipCloseLabel": { "alias": "toggletipCloseLabel"; "required": false; "isSignal": true; }; "toggletipTemplate": { "alias": "toggletipTemplate"; "required": false; "isSignal": true; }; "requiredSign": { "alias": "requiredSign"; "required": false; "isSignal": true; }; "requiredSignTitleAttr": { "alias": "requiredSignTitleAttr"; "required": false; "isSignal": true; }; "optionalText": { "alias": "optionalText"; "required": false; "isSignal": true; }; "visuallyHiddenLabel": { "alias": "visuallyHiddenLabel"; "required": false; "isSignal": true; }; }, { "disabled": "disabledChange"; "required": "requiredChange"; "requiredSign": "requiredSignChange"; "optionalText": "optionalTextChange"; }, never, never, true, [{ directive: typeof i1.ValueAccessorDirective; inputs: {}; outputs: {}; }]>;
}
