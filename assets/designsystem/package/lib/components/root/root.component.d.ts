import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export interface FieldsetShortcut {
    forward: string;
    backward: string;
}
export declare class RootComponent implements OnInit {
    readonly fieldsetShortCuts: import("@angular/core").InputSignal<FieldsetShortcut>;
    private configService;
    private useReducedMotion;
    private document;
    private renderer;
    private fieldsetService;
    private fieldsets;
    private activeFieldset;
    constructor();
    ngOnInit(): void;
    private handleKeyboardShortcuts;
    static ɵfac: i0.ɵɵFactoryDeclaration<RootComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<RootComponent, "drv-root", never, { "fieldsetShortCuts": { "alias": "fieldsetShortCuts"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
