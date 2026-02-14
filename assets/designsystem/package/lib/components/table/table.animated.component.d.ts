import { OnInit, AfterViewInit } from '@angular/core';
import { TableComponent } from './table.component';
import * as i0 from "@angular/core";
export declare class TableAnimatedComponent extends TableComponent implements OnInit, AfterViewInit {
    private elRef;
    /** @internal */
    animationsDisabled: boolean;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    /** @internal */
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableAnimatedComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableAnimatedComponent, "drv-table-animated", never, {}, {}, never, ["*"], true, never>;
}
