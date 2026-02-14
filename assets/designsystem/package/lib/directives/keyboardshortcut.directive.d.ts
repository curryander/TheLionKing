import { OnInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ShortcutDirective implements OnInit {
    private elRef;
    private renderer;
    readonly shortcut: import("@angular/core").InputSignal<string>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ShortcutDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<ShortcutDirective, "[drv-keyshortcuts]", never, { "shortcut": { "alias": "drv-keyshortcuts"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
