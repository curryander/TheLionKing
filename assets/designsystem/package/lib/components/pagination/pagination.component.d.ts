import { OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export type PaginationVariant = 'default' | 'no-line' | 'compact';
export declare class PaginationComponent implements OnChanges {
    readonly variant: import("@angular/core").InputSignal<PaginationVariant>;
    readonly pageText: import("@angular/core").InputSignal<string>;
    readonly prevPageText: import("@angular/core").InputSignal<string>;
    readonly nextPageText: import("@angular/core").InputSignal<string>;
    readonly firstPageText: import("@angular/core").InputSignal<string>;
    readonly lastPageText: import("@angular/core").InputSignal<string>;
    readonly pageFromLabel: import("@angular/core").InputSignal<string>;
    readonly pageMax: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly currentPage: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly firstAndLastButton: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly pageSelect: import("@angular/core").OutputEmitterRef<number>;
    readonly paginationLabel: import("@angular/core").InputSignal<string>;
    protected activePage: number;
    protected trackByFn: (index: number) => number;
    protected get pages(): number[];
    protected get disabledPrev(): boolean;
    protected get disabledNext(): boolean;
    protected get showMorePagesBackwards(): boolean;
    protected get showMorePagesForward(): boolean;
    /**
     * @param {SimpleChanges} changes SimpleChanges
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    protected selectPage(event: MouseEvent, page: number): void;
    protected prev(event: Event): void;
    protected next(event: Event): void;
    protected first(event: Event): void;
    protected last(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaginationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PaginationComponent, "drv-pagination", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "pageText": { "alias": "pageText"; "required": false; "isSignal": true; }; "prevPageText": { "alias": "prevPageText"; "required": false; "isSignal": true; }; "nextPageText": { "alias": "nextPageText"; "required": false; "isSignal": true; }; "firstPageText": { "alias": "firstPageText"; "required": false; "isSignal": true; }; "lastPageText": { "alias": "lastPageText"; "required": false; "isSignal": true; }; "pageFromLabel": { "alias": "pageFromLabel"; "required": false; "isSignal": true; }; "pageMax": { "alias": "pageMax"; "required": false; "isSignal": true; }; "currentPage": { "alias": "currentPage"; "required": false; "isSignal": true; }; "firstAndLastButton": { "alias": "firstAndLastButton"; "required": false; "isSignal": true; }; "paginationLabel": { "alias": "paginationLabel"; "required": true; "isSignal": true; }; }, { "pageSelect": "pageSelect"; }, never, never, true, never>;
}
