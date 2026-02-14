import { NavigationExtras } from '@angular/router';
import type { BackgroundUILightDark } from '../../types';
import type { IconType } from '../../types/icons';
import * as i0 from "@angular/core";
export interface FooterLinkItem {
    href?: string;
    text: string;
    htmltarget?: string;
    htmltitle?: string;
    icon?: IconType;
    route?: any[];
    routeExtras?: NavigationExtras;
    callbackFn?: () => void;
}
export declare class FooterComponent {
    private router;
    readonly items: import("@angular/core").InputSignal<FooterLinkItem[]>;
    readonly copyright: import("@angular/core").InputSignal<string>;
    readonly version: import("@angular/core").InputSignal<string>;
    readonly footertext: import("@angular/core").InputSignal<string>;
    readonly columns: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly fullWidth: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly showVersion: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly backgroundUI: import("@angular/core").InputSignal<BackgroundUILightDark>;
    protected trackByFn: (index: number) => number;
    protected getHref(item: FooterLinkItem): string;
    protected itemClickHandler(e: MouseEvent, item: FooterLinkItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FooterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FooterComponent, "drv-footer", never, { "items": { "alias": "items"; "required": false; "isSignal": true; }; "copyright": { "alias": "copyright"; "required": false; "isSignal": true; }; "version": { "alias": "version"; "required": false; "isSignal": true; }; "footertext": { "alias": "footertext"; "required": false; "isSignal": true; }; "columns": { "alias": "columns"; "required": false; "isSignal": true; }; "fullWidth": { "alias": "fullWidth"; "required": false; "isSignal": true; }; "showVersion": { "alias": "showVersion"; "required": false; "isSignal": true; }; "backgroundUI": { "alias": "backgroundUI"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
