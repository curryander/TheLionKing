import { ElementRef, TemplateRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { ValueAccessorDirective } from '../../directives/valueaccessor.directive';
import { type AriaAttributes } from '../../types';
import { FormitemComponent } from '../formitem/formitem.component';
import { OptionGroupComponent } from './optiongroup.component';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/valueaccessor.directive";
type DropdownAriaAttributes = AriaAttributes & {
    expanded?: boolean | 'true' | 'false';
    activedescendant?: string;
    required?: boolean | 'true' | 'false';
};
export interface DrvDropdownOption {
    label?: string;
    value?: string;
    disabled?: boolean;
}
interface DrvDropdownOptionTemplate extends DrvDropdownOption {
    selected?: boolean;
    hasFocus?: boolean;
}
interface DrvDropdownOptionGroupTemplate {
    groupLabel?: string;
    disabled?: boolean;
    options: number[];
}
export declare class DropdownComponent extends FormitemComponent implements OnChanges, OnDestroy {
    private configService;
    private deviceService;
    private dropdownService;
    private cdRef;
    readonly valueAccessor: ValueAccessorDirective<DrvDropdownOption[]>;
    readonly options: import("@angular/core").InputSignal<DrvDropdownOption[]>;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly placeholder: import("@angular/core").InputSignal<string>;
    readonly selectedText: import("@angular/core").InputSignal<string>;
    readonly selectedSuffixText: import("@angular/core").InputSignal<string>;
    readonly multiple: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly required: import("@angular/core").ModelSignal<unknown>;
    readonly toggletip: import("@angular/core").InputSignal<string>;
    readonly toggletipLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipCloseLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipTemplate: import("@angular/core").InputSignal<TemplateRef<unknown>>;
    readonly requiredSign: import("@angular/core").ModelSignal<string>;
    readonly requiredSignTitleAttr: import("@angular/core").InputSignal<string>;
    readonly optionalText: import("@angular/core").ModelSignal<string>;
    readonly visuallyHiddenLabel: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly ariaAttributes: import("@angular/core").InputSignal<AriaAttributes>;
    readonly closed: import("@angular/core").OutputEmitterRef<null>;
    readonly setValueOnBlur: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly input: import("@angular/core").Signal<ElementRef<any>>;
    readonly selectElement: import("@angular/core").Signal<ElementRef<any>>;
    readonly list: import("@angular/core").Signal<ElementRef<any>>;
    readonly listbox: import("@angular/core").Signal<ElementRef<any>>;
    readonly container: import("@angular/core").Signal<ElementRef<any>>;
    readonly listitems: import("@angular/core").Signal<readonly ElementRef<any>[]>;
    readonly templateRef: import("@angular/core").Signal<TemplateRef<any>>;
    protected groups: Set<OptionGroupComponent>;
    protected templateOptions: DrvDropdownOptionTemplate[];
    protected templateGroups: DrvDropdownOptionGroupTemplate[];
    protected isOpen: boolean;
    protected trackByFn: (index: number) => number;
    private innerValue;
    private typeAheadTerm;
    private tyepAheadTimeout;
    private subscription;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get hostRole(): string | null;
    protected get containerCssClasses(): string;
    protected get triggerButtonAriaAttributes(): DropdownAriaAttributes;
    protected get triggerButtonCssClasses(): string[];
    protected get triggerButtonText(): string;
    protected get activeDescendant(): string | null;
    protected get activeDescendantCount(): number;
    protected get isMobile(): boolean;
    get value(): DrvDropdownOption[];
    set value(value: DrvDropdownOption[]);
    protected handleWindowClick(target: Element): void;
    /**
     * @param {SimpleChanges} changes SimpleChanges
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    /** @internal */
    ngOnDestroy(): void;
    protected selectFocusout(event: any): void;
    protected buttonFocusout(event: any): void;
    protected buttonClickHandler(): void;
    protected select(index: number): void;
    protected setValueFromSelect(event: Event): void;
    protected keydownButton(event: KeyboardEvent): void;
    protected toggle(isOpen?: boolean, focusInput?: boolean): void;
    private selectFromTypeAhead;
    private selectOption;
    private getNeighbourIndex;
    private focusOption;
    private setValue;
    private optionMapper;
    private buildOptions;
    private calculatePosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<DropdownComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DropdownComponent, "drv-dropdown", never, { "options": { "alias": "options"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": true; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "selectedText": { "alias": "selectedText"; "required": false; "isSignal": true; }; "selectedSuffixText": { "alias": "selectedSuffixText"; "required": false; "isSignal": true; }; "multiple": { "alias": "multiple"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "toggletip": { "alias": "toggletip"; "required": false; "isSignal": true; }; "toggletipLabel": { "alias": "toggletipLabel"; "required": false; "isSignal": true; }; "toggletipCloseLabel": { "alias": "toggletipCloseLabel"; "required": false; "isSignal": true; }; "toggletipTemplate": { "alias": "toggletipTemplate"; "required": false; "isSignal": true; }; "requiredSign": { "alias": "requiredSign"; "required": false; "isSignal": true; }; "requiredSignTitleAttr": { "alias": "requiredSignTitleAttr"; "required": false; "isSignal": true; }; "optionalText": { "alias": "optionalText"; "required": false; "isSignal": true; }; "visuallyHiddenLabel": { "alias": "visuallyHiddenLabel"; "required": false; "isSignal": true; }; "ariaAttributes": { "alias": "ariaAttributes"; "required": false; "isSignal": true; }; "setValueOnBlur": { "alias": "setValueOnBlur"; "required": false; "isSignal": true; }; }, { "disabled": "disabledChange"; "required": "requiredChange"; "requiredSign": "requiredSignChange"; "optionalText": "optionalTextChange"; "closed": "closed"; }, ["templateRef"], never, true, [{ directive: typeof i1.ValueAccessorDirective; inputs: {}; outputs: {}; }]>;
}
export {};
