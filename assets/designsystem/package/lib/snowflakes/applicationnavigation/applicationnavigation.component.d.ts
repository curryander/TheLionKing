import { AfterContentInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import type { Route } from '@angular/router';
import { NavigationListComponent } from '../../components/navigation/navigation-list.component';
import * as i0 from "@angular/core";
export declare class ApplicationNavigationComponent implements AfterContentInit {
    private router;
    readonly navs: import("@angular/core").Signal<readonly NavigationListComponent[]>;
    readonly navLabel: import("@angular/core").InputSignal<string>;
    readonly showLogo: import("@angular/core").InputSignal<boolean>;
    readonly isExpandable: import("@angular/core").InputSignal<boolean>;
    readonly expandButtonLabelOpen: import("@angular/core").InputSignal<string>;
    readonly expandButtonLabelClose: import("@angular/core").InputSignal<string>;
    readonly logoLink: import("@angular/core").InputSignal<string>;
    readonly logoLinkRoute: import("@angular/core").InputSignal<string[] | Route[]>;
    readonly logoLinkRouteExtras: import("@angular/core").InputSignal<NavigationExtras>;
    readonly logoLinkTitle: import("@angular/core").InputSignal<string>;
    readonly logoAltText: import("@angular/core").InputSignal<string>;
    protected isOpen: boolean;
    get logoHref(): string;
    ngAfterContentInit(): void;
    protected toggle(): void;
    protected onLogoClick(e: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ApplicationNavigationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ApplicationNavigationComponent, "drv-application-navigation", never, { "navLabel": { "alias": "navLabel"; "required": true; "isSignal": true; }; "showLogo": { "alias": "showLogo"; "required": false; "isSignal": true; }; "isExpandable": { "alias": "isExpandable"; "required": false; "isSignal": true; }; "expandButtonLabelOpen": { "alias": "expandButtonLabelOpen"; "required": false; "isSignal": true; }; "expandButtonLabelClose": { "alias": "expandButtonLabelClose"; "required": false; "isSignal": true; }; "logoLink": { "alias": "logoLink"; "required": false; "isSignal": true; }; "logoLinkRoute": { "alias": "logoLinkRoute"; "required": false; "isSignal": true; }; "logoLinkRouteExtras": { "alias": "logoLinkRouteExtras"; "required": false; "isSignal": true; }; "logoLinkTitle": { "alias": "logoLinkTitle"; "required": false; "isSignal": true; }; "logoAltText": { "alias": "logoAltText"; "required": false; "isSignal": true; }; }, {}, ["navs"], ["*"], true, never>;
}
