import { OnInit, OnChanges, ElementRef, SimpleChanges } from '@angular/core';
import { ValueAccessorDirective } from '../../directives/valueaccessor.directive';
import { AriaAttributes, BackgroundUI } from '../../types';
import { ButtonComponent } from '../button/button.component';
import * as i0 from "@angular/core";
import * as i1 from "../../directives/valueaccessor.directive";
export interface FilterOptions {
    label: string;
    value: string;
    selected?: boolean;
    disabled?: boolean;
    hasFocus?: boolean;
}
export declare class FilterComponent implements OnInit, OnChanges {
    private deviceService;
    readonly valueAccessor: ValueAccessorDirective<string[]>;
    readonly id: import("@angular/core").InputSignal<string>;
    readonly buttonText: import("@angular/core").ModelSignal<string>;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly placeholder: import("@angular/core").InputSignal<string>;
    readonly labelVisible: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly disabled: import("@angular/core").ModelSignal<boolean>;
    readonly backgroundUI: import("@angular/core").InputSignal<BackgroundUI>;
    readonly btnResetText: import("@angular/core").InputSignal<string>;
    readonly selectedText: import("@angular/core").InputSignal<string>;
    readonly selectedSuffixText: import("@angular/core").InputSignal<string>;
    readonly selectCount: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly options: import("@angular/core").InputSignal<FilterOptions[]>;
    readonly multiple: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly showResetButton: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly setValueOnBlur: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly closed: import("@angular/core").OutputEmitterRef<null>;
    readonly clear: import("@angular/core").OutputEmitterRef<null>;
    trigger: ElementRef | HTMLElement;
    readonly list: import("@angular/core").Signal<ElementRef<any>>;
    readonly container: import("@angular/core").Signal<ElementRef<any>>;
    readonly selectElement: import("@angular/core").Signal<ElementRef<any>>;
    readonly listitems: import("@angular/core").Signal<readonly ElementRef<any>[]>;
    readonly resetButton: import("@angular/core").Signal<ButtonComponent>;
    protected externalId: string;
    protected hostClass: string;
    protected isOpen: boolean;
    protected trackByFn: (index: number) => number;
    private innerValue?;
    private initialButtonText;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get hostRole(): string | null;
    protected get labelClass(): string;
    protected get triggerButtonAriaAttributes(): AriaAttributes;
    protected get triggerButtonCssClasses(): string;
    protected get activeDescendant(): string;
    protected get selectedOptionCount(): number;
    protected get activeDescendantCount(): number;
    protected get isMobile(): boolean;
    get value(): string[];
    set value(value: string[]);
    protected handleWindowClick(target: MouseEvent): void;
    /** @internal */
    ngOnInit(): void;
    /**
     * @param {SimpleChanges} changes SimpleChanges
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    protected buttonClickHandler(): void;
    protected select(index: number): void;
    protected setValueFromSelect(event: Event): void;
    protected clearValue(): void;
    protected buttonFocusout(event: FocusEvent): void;
    protected resetButtonBlurHandler(event: FocusEvent): void;
    protected keydownButton(event: KeyboardEvent): void;
    protected keydownResetButton(event: KeyboardEvent): void;
    protected keydownButtonNoContent(event: KeyboardEvent): void;
    protected toggle(isOpen?: boolean, focusInput?: boolean): void;
    private getNeighbourIndex;
    protected noContentFocusOut(event: FocusEvent): void;
    private focusOption;
    private selectOption;
    private setValue;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FilterComponent, "drv-filter", never, { "id": { "alias": "id"; "required": true; "isSignal": true; }; "buttonText": { "alias": "buttonText"; "required": true; "isSignal": true; }; "label": { "alias": "label"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "labelVisible": { "alias": "labelVisible"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "backgroundUI": { "alias": "backgroundUI"; "required": false; "isSignal": true; }; "btnResetText": { "alias": "btnResetText"; "required": false; "isSignal": true; }; "selectedText": { "alias": "selectedText"; "required": false; "isSignal": true; }; "selectedSuffixText": { "alias": "selectedSuffixText"; "required": false; "isSignal": true; }; "selectCount": { "alias": "selectCount"; "required": false; "isSignal": true; }; "options": { "alias": "options"; "required": false; "isSignal": true; }; "multiple": { "alias": "multiple"; "required": false; "isSignal": true; }; "showResetButton": { "alias": "showResetButton"; "required": false; "isSignal": true; }; "setValueOnBlur": { "alias": "setValueOnBlur"; "required": false; "isSignal": true; }; }, { "buttonText": "buttonTextChange"; "disabled": "disabledChange"; "closed": "closed"; "clear": "clear"; }, never, ["*"], true, [{ directive: typeof i1.ValueAccessorDirective; inputs: {}; outputs: {}; }]>;
}
