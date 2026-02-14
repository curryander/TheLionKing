import { NavigationExtras } from '@angular/router';
import * as i0 from "@angular/core";
export interface BreadcrumbItemInterface {
    title: string;
    href?: string;
    route?: any[];
    routeExtras?: NavigationExtras;
}
export declare class BreadcrumbComponent {
    private router;
    readonly breadcrumbItems: import("@angular/core").InputSignal<BreadcrumbItemInterface[]>;
    readonly breadcrumbAriaLabel: import("@angular/core").InputSignal<string>;
    readonly breadcrumbBackLinkOnly: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected trackByFn: (index: number) => number;
    protected getHref(item: BreadcrumbItemInterface): string;
    protected onClickHandler(item: BreadcrumbItemInterface, e: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreadcrumbComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BreadcrumbComponent, "drv-breadcrumb", never, { "breadcrumbItems": { "alias": "breadcrumbItems"; "required": false; "isSignal": true; }; "breadcrumbAriaLabel": { "alias": "breadcrumbAriaLabel"; "required": false; "isSignal": true; }; "breadcrumbBackLinkOnly": { "alias": "breadcrumbBackLinkOnly"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
