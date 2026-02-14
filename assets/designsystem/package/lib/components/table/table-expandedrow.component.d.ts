import { TemplateRef, AfterContentInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TableExpandedRowComponent implements AfterContentInit {
    private cdRef;
    readonly colspan: import("@angular/core").InputSignalWithTransform<number, unknown>;
    /** @internal */
    readonly rowTemplate: import("@angular/core").Signal<TemplateRef<unknown>>;
    /** @internal */
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableExpandedRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableExpandedRowComponent, "drv-table-expandedrow", never, { "colspan": { "alias": "colspan"; "required": true; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
