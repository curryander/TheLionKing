import { TemplateRef, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TableExpandRowComponent implements AfterContentInit {
    readonly cdRef: ChangeDetectorRef;
    readonly buttonLabel: import("@angular/core").InputSignal<string>;
    readonly selected: import("@angular/core").InputSignal<boolean>;
    readonly expandChange: import("@angular/core").OutputEmitterRef<boolean>;
    readonly dblclick: import("@angular/core").OutputEmitterRef<Event>;
    /** @internal */
    readonly rowTemplate: import("@angular/core").Signal<TemplateRef<unknown>>;
    private _expanded;
    get expanded(): boolean;
    set expanded(value: boolean);
    /** @internal */
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableExpandRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableExpandRowComponent, "drv-table-expandrow", never, { "buttonLabel": { "alias": "buttonLabel"; "required": false; "isSignal": true; }; "selected": { "alias": "selected"; "required": false; "isSignal": true; }; "expanded": { "alias": "expanded"; "required": false; }; }, { "expandChange": "expandChange"; "dblclick": "dblclick"; }, never, ["*"], true, never>;
}
