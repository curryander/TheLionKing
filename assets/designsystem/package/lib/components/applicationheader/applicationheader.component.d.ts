import { OnInit, AfterViewInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import * as i0 from "@angular/core";
export type ApplicationHeaderLayout = 'multiline' | 'singleline';
export declare class ApplicationHeaderComponent implements OnInit, AfterViewInit {
    private configService;
    readonly triggerButtonLabel: import("@angular/core").InputSignal<string>;
    readonly appTitle: import("@angular/core").InputSignal<string>;
    readonly pageTitle: import("@angular/core").InputSignal<string>;
    readonly statusText: import("@angular/core").InputSignal<string>;
    readonly headerLogoPath: import("@angular/core").InputSignal<string>;
    readonly fullWidth: import("@angular/core").InputSignal<boolean>;
    readonly showLogo: import("@angular/core").InputSignal<boolean>;
    readonly logoAltText: import("@angular/core").InputSignal<string>;
    readonly clientNumber: import("@angular/core").InputSignal<string>;
    readonly clientName: import("@angular/core").InputSignal<string>;
    readonly layout: import("@angular/core").ModelSignal<ApplicationHeaderLayout>;
    readonly buttons: import("@angular/core").Signal<readonly ButtonComponent[]>;
    protected isOpen: boolean;
    protected logoWidth: number;
    protected logoHeight: number;
    protected initialized: boolean;
    private getImageDimensions;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    /** @internal */
    ngOnInit(): void;
    /** @internal */
    ngAfterViewInit(): void;
    protected toggle(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApplicationHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ApplicationHeaderComponent, "drv-applicationheader", never, { "triggerButtonLabel": { "alias": "triggerButtonLabel"; "required": true; "isSignal": true; }; "appTitle": { "alias": "appTitle"; "required": false; "isSignal": true; }; "pageTitle": { "alias": "pageTitle"; "required": false; "isSignal": true; }; "statusText": { "alias": "statusText"; "required": false; "isSignal": true; }; "headerLogoPath": { "alias": "headerLogoPath"; "required": false; "isSignal": true; }; "fullWidth": { "alias": "fullWidth"; "required": false; "isSignal": true; }; "showLogo": { "alias": "showLogo"; "required": false; "isSignal": true; }; "logoAltText": { "alias": "logoAltText"; "required": false; "isSignal": true; }; "clientNumber": { "alias": "clientNumber"; "required": false; "isSignal": true; }; "clientName": { "alias": "clientName"; "required": false; "isSignal": true; }; "layout": { "alias": "layout"; "required": false; "isSignal": true; }; }, { "layout": "layoutChange"; }, ["buttons"], ["drv-button"], true, never>;
}
