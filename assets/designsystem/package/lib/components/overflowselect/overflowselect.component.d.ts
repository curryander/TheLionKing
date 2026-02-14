import { OnChanges, SimpleChanges, ElementRef, AfterViewInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import type { IconOnlyType as ButtonIconOnlyType, IconPositionType as ButtonIconPositionType, AriaAttributes as ButtonAriaAttributes } from '../button/button.component';
import type { IconType } from '../../types/icons';
import type { OverflowmenuBtnVariant, OverflowmenuPlacing } from '../overflowmenu/overflowmenu.component';
import * as i0 from "@angular/core";
export type OverflowselectPlacing = 'end' | 'start';
export type OverflowselectBtnVariant = 'secondary' | 'tertiary';
export interface OverflowselectOption {
    label?: string;
    value?: string;
    disabled?: boolean;
    selected?: boolean;
    icon?: IconType;
}
interface OverflowselectOptionTemplate extends OverflowselectOption {
    hasFocus?: boolean;
}
type OverflowselectAriaAttributes = ButtonAriaAttributes & {
    activedescendant?: string;
    label?: string;
};
export declare class OverflowselectComponent implements OnChanges, AfterViewInit {
    private elementRef;
    private deviceService;
    readonly placing: import("@angular/core").InputSignal<OverflowmenuPlacing>;
    readonly triggerButtonLabel: import("@angular/core").InputSignal<string>;
    readonly triggerButtonVariant: import("@angular/core").InputSignal<OverflowmenuBtnVariant>;
    readonly triggerButtonIcon: import("@angular/core").InputSignal<IconType>;
    readonly triggerButtonIconOnly: import("@angular/core").InputSignal<ButtonIconOnlyType>;
    readonly triggerButtonIconPosition: import("@angular/core").InputSignal<ButtonIconPositionType>;
    readonly options: import("@angular/core").InputSignal<OverflowselectOption[]>;
    readonly ariaAttributes: import("@angular/core").InputSignal<ButtonAriaAttributes>;
    readonly selectionChange: import("@angular/core").OutputEmitterRef<OverflowselectOption>;
    readonly button: import("@angular/core").Signal<ButtonComponent>;
    readonly listbox: import("@angular/core").Signal<ElementRef<any>>;
    readonly listitems: import("@angular/core").Signal<readonly ElementRef<any>[]>;
    protected isOpen: boolean;
    protected templateOptions: OverflowselectOptionTemplate[];
    protected id: string;
    protected trackByFn: (index: number) => number;
    private typeAheadTerm;
    private tyepAheadTimeout;
    protected get hostRole(): string | null;
    protected get triggerButtonAriaAttributes(): OverflowselectAriaAttributes;
    protected get activeDescendant(): string | null;
    protected get buttonLabel(): string;
    protected get buttonIcon(): IconType;
    protected get isMobile(): boolean;
    /**
     * @param {SimpleChanges} changes SimpleChanges
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    /** @internal */
    ngAfterViewInit(): void;
    protected toggle(isOpen?: boolean, focusInput?: boolean): void;
    protected buttonFocusout(event: FocusEvent): void;
    protected buttonClickHandler(): void;
    protected keydownButton(event: KeyboardEvent): void;
    protected select(index: number): void;
    protected setValueFromSelect(event: Event): void;
    private getNeighbourIndex;
    private selectFromTypeAhead;
    private calculatePosition;
    private focusOption;
    private selectOption;
    static ɵfac: i0.ɵɵFactoryDeclaration<OverflowselectComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OverflowselectComponent, "drv-overflowselect", never, { "placing": { "alias": "placing"; "required": false; "isSignal": true; }; "triggerButtonLabel": { "alias": "triggerButtonLabel"; "required": true; "isSignal": true; }; "triggerButtonVariant": { "alias": "triggerButtonVariant"; "required": false; "isSignal": true; }; "triggerButtonIcon": { "alias": "triggerButtonIcon"; "required": false; "isSignal": true; }; "triggerButtonIconOnly": { "alias": "triggerButtonIconOnly"; "required": false; "isSignal": true; }; "triggerButtonIconPosition": { "alias": "triggerButtonIconPosition"; "required": false; "isSignal": true; }; "options": { "alias": "options"; "required": false; "isSignal": true; }; "ariaAttributes": { "alias": "ariaAttributes"; "required": false; "isSignal": true; }; }, { "selectionChange": "selectionChange"; }, never, never, true, never>;
}
export {};
