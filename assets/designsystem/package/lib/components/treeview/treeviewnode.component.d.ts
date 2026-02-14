import { ElementRef, AfterViewInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import type { Route } from '@angular/router';
import type { IconType } from '../../types/icons';
import * as i0 from "@angular/core";
export declare class TreeViewNodeComponent implements AfterViewInit {
    private router;
    private treeViewService;
    readonly text: import("@angular/core").InputSignal<string>;
    readonly icon: import("@angular/core").InputSignal<IconType>;
    readonly href: import("@angular/core").InputSignal<string>;
    readonly route: import("@angular/core").InputSignal<string[] | Route[]>;
    readonly routeExtras: import("@angular/core").InputSignal<NavigationExtras>;
    readonly badgeNumber: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly active: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly currentPage: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly expandChange: import("@angular/core").OutputEmitterRef<boolean>;
    readonly itemClick: import("@angular/core").OutputEmitterRef<MouseEvent>;
    /** @internal */
    readonly anchor: import("@angular/core").Signal<ElementRef<any>>;
    readonly subtree: import("@angular/core").Signal<any>;
    readonly elRef: ElementRef<any>;
    protected isExpanded: boolean;
    private anchors;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    /** @internal */
    ngAfterViewInit(): void;
    protected getHref(): string;
    protected nodeClickHandler(event: MouseEvent): void;
    protected iconClickHandler(e: PointerEvent | MouseEvent): void;
    protected nodeKeydownHandler(e: KeyboardEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeViewNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TreeViewNodeComponent, "drv-treeviewnode", never, { "text": { "alias": "text"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "href": { "alias": "href"; "required": false; "isSignal": true; }; "route": { "alias": "route"; "required": false; "isSignal": true; }; "routeExtras": { "alias": "routeExtras"; "required": false; "isSignal": true; }; "badgeNumber": { "alias": "badgeNumber"; "required": false; "isSignal": true; }; "active": { "alias": "active"; "required": false; "isSignal": true; }; "currentPage": { "alias": "currentPage"; "required": false; "isSignal": true; }; }, { "expandChange": "expandChange"; "itemClick": "itemClick"; }, ["subtree"], never, true, never>;
}
