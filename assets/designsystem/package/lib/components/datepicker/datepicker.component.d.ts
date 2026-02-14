import { AfterViewInit, OnChanges, SimpleChanges, ElementRef, TemplateRef, OnDestroy } from '@angular/core';
import { ValueAccessorDirective } from '../../directives/valueaccessor.directive';
import { FormitemComponent } from '../formitem/formitem.component';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/valueaccessor.directive";
export type MonthSelectorType = 'static' | 'dropdown';
export interface DateRangeLimit<D = DateOption> {
    from: D;
    to: D;
}
export type DateOption = Date | string | number;
export type DateLimit<D = DateOption> = D | DateRangeLimit<D> | ((date: Date) => boolean);
export declare class DatepickerComponent extends FormitemComponent implements AfterViewInit, OnChanges, OnDestroy {
    private configService;
    readonly valueAccessor: ValueAccessorDirective<string>;
    private elementRef;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly required: import("@angular/core").ModelSignal<unknown>;
    readonly native: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly inline: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly appointments: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly allowInput: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly rangeMode: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly pickrLocale: import("@angular/core").InputSignal<any>;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly minDate: import("@angular/core").InputSignal<string | Date>;
    readonly maxDate: import("@angular/core").InputSignal<string | Date>;
    readonly dateFormat: import("@angular/core").InputSignal<string>;
    readonly altFormat: import("@angular/core").InputSignal<string>;
    readonly altInput: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly disabledDates: import("@angular/core").InputSignal<DateLimit<DateOption>[]>;
    readonly nextMonthButtonLabel: import("@angular/core").InputSignal<string>;
    readonly prevMonthButtonLabel: import("@angular/core").InputSignal<string>;
    readonly collapseMessages: import("@angular/core").ModelSignal<boolean>;
    readonly placeholder: import("@angular/core").InputSignal<string>;
    readonly monthSelectorType: import("@angular/core").InputSignal<MonthSelectorType>;
    /** content of the toggletip, when to show */
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
    private instance;
    private changeableOptions;
    private innerValue?;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get cssInputClass(): string[];
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
    protected setDisabledState(isDisabled: boolean): void;
    protected inputChange({ target }: {
        target: any;
    }): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DatepickerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DatepickerComponent, "drv-datepicker", never, { "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "native": { "alias": "native"; "required": false; "isSignal": true; }; "inline": { "alias": "inline"; "required": false; "isSignal": true; }; "appointments": { "alias": "appointments"; "required": false; "isSignal": true; }; "allowInput": { "alias": "allowInput"; "required": false; "isSignal": true; }; "rangeMode": { "alias": "rangeMode"; "required": false; "isSignal": true; }; "pickrLocale": { "alias": "pickrLocale"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "minDate": { "alias": "minDate"; "required": false; "isSignal": true; }; "maxDate": { "alias": "maxDate"; "required": false; "isSignal": true; }; "dateFormat": { "alias": "dateFormat"; "required": false; "isSignal": true; }; "altFormat": { "alias": "altFormat"; "required": false; "isSignal": true; }; "altInput": { "alias": "altInput"; "required": false; "isSignal": true; }; "disabledDates": { "alias": "disabledDates"; "required": false; "isSignal": true; }; "nextMonthButtonLabel": { "alias": "nextMonthButtonLabel"; "required": false; "isSignal": true; }; "prevMonthButtonLabel": { "alias": "prevMonthButtonLabel"; "required": false; "isSignal": true; }; "collapseMessages": { "alias": "collapseMessages"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "monthSelectorType": { "alias": "monthSelectorType"; "required": false; "isSignal": true; }; "toggletip": { "alias": "toggletip"; "required": false; "isSignal": true; }; "toggletipLabel": { "alias": "toggletipLabel"; "required": false; "isSignal": true; }; "toggletipCloseLabel": { "alias": "toggletipCloseLabel"; "required": false; "isSignal": true; }; "toggletipTemplate": { "alias": "toggletipTemplate"; "required": false; "isSignal": true; }; "requiredSign": { "alias": "requiredSign"; "required": false; "isSignal": true; }; "requiredSignTitleAttr": { "alias": "requiredSignTitleAttr"; "required": false; "isSignal": true; }; "optionalText": { "alias": "optionalText"; "required": false; "isSignal": true; }; "visuallyHiddenLabel": { "alias": "visuallyHiddenLabel"; "required": false; "isSignal": true; }; }, { "disabled": "disabledChange"; "required": "requiredChange"; "collapseMessages": "collapseMessagesChange"; "requiredSign": "requiredSignChange"; "optionalText": "optionalTextChange"; }, never, never, true, [{ directive: typeof i1.ValueAccessorDirective; inputs: {}; outputs: {}; }]>;
}
