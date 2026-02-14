import { OnInit, ElementRef, AfterViewInit, OnDestroy, AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { TableExpandRowComponent } from './table-expandrow.component';
import { type TableHeaderItem, SortEvent } from './thead.component';
import type { BackgroundUIDarkColor } from '../../types';
import * as i0 from "@angular/core";
export type TableDataBody = (string | number)[];
export interface TableData {
    header: TableHeaderItem[];
    body?: TableDataBody[];
    selectedRows?: number[];
}
export type OnSelectChange = {
    index: number;
    row?: TableDataBody | TableExpandRowComponent;
}[];
export type SortFunction = (body: TableDataBody[], index: number, order: string) => TableDataBody[];
export declare class TableComponent implements OnInit, AfterViewInit, AfterContentInit, OnDestroy, OnChanges {
    private elementRef;
    private configService;
    private cdRef;
    readonly hideCaption: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly sortable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly selectable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly expandableMobile: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly stickyHead: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly fixedHeight: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly mainInfoAsHeaderCell: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly caption: import("@angular/core").InputSignal<string>;
    readonly variant: import("@angular/core").InputSignal<"default" | "condensed">;
    readonly layout: import("@angular/core").InputSignal<"fixed" | "default">;
    readonly tHeadBackgroundUI: import("@angular/core").ModelSignal<BackgroundUIDarkColor>;
    readonly layoutMobile: import("@angular/core").InputSignal<"default" | "stacked" | "stacked-labelled" | "stacked-columns" | "custom-grid">;
    readonly cellAlignmentVertical: import("@angular/core").InputSignal<"top" | "bottom" | "middle">;
    readonly data: import("@angular/core").ModelSignal<TableData>;
    readonly singleCheckboxLabel: import("@angular/core").InputSignal<string>;
    readonly allCheckboxLabel: import("@angular/core").InputSignal<string>;
    readonly expandableBtnLabel: import("@angular/core").InputSignal<string>;
    readonly sorted: import("@angular/core").OutputEmitterRef<SortEvent>;
    readonly selected: import("@angular/core").OutputEmitterRef<OnSelectChange>;
    readonly allSelected: import("@angular/core").OutputEmitterRef<boolean>;
    readonly boxes: import("@angular/core").Signal<readonly ElementRef<any>[]>;
    readonly all: import("@angular/core").Signal<ElementRef<any>>;
    readonly expandRows: import("@angular/core").Signal<readonly any[]>;
    readonly expandableRows: import("@angular/core").Signal<readonly any[]>;
    protected headerId: string;
    protected allId: string;
    protected boxesId: string;
    protected expandedRows: boolean[];
    protected allCheckBoxChecked: boolean;
    protected allCheckBoxIndeterminate: boolean;
    protected getCellClass: (item: TableHeaderItem) => string | null;
    protected trackByFn: (index: number) => number;
    private selectedRows;
    private rowLength;
    private scrollable;
    private observer;
    private destroyed$;
    private initialBody;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get headerClassName(): string;
    protected get selectedRowsfromData(): number[];
    readonly sort: import("@angular/core").InputSignal<SortFunction>;
    /** @internal */
    ngOnInit(): void;
    /** @internal */
    ngAfterContentInit(): void;
    /** @internal */
    ngAfterViewInit(): void;
    /**
     * @param {SimpleChanges} changes SimpleChanges
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    /** @internal */
    ngOnDestroy(): void;
    protected sortData({ index, order }: {
        index: any;
        order: any;
    }): void;
    protected allCheckboxChange(checked: any): void;
    protected checkboxChange(idx: number): void;
    protected getMainInfoLabel(index: number): string;
    protected isMainInfoCell(index: number): boolean;
    protected expandClick(row: TableExpandRowComponent | TableDataBody): void;
    protected expandRowClick(index: number): void;
    protected getInitialBodyIndex(item: TableDataBody): number;
    private setAllCheckboxAndEmit;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableComponent, "drv-table", never, { "hideCaption": { "alias": "hideCaption"; "required": false; "isSignal": true; }; "sortable": { "alias": "sortable"; "required": false; "isSignal": true; }; "selectable": { "alias": "selectable"; "required": false; "isSignal": true; }; "expandableMobile": { "alias": "expandableMobile"; "required": false; "isSignal": true; }; "stickyHead": { "alias": "stickyHead"; "required": false; "isSignal": true; }; "fixedHeight": { "alias": "fixedHeight"; "required": false; "isSignal": true; }; "mainInfoAsHeaderCell": { "alias": "mainInfoAsHeaderCell"; "required": false; "isSignal": true; }; "caption": { "alias": "caption"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "layout": { "alias": "layout"; "required": false; "isSignal": true; }; "tHeadBackgroundUI": { "alias": "tHeadBackgroundUI"; "required": false; "isSignal": true; }; "layoutMobile": { "alias": "layoutMobile"; "required": false; "isSignal": true; }; "cellAlignmentVertical": { "alias": "cellAlignmentVertical"; "required": false; "isSignal": true; }; "data": { "alias": "data"; "required": false; "isSignal": true; }; "singleCheckboxLabel": { "alias": "singleCheckboxLabel"; "required": false; "isSignal": true; }; "allCheckboxLabel": { "alias": "allCheckboxLabel"; "required": false; "isSignal": true; }; "expandableBtnLabel": { "alias": "expandableBtnLabel"; "required": false; "isSignal": true; }; "sort": { "alias": "sort"; "required": false; "isSignal": true; }; }, { "tHeadBackgroundUI": "tHeadBackgroundUIChange"; "data": "dataChange"; "sorted": "sorted"; "selected": "selected"; "allSelected": "allSelected"; }, ["expandRows", "expandableRows"], ["tbody", "thead", "drv-thead"], true, never>;
}
