import { ElementRef, AfterContentInit, AfterViewInit, TemplateRef, OnDestroy } from '@angular/core';
import type { IconType } from '../../types/icons';
import { ButtonComponent, type IconOnlyType, type IconPositionType } from '../button/button.component';
import * as i0 from "@angular/core";
export type OverflowmenuPlacing = 'end' | 'start';
export type OverflowmenuBtnVariant = 'secondary' | 'tertiary';
export declare class OverflowmenuComponent implements AfterContentInit, AfterViewInit, OnDestroy {
    private elementRef;
    private viewContainerRef;
    private document;
    readonly placing: import("@angular/core").InputSignal<OverflowmenuPlacing>;
    readonly triggerButtonLabel: import("@angular/core").InputSignal<string>;
    readonly triggerButtonVariant: import("@angular/core").InputSignal<OverflowmenuBtnVariant>;
    readonly triggerButtonIcon: import("@angular/core").InputSignal<IconType>;
    readonly triggerButtonIconOnly: import("@angular/core").InputSignal<IconOnlyType>;
    readonly triggerButtonIconPosition: import("@angular/core").InputSignal<IconPositionType>;
    readonly buttons: import("@angular/core").Signal<readonly ButtonComponent[]>;
    readonly toggleButton: import("@angular/core").Signal<ElementRef<any>>;
    readonly menuContent: import("@angular/core").Signal<ElementRef<HTMLElement>>;
    readonly templatePortalContent: import("@angular/core").Signal<TemplateRef<unknown>>;
    protected isOpen: boolean;
    protected trackByFn: (index: number) => number;
    private templatePortal;
    private bodyPortalHost;
    private nextElement;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected handleWindowClick(target: HTMLElement): void;
    /** @internal */
    ngAfterContentInit(): void;
    /** @internal */
    ngAfterViewInit(): void;
    /** @internal */
    ngOnDestroy(): void;
    protected toggle(open?: boolean): void;
    protected focusOutButton(): void;
    protected keyDown(event: KeyboardEvent): void;
    private calculatePosition;
    static ɵfac: i0.ɵɵFactoryDeclaration<OverflowmenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<OverflowmenuComponent, "drv-overflowmenu", never, { "placing": { "alias": "placing"; "required": false; "isSignal": true; }; "triggerButtonLabel": { "alias": "triggerButtonLabel"; "required": true; "isSignal": true; }; "triggerButtonVariant": { "alias": "triggerButtonVariant"; "required": false; "isSignal": true; }; "triggerButtonIcon": { "alias": "triggerButtonIcon"; "required": false; "isSignal": true; }; "triggerButtonIconOnly": { "alias": "triggerButtonIconOnly"; "required": false; "isSignal": true; }; "triggerButtonIconPosition": { "alias": "triggerButtonIconPosition"; "required": false; "isSignal": true; }; }, {}, ["buttons"], never, true, never>;
}
