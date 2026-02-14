import { OnInit, ElementRef, OnDestroy } from '@angular/core';
import { BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import type { Route } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import type { IconType } from '../../types/icons';
import * as i0 from "@angular/core";
export interface MainNavLinkItem {
    text: string;
    href?: string;
    active?: boolean;
    route?: any[];
    routeExtras?: NavigationExtras;
    callbackFn?: () => void;
    htmltarget?: string;
    htmltitle?: string;
    keyboardShortcut?: string;
}
export interface MetanavLinkItem extends MainNavLinkItem {
    icon?: IconType;
    iconOnly?: boolean;
}
export interface LangLinkItem extends MainNavLinkItem {
    languageCode: string;
}
export declare class HeaderComponent implements OnInit, OnDestroy {
    private router;
    private configService;
    private breakpointObserver;
    private cdRef;
    readonly isLoggedIn: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly loginPrefix: import("@angular/core").InputSignal<string>;
    readonly infotextSuffix: import("@angular/core").InputSignal<string>;
    readonly loginName: import("@angular/core").InputSignal<string>;
    readonly menuButtonLabel: import("@angular/core").InputSignal<string>;
    readonly logoutButtonLabel: import("@angular/core").InputSignal<string>;
    readonly loginButtonLabel: import("@angular/core").InputSignal<string>;
    readonly metaItems: import("@angular/core").InputSignal<MetanavLinkItem[]>;
    readonly mainItems: import("@angular/core").InputSignal<MainNavLinkItem[]>;
    readonly langItems: import("@angular/core").InputSignal<LangLinkItem[]>;
    readonly statusIcon: import("@angular/core").InputSignal<IconType>;
    readonly statusText: import("@angular/core").InputSignal<string>;
    readonly ariaLabelNav: import("@angular/core").InputSignal<string>;
    readonly isManagementMode: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly managementModeText: import("@angular/core").InputSignal<string>;
    readonly logoLink: import("@angular/core").InputSignal<string>;
    readonly logoLinkRoute: import("@angular/core").InputSignal<string[] | Route[]>;
    readonly logoLinkRouteExtras: import("@angular/core").InputSignal<NavigationExtras>;
    readonly logoAltText: import("@angular/core").InputSignal<string>;
    readonly headerLogoPath: import("@angular/core").InputSignal<string>;
    readonly headerLogoSmallPath: import("@angular/core").InputSignal<string>;
    readonly headerLogoPathDark: import("@angular/core").InputSignal<string>;
    readonly headerLogoSmallPathDark: import("@angular/core").InputSignal<string>;
    readonly headerLogoTitle: import("@angular/core").InputSignal<string>;
    readonly fullWidth: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly withThemeToggle: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly languageText: import("@angular/core").InputSignal<string>;
    readonly languageCloseBtnText: import("@angular/core").InputSignal<string>;
    readonly darkModeText: import("@angular/core").InputSignal<string>;
    readonly lightModeText: import("@angular/core").InputSignal<string>;
    readonly darkThemeCSSClass: import("@angular/core").InputSignal<string>;
    readonly buttonClick: import("@angular/core").OutputEmitterRef<Event>;
    readonly itemClick: import("@angular/core").OutputEmitterRef<MainNavLinkItem | MetanavLinkItem | LangLinkItem>;
    readonly languageMenu: import("@angular/core").Signal<ElementRef<HTMLElement>>;
    protected readonly breakpoint$: Observable<BreakpointState>;
    protected trackByFn: (index: number) => number;
    protected logoWidth: number;
    protected logoHeight: number;
    protected isExpanded: boolean;
    protected darkMode: boolean;
    protected iconSpritePath: string;
    protected largeScreenBreakpoint: boolean;
    protected langMenuOpen: boolean;
    private breakpoint;
    private subscription;
    private getImageDimensions;
    private showKeyboardshortcutTooltip;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get logoHref(): string;
    protected get themeToggleClass(): string;
    protected handleWindowClick(target: HTMLElement): void;
    /** @internal */
    ngOnInit(): void;
    /** @internal */
    ngOnDestroy(): void;
    protected keyboardShortcutTooltip(item: MainNavLinkItem): string;
    protected getHref(item: MetanavLinkItem | MainNavLinkItem): string;
    protected toggle(): void;
    protected toggleLangMenu(): void;
    protected onLogoClick(e: MouseEvent): void;
    protected toggleDarkMode(): void;
    protected itemClickHandler(e: MouseEvent, item: MetanavLinkItem | MainNavLinkItem | LangLinkItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HeaderComponent, "drv-header", never, { "isLoggedIn": { "alias": "isLoggedIn"; "required": false; "isSignal": true; }; "loginPrefix": { "alias": "loginPrefix"; "required": false; "isSignal": true; }; "infotextSuffix": { "alias": "infotextSuffix"; "required": false; "isSignal": true; }; "loginName": { "alias": "loginName"; "required": false; "isSignal": true; }; "menuButtonLabel": { "alias": "menuButtonLabel"; "required": false; "isSignal": true; }; "logoutButtonLabel": { "alias": "logoutButtonLabel"; "required": false; "isSignal": true; }; "loginButtonLabel": { "alias": "loginButtonLabel"; "required": false; "isSignal": true; }; "metaItems": { "alias": "metaItems"; "required": false; "isSignal": true; }; "mainItems": { "alias": "mainItems"; "required": false; "isSignal": true; }; "langItems": { "alias": "langItems"; "required": false; "isSignal": true; }; "statusIcon": { "alias": "statusIcon"; "required": false; "isSignal": true; }; "statusText": { "alias": "statusText"; "required": false; "isSignal": true; }; "ariaLabelNav": { "alias": "ariaLabelNav"; "required": false; "isSignal": true; }; "isManagementMode": { "alias": "isManagementMode"; "required": false; "isSignal": true; }; "managementModeText": { "alias": "managementModeText"; "required": false; "isSignal": true; }; "logoLink": { "alias": "logoLink"; "required": false; "isSignal": true; }; "logoLinkRoute": { "alias": "logoLinkRoute"; "required": false; "isSignal": true; }; "logoLinkRouteExtras": { "alias": "logoLinkRouteExtras"; "required": false; "isSignal": true; }; "logoAltText": { "alias": "logoAltText"; "required": false; "isSignal": true; }; "headerLogoPath": { "alias": "headerLogoPath"; "required": true; "isSignal": true; }; "headerLogoSmallPath": { "alias": "headerLogoSmallPath"; "required": true; "isSignal": true; }; "headerLogoPathDark": { "alias": "headerLogoPathDark"; "required": false; "isSignal": true; }; "headerLogoSmallPathDark": { "alias": "headerLogoSmallPathDark"; "required": false; "isSignal": true; }; "headerLogoTitle": { "alias": "headerLogoTitle"; "required": false; "isSignal": true; }; "fullWidth": { "alias": "fullWidth"; "required": false; "isSignal": true; }; "withThemeToggle": { "alias": "withThemeToggle"; "required": false; "isSignal": true; }; "languageText": { "alias": "languageText"; "required": false; "isSignal": true; }; "languageCloseBtnText": { "alias": "languageCloseBtnText"; "required": false; "isSignal": true; }; "darkModeText": { "alias": "darkModeText"; "required": false; "isSignal": true; }; "lightModeText": { "alias": "lightModeText"; "required": false; "isSignal": true; }; "darkThemeCSSClass": { "alias": "darkThemeCSSClass"; "required": false; "isSignal": true; }; }, { "buttonClick": "buttonClick"; "itemClick": "itemClick"; }, never, never, true, never>;
}
