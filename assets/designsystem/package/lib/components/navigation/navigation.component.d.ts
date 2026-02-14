import { AfterViewInit, AfterContentInit, OnDestroy, ElementRef } from '@angular/core';
import { type IconType } from '../../types/icons';
import * as i0 from "@angular/core";
interface ActiveNavigationItem {
    label?: string;
    text?: string;
    icon?: IconType;
    badgeNumber?: number;
}
export declare class NavigationComponent implements AfterViewInit, AfterContentInit, OnDestroy {
    readonly navLabel: import("@angular/core").InputSignal<string>;
    readonly navButtonLabel: import("@angular/core").InputSignal<string>;
    readonly showToggleButton: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly toggleButtonText: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly button: import("@angular/core").Signal<ElementRef<any>>;
    private _navs;
    protected isOpen: boolean;
    protected activeItem: ActiveNavigationItem;
    private destroyed$;
    protected handleWindowResize(): void;
    /** @internal */
    ngAfterContentInit(): void;
    /** @internal */
    ngAfterViewInit(): void;
    /** @internal */
    ngOnDestroy(): void;
    protected toggle(): void;
    protected sideMenuCalc(): void;
    private updateNavs;
    private setNavActiveItem;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NavigationComponent, "drv-navigation", never, { "navLabel": { "alias": "navLabel"; "required": true; "isSignal": true; }; "navButtonLabel": { "alias": "navButtonLabel"; "required": false; "isSignal": true; }; "showToggleButton": { "alias": "showToggleButton"; "required": false; "isSignal": true; }; "toggleButtonText": { "alias": "toggleButtonText"; "required": false; "isSignal": true; }; }, {}, ["_navs"], ["*"], true, never>;
}
export {};
