import { ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import type { Route } from '@angular/router';
import type { SymbolsType } from '../../types/symbols';
import * as i0 from "@angular/core";
export declare class ProgressnavNodeComponent implements AfterViewInit, OnInit {
    private router;
    private progressnavService;
    private configService;
    readonly name: import("@angular/core").InputSignal<string>;
    readonly url: import("@angular/core").InputSignal<string>;
    readonly route: import("@angular/core").InputSignal<string[] | Route[]>;
    readonly routeExtras: import("@angular/core").InputSignal<NavigationExtras>;
    readonly completed: import("@angular/core").ModelSignal<boolean>;
    readonly active: import("@angular/core").ModelSignal<boolean>;
    readonly current: import("@angular/core").ModelSignal<boolean>;
    readonly isExpanded: import("@angular/core").ModelSignal<boolean>;
    readonly error: import("@angular/core").ModelSignal<boolean>;
    readonly disabled: import("@angular/core").ModelSignal<string | boolean>;
    readonly expandChange: import("@angular/core").OutputEmitterRef<boolean>;
    readonly itemClick: import("@angular/core").OutputEmitterRef<MouseEvent>;
    readonly labelCompleted: import("@angular/core").InputSignal<string>;
    readonly labelNotCompleted: import("@angular/core").InputSignal<string>;
    readonly toggleButtonLabel: import("@angular/core").InputSignal<string>;
    readonly subnav: import("@angular/core").Signal<any>;
    readonly anchor: import("@angular/core").Signal<ElementRef<any>>;
    /** @internal */
    icon: SymbolsType;
    protected get getIconType(): SymbolsType;
    /** @internal */
    ngOnInit(): void;
    /** @internal */
    ngAfterViewInit(): void;
    protected getHref(): string;
    protected nodeClickHandler(event: MouseEvent): void;
    protected iconClickHandler(e: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProgressnavNodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProgressnavNodeComponent, "drv-progressnavnode", never, { "name": { "alias": "name"; "required": false; "isSignal": true; }; "url": { "alias": "url"; "required": false; "isSignal": true; }; "route": { "alias": "route"; "required": false; "isSignal": true; }; "routeExtras": { "alias": "routeExtras"; "required": false; "isSignal": true; }; "completed": { "alias": "completed"; "required": false; "isSignal": true; }; "active": { "alias": "active"; "required": false; "isSignal": true; }; "current": { "alias": "current"; "required": false; "isSignal": true; }; "isExpanded": { "alias": "isExpanded"; "required": false; "isSignal": true; }; "error": { "alias": "error"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "labelCompleted": { "alias": "labelCompleted"; "required": false; "isSignal": true; }; "labelNotCompleted": { "alias": "labelNotCompleted"; "required": false; "isSignal": true; }; "toggleButtonLabel": { "alias": "toggleButtonLabel"; "required": false; "isSignal": true; }; }, { "completed": "completedChange"; "active": "activeChange"; "current": "currentChange"; "isExpanded": "isExpandedChange"; "error": "errorChange"; "disabled": "disabledChange"; "expandChange": "expandChange"; "itemClick": "itemClick"; }, ["subnav"], never, true, never>;
}
