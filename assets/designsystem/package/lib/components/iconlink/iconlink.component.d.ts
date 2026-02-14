import type { IconType } from '../../types/icons';
import { NavigationExtras } from '@angular/router';
import type { Route } from '@angular/router';
import * as i0 from "@angular/core";
export type IconLinkTarget = '_blank' | '_self' | '_parent' | '_top';
export type IconLinkSize = 'default' | 'small';
export type IconLinkVariant = 'inline' | 'block';
export type IconLinkType = 'button' | 'anchor';
export interface IconLinkData {
    id?: string;
    type?: string;
    size?: string;
    info?: string;
}
export declare class IconlinkComponent {
    private router;
    readonly cssClass: import("@angular/core").InputSignal<string>;
    readonly href: import("@angular/core").InputSignal<string>;
    readonly route: import("@angular/core").InputSignal<string[] | Route[]>;
    readonly routeExtras: import("@angular/core").InputSignal<NavigationExtras>;
    readonly subtitle: import("@angular/core").InputSignal<string>;
    readonly externalLinkText: import("@angular/core").InputSignal<string>;
    readonly type: import("@angular/core").InputSignal<IconLinkType>;
    readonly icon: import("@angular/core").InputSignal<IconType>;
    readonly variant: import("@angular/core").InputSignal<IconLinkVariant>;
    readonly size: import("@angular/core").InputSignal<IconLinkSize>;
    readonly target: import("@angular/core").InputSignal<IconLinkTarget>;
    readonly data: import("@angular/core").InputSignal<IconLinkData>;
    readonly downloadAble: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly disabled: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly itemClick: import("@angular/core").OutputEmitterRef<MouseEvent>;
    protected cssPrefix: string;
    protected get elementCssClass(): string;
    protected get getHref(): string;
    protected onClickHandler(event: PointerEvent | MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<IconlinkComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IconlinkComponent, "drv-iconlink", never, { "cssClass": { "alias": "cssClass"; "required": false; "isSignal": true; }; "href": { "alias": "href"; "required": false; "isSignal": true; }; "route": { "alias": "route"; "required": false; "isSignal": true; }; "routeExtras": { "alias": "routeExtras"; "required": false; "isSignal": true; }; "subtitle": { "alias": "subtitle"; "required": false; "isSignal": true; }; "externalLinkText": { "alias": "externalLinkText"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "target": { "alias": "target"; "required": false; "isSignal": true; }; "data": { "alias": "data"; "required": false; "isSignal": true; }; "downloadAble": { "alias": "downloadAble"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; }, { "itemClick": "itemClick"; }, never, ["*"], true, never>;
}
