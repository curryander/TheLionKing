import { ElementRef, AfterViewInit, OnChanges, SimpleChanges, AfterContentInit, TemplateRef } from '@angular/core';
import type { BackgroundUIDarkColor } from '../../types';
import type { IconType } from '../../types/icons';
import * as i0 from "@angular/core";
export type TableHeaderItemCollapseType = 'sm' | 'md' | 'lg' | 'xlg' | 'max';
export type TableHeaderItemOrderType = 'asc' | 'desc';
export type TableHeaderItemUnitType = 'em' | 'rem' | 'px' | '%';
export type TableHeaderItemAlignmentType = 'start' | 'end';
export interface TableHeaderItem {
    id?: string;
    label: string;
    labelHidden?: boolean;
    noSort?: boolean;
    sorted?: boolean;
    order?: TableHeaderItemOrderType;
    width?: {
        unit: TableHeaderItemUnitType;
        value: number;
    };
    collapses?: TableHeaderItemCollapseType;
    mainInfo?: boolean;
    sticky?: boolean;
    alignment?: TableHeaderItemAlignmentType;
    toggletip?: string;
    toggletipTemplate?: TemplateRef<unknown>;
}
export interface SortEvent {
    index: number;
    order: TableHeaderItemOrderType;
}
export declare class TableHeadComponent implements AfterViewInit, OnChanges, AfterContentInit {
    private elementRef;
    readonly data: import("@angular/core").ModelSignal<TableHeaderItem[]>;
    readonly selectable: import("@angular/core").InputSignal<boolean>;
    readonly sortable: import("@angular/core").InputSignal<boolean>;
    readonly expandable: import("@angular/core").InputSignal<boolean>;
    readonly allCheckboxLabel: import("@angular/core").InputSignal<string>;
    readonly expandAllLabel: import("@angular/core").InputSignal<string>;
    readonly expandableMobile: import("@angular/core").InputSignal<boolean>;
    readonly checked: import("@angular/core").InputSignal<boolean>;
    readonly indeterminate: import("@angular/core").InputSignal<boolean>;
    readonly expanded: import("@angular/core").ModelSignal<boolean>;
    readonly tHeadBackgroundUI: import("@angular/core").InputSignal<BackgroundUIDarkColor>;
    readonly toggletipLabel: import("@angular/core").InputSignal<string>;
    readonly toggletipCloseLabel: import("@angular/core").InputSignal<string>;
    readonly sorted: import("@angular/core").OutputEmitterRef<SortEvent>;
    readonly allSelected: import("@angular/core").OutputEmitterRef<boolean>;
    readonly expandChange: import("@angular/core").OutputEmitterRef<boolean>;
    readonly all: import("@angular/core").Signal<ElementRef<any>>;
    protected allId: string;
    protected getCellClass: (item: TableHeaderItem) => string | null;
    protected lastSortedIndex: number | null;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    protected getSort(item: TableHeaderItem): string | null;
    protected getSortIcon(head: TableHeaderItem): IconType;
    protected getWidth(item: TableHeaderItem): string | null;
    protected sortData(index: number): void;
    protected allCheckboxChange(): void;
    protected toggleAllExpandableRows(): void;
    protected trackByFn(index: number): number;
    private setCheckboxState;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableHeadComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableHeadComponent, "drv-thead", never, { "data": { "alias": "data"; "required": false; "isSignal": true; }; "selectable": { "alias": "selectable"; "required": false; "isSignal": true; }; "sortable": { "alias": "sortable"; "required": false; "isSignal": true; }; "expandable": { "alias": "expandable"; "required": false; "isSignal": true; }; "allCheckboxLabel": { "alias": "allCheckboxLabel"; "required": false; "isSignal": true; }; "expandAllLabel": { "alias": "expandAllLabel"; "required": false; "isSignal": true; }; "expandableMobile": { "alias": "expandableMobile"; "required": false; "isSignal": true; }; "checked": { "alias": "checked"; "required": false; "isSignal": true; }; "indeterminate": { "alias": "indeterminate"; "required": false; "isSignal": true; }; "expanded": { "alias": "expanded"; "required": false; "isSignal": true; }; "tHeadBackgroundUI": { "alias": "tHeadBackgroundUI"; "required": false; "isSignal": true; }; "toggletipLabel": { "alias": "toggletipLabel"; "required": false; "isSignal": true; }; "toggletipCloseLabel": { "alias": "toggletipCloseLabel"; "required": false; "isSignal": true; }; }, { "data": "dataChange"; "expanded": "expandedChange"; "sorted": "sorted"; "allSelected": "allSelected"; "expandChange": "expandChange"; }, never, never, true, never>;
}
