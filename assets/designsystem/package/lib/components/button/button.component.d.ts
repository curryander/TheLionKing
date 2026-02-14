import { TemplateRef, OnInit, OnDestroy, OnChanges, SimpleChanges, AfterViewInit, ElementRef } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import type { Route } from '@angular/router';
import type { IconType } from '../../types/icons';
import type { BackgroundUI } from '../../types';
import { type PlacementType } from '../tooltip/tooltip.component';
import * as i0 from "@angular/core";
export type AriaPressedType = boolean | 'mixed';
export interface AriaAttributes {
    [key: string]: unknown;
    hasPopUp?: boolean;
    describedBy?: string;
    labelledBy?: string;
    label?: string;
    expanded?: boolean;
    pressed?: AriaPressedType;
    controls?: string;
}
export type IconPositionType = 'left' | 'right';
export type IconOnlyType = 'only' | 'only-xlg' | 'only-lg' | 'only-md' | 'only-sm';
export type FullSizeOptionType = 'full' | 'full-xlg' | 'full-lg' | 'full-md' | 'full-sm';
export type ButtonTypeType = 'button' | 'submit' | 'anchor' | 'input' | 'reset';
export type ButtonKindType = 'primary' | 'secondary' | 'tertiary';
export type ClickFunction = (event: MouseEvent | unknown) => void;
export declare class ButtonComponent implements OnDestroy, OnInit, OnChanges, AfterViewInit {
    tooltip: boolean;
    private router;
    private renderer;
    private configService;
    readonly cssClass: import("@angular/core").ModelSignal<string>;
    readonly type: import("@angular/core").InputSignal<ButtonTypeType>;
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly label: import("@angular/core").InputSignal<string>;
    readonly kind: import("@angular/core").ModelSignal<ButtonKindType>;
    readonly href: import("@angular/core").InputSignal<string>;
    readonly target: import("@angular/core").InputSignal<"_self" | "_blank" | "_parent" | "_top">;
    readonly route: import("@angular/core").InputSignal<string[] | Route[]>;
    readonly routeExtras: import("@angular/core").InputSignal<NavigationExtras>;
    readonly backgroundUI: import("@angular/core").ModelSignal<BackgroundUI>;
    readonly iconPosition: import("@angular/core").ModelSignal<IconPositionType>;
    readonly iconOnly: import("@angular/core").InputSignal<IconOnlyType>;
    readonly iconType: import("@angular/core").InputSignal<IconType>;
    readonly isLoading: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly fullSizeOption: import("@angular/core").InputSignal<FullSizeOptionType>;
    readonly iconCssClass: import("@angular/core").InputSignal<string>;
    readonly tooltipPosition: import("@angular/core").InputSignal<PlacementType>;
    readonly dataAttributes: import("@angular/core").InputSignal<Record<string, unknown>>;
    readonly ariaAttributes: import("@angular/core").ModelSignal<AriaAttributes>;
    readonly keyboardShortcut: import("@angular/core").InputSignal<string>;
    readonly keyboardShortcutText: import("@angular/core").InputSignal<string>;
    readonly miniButton: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly buttonClick: import("@angular/core").OutputEmitterRef<MouseEvent>;
    readonly hostClass: import("@angular/core").InputSignal<string>;
    /** @internal */
    readonly input: import("@angular/core").Signal<ElementRef<any>>;
    /** @internal */
    readonly buttonTemplate: import("@angular/core").Signal<TemplateRef<unknown>>;
    readonly popovertarget: import("@angular/core").InputSignal<string>;
    readonly popovertargetaction: import("@angular/core").InputSignal<string>;
    private tooltipElement;
    private toolTipOptions;
    private showTooltip;
    private hideTooltip;
    private showKeyboardshortcutTooltip;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get combinedClasses(): string;
    protected get iconClassNames(): string;
    protected get getHref(): string;
    protected get keyboardShortcutTextHint(): string;
    readonly click: import("@angular/core").InputSignal<ClickFunction>;
    /** @internal */
    ngOnInit(): void;
    /** @internal */
    ngAfterViewInit(): void;
    /**
     * @param {SimpleChanges} changes SimpleChanges
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    /** @internal */
    ngOnDestroy(): void;
    /**
     * @param {MouseEvent} event MouseEvent
     * @internal
     */
    onClickHandler(event: MouseEvent): void;
    private createTooltipElement;
    private mouseHandler;
    private bindEvents;
    private unbindEvents;
    static ɵfac: i0.ɵɵFactoryDeclaration<ButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ButtonComponent, "drv-button", never, { "tooltip": { "alias": "tooltip"; "required": false; }; "cssClass": { "alias": "cssClass"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "label": { "alias": "label"; "required": true; "isSignal": true; }; "kind": { "alias": "kind"; "required": false; "isSignal": true; }; "href": { "alias": "href"; "required": false; "isSignal": true; }; "target": { "alias": "target"; "required": false; "isSignal": true; }; "route": { "alias": "route"; "required": false; "isSignal": true; }; "routeExtras": { "alias": "routeExtras"; "required": false; "isSignal": true; }; "backgroundUI": { "alias": "backgroundUI"; "required": false; "isSignal": true; }; "iconPosition": { "alias": "iconPosition"; "required": false; "isSignal": true; }; "iconOnly": { "alias": "iconOnly"; "required": false; "isSignal": true; }; "iconType": { "alias": "iconType"; "required": false; "isSignal": true; }; "isLoading": { "alias": "isLoading"; "required": false; "isSignal": true; }; "fullSizeOption": { "alias": "fullSizeOption"; "required": false; "isSignal": true; }; "iconCssClass": { "alias": "iconCssClass"; "required": false; "isSignal": true; }; "tooltipPosition": { "alias": "tooltipPosition"; "required": false; "isSignal": true; }; "dataAttributes": { "alias": "dataAttributes"; "required": false; "isSignal": true; }; "ariaAttributes": { "alias": "ariaAttributes"; "required": false; "isSignal": true; }; "keyboardShortcut": { "alias": "keyboardShortcut"; "required": false; "isSignal": true; }; "keyboardShortcutText": { "alias": "keyboardShortcutText"; "required": false; "isSignal": true; }; "miniButton": { "alias": "miniButton"; "required": false; "isSignal": true; }; "hostClass": { "alias": "hostClass"; "required": false; "isSignal": true; }; "popovertarget": { "alias": "popovertarget"; "required": false; "isSignal": true; }; "popovertargetaction": { "alias": "popovertargetaction"; "required": false; "isSignal": true; }; "click": { "alias": "click"; "required": false; "isSignal": true; }; }, { "cssClass": "cssClassChange"; "kind": "kindChange"; "backgroundUI": "backgroundUIChange"; "iconPosition": "iconPositionChange"; "ariaAttributes": "ariaAttributesChange"; "buttonClick": "buttonClick"; }, never, never, true, never>;
    static ngAcceptInputType_tooltip: unknown;
}
