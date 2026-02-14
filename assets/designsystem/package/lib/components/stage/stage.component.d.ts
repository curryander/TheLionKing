import { BackgroundUILightColor } from '../../types';
import { type BreadcrumbItemInterface } from './breadcrumb.component';
import * as i0 from "@angular/core";
export type H1StyleType = 'title-large' | 'title-regular';
export declare class StageComponent {
    readonly headline: import("@angular/core").InputSignal<string>;
    readonly introText: import("@angular/core").InputSignal<string>;
    readonly backgroundUI: import("@angular/core").InputSignal<BackgroundUILightColor>;
    readonly h1Style: import("@angular/core").InputSignal<H1StyleType>;
    readonly breadcrumbItems: import("@angular/core").InputSignal<BreadcrumbItemInterface[]>;
    readonly breadcrumbAriaLabel: import("@angular/core").InputSignal<string>;
    readonly breadcrumbBackLinkOnly: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly fullWidth: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly renderWithGridMarkup: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected get h1CssStyle(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<StageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StageComponent, "drv-stage", never, { "headline": { "alias": "headline"; "required": true; "isSignal": true; }; "introText": { "alias": "introText"; "required": false; "isSignal": true; }; "backgroundUI": { "alias": "backgroundUI"; "required": false; "isSignal": true; }; "h1Style": { "alias": "h1Style"; "required": false; "isSignal": true; }; "breadcrumbItems": { "alias": "breadcrumbItems"; "required": false; "isSignal": true; }; "breadcrumbAriaLabel": { "alias": "breadcrumbAriaLabel"; "required": false; "isSignal": true; }; "breadcrumbBackLinkOnly": { "alias": "breadcrumbBackLinkOnly"; "required": false; "isSignal": true; }; "fullWidth": { "alias": "fullWidth"; "required": false; "isSignal": true; }; "renderWithGridMarkup": { "alias": "renderWithGridMarkup"; "required": false; "isSignal": true; }; }, {}, never, ["drv-richtext"], true, never>;
}
