import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ListComponent implements OnInit {
    private elementRef;
    readonly items: import("@angular/core").InputSignal<string[]>;
    readonly type: import("@angular/core").InputSignal<"check" | "ol" | "ul">;
    readonly removeHost: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected trackByFn: (index: number) => number;
    /** @internal */
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListComponent, "drv-list", never, { "items": { "alias": "items"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "removeHost": { "alias": "removeHost"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
