import { ElementRef, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { ValueAccessorDirective } from '../../directives/valueaccessor.directive';
import { type AriaAttributes } from '../../types';
import { FormitemComponent } from '../formitem/formitem.component';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/valueaccessor.directive";
export interface DrvComboboxOption {
    value: string;
}
export type ComboboxAutoCompleteOptions = 'list' | 'both' | 'none';
interface ComboBoxAriaAttributes extends AriaAttributes {
    [key: string]: unknown;
    expanded?: boolean | 'true' | 'false';
    hasPopUp?: 'listbox' | 'menu' | 'tree' | 'grid' | 'dialog';
    autocomplete?: ComboboxAutoCompleteOptions;
    controls?: string;
    required?: boolean | 'true' | 'false';
}
interface ComboBoxOptionTemplate extends DrvComboboxOption {
    selected?: boolean;
    hidden?: boolean;
}
export declare class ComboboxComponent extends FormitemComponent implements OnChanges {
    private configService;
    private deviceService;
    readonly valueAccessor: ValueAccessorDirective<string>;
    readonly options: import("@angular/core").InputSignal<DrvComboboxOption[]>;
    readonly label: import("@angular/core").ModelSignal<string>;
    readonly id: import("@angular/core").ModelSignal<string>;
    readonly placeholder: import("@angular/core").ModelSignal<string>;
    readonly selectedText: import("@angular/core").InputSignal<string>;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly required: import("@angular/core").ModelSignal<unknown>;
    readonly toggletip: import("@angular/core").InputSignal<string>;
    readonly toggletipLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipCloseLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipTemplate: import("@angular/core").InputSignal<TemplateRef<unknown>>;
    readonly requiredSign: import("@angular/core").ModelSignal<string>;
    readonly requiredSignTitleAttr: import("@angular/core").InputSignal<string>;
    readonly optionalText: import("@angular/core").ModelSignal<string>;
    readonly visuallyHiddenLabel: import("@angular/core").ModelSignal<boolean>;
    readonly hideToggleButton: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly noResultsText: import("@angular/core").InputSignal<string>;
    readonly toggleButtonLabel: import("@angular/core").InputSignal<string>;
    readonly autoComplete: import("@angular/core").InputSignal<ComboboxAutoCompleteOptions>;
    readonly ariaAttributes: import("@angular/core").InputSignal<AriaAttributes>;
    readonly closed: import("@angular/core").OutputEmitterRef<null>;
    readonly open: import("@angular/core").OutputEmitterRef<null>;
    readonly input: import("@angular/core").Signal<ElementRef<HTMLInputElement>>;
    readonly listbox: import("@angular/core").Signal<ElementRef<HTMLElement>>;
    readonly container: import("@angular/core").Signal<ElementRef<HTMLElement>>;
    readonly listitems: import("@angular/core").Signal<readonly ElementRef<any>[]>;
    protected isOpen: boolean;
    protected templateOptions: ComboBoxOptionTemplate[];
    protected trackByFn: (index: number) => number;
    protected keydownInput: import("../../utilities/utils").ThrottledFunction<unknown[]>;
    protected filterOptions: import("../../utilities/utils").ThrottledFunction<unknown[]>;
    private innerValue?;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get hostRole(): string | null;
    protected get containerCssClasses(): string;
    protected get inputAriaAttributes(): ComboBoxAriaAttributes;
    protected get cssBgClass(): string;
    protected get activeDescendant(): string;
    protected get isMobile(): boolean;
    protected get resultCount(): number;
    protected get noResults(): boolean;
    protected get showButton(): boolean;
    get value(): string;
    set value(value: string);
    protected handleWindowClick(target: HTMLElement): void;
    /**
     * @param {SimpleChanges} changes SimpleChanges
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    protected buttonClickHandler(): void;
    protected clickInput(): void;
    protected selectOption(current: ComboBoxOptionTemplate, next: ComboBoxOptionTemplate): void;
    protected markSearchTerm(text: string): string;
    protected blurHandler(event: FocusEvent): void;
    protected select(event: MouseEvent, index: number): void;
    protected toggle(isOpen?: boolean): void;
    protected setValue(): void;
    protected setValueFromSelect(event: Event): void;
    private filterList;
    private optionMapper;
    private calculatePosition;
    private keydownInputUnthrottled;
    private filterOptionsUnthrottled;
    static ɵfac: i0.ɵɵFactoryDeclaration<ComboboxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ComboboxComponent, "drv-combobox", never, { "options": { "alias": "options"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": true; "isSignal": true; }; "id": { "alias": "id"; "required": true; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "selectedText": { "alias": "selectedText"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "toggletip": { "alias": "toggletip"; "required": false; "isSignal": true; }; "toggletipLabel": { "alias": "toggletipLabel"; "required": false; "isSignal": true; }; "toggletipCloseLabel": { "alias": "toggletipCloseLabel"; "required": false; "isSignal": true; }; "toggletipTemplate": { "alias": "toggletipTemplate"; "required": false; "isSignal": true; }; "requiredSign": { "alias": "requiredSign"; "required": false; "isSignal": true; }; "requiredSignTitleAttr": { "alias": "requiredSignTitleAttr"; "required": false; "isSignal": true; }; "optionalText": { "alias": "optionalText"; "required": false; "isSignal": true; }; "visuallyHiddenLabel": { "alias": "visuallyHiddenLabel"; "required": false; "isSignal": true; }; "hideToggleButton": { "alias": "hideToggleButton"; "required": false; "isSignal": true; }; "noResultsText": { "alias": "noResultsText"; "required": false; "isSignal": true; }; "toggleButtonLabel": { "alias": "toggleButtonLabel"; "required": false; "isSignal": true; }; "autoComplete": { "alias": "autoComplete"; "required": false; "isSignal": true; }; "ariaAttributes": { "alias": "ariaAttributes"; "required": false; "isSignal": true; }; }, { "label": "labelChange"; "id": "idChange"; "placeholder": "placeholderChange"; "disabled": "disabledChange"; "required": "requiredChange"; "requiredSign": "requiredSignChange"; "optionalText": "optionalTextChange"; "visuallyHiddenLabel": "visuallyHiddenLabelChange"; "closed": "closed"; "open": "open"; }, never, never, true, [{ directive: typeof i1.ValueAccessorDirective; inputs: {}; outputs: {}; }]>;
}
export {};
