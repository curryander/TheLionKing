import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { type NavigationExtras } from '@angular/router';
import type { IconType } from '../../types/icons';
import * as i0 from "@angular/core";
export interface NavigationItemAction {
    label: string;
    icon?: IconType;
    callbackFn?: () => void;
    route?: any[];
    routeExtras?: NavigationExtras;
}
export interface NavigationItem {
    text: string;
    icon?: IconType;
    href?: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
    route?: any[];
    routeExtras?: NavigationExtras;
    callbackFn?: () => void;
    badgeNumber?: number;
    active?: boolean;
    actions?: NavigationItemAction[];
}
export declare class NavigationListComponent implements OnChanges {
    private router;
    readonly items: import("@angular/core").InputSignal<NavigationItem[]>;
    readonly actionsTriggerButtonLabel: import("@angular/core").InputSignal<string>;
    readonly showTooltips: import("@angular/core").ModelSignal<boolean>;
    readonly overFlowMenuClick: import("@angular/core").OutputEmitterRef<[number, number]>;
    itemClick: EventEmitter<NavigationItemAction | NavigationItem>;
    itemChange: EventEmitter<any>;
    protected trackByFn: (index: number) => number;
    protected nanoid: string;
    /**
     * @param {SimpleChanges} changes SimpleChanges
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    protected getHref(item: NavigationItem): string;
    protected overflowMenuClick(itemsIndex: number, actionIndex: number, btn: NavigationItemAction): void;
    protected itemClickHandler(e: MouseEvent, item: NavigationItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NavigationListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NavigationListComponent, "drv-navigation-list", never, { "items": { "alias": "items"; "required": false; "isSignal": true; }; "actionsTriggerButtonLabel": { "alias": "actionsTriggerButtonLabel"; "required": false; "isSignal": true; }; "showTooltips": { "alias": "showTooltips"; "required": false; "isSignal": true; }; }, { "showTooltips": "showTooltipsChange"; "overFlowMenuClick": "overFlowMenuClick"; "itemClick": "itemClick"; "itemChange": "itemChange"; }, never, never, true, never>;
}
