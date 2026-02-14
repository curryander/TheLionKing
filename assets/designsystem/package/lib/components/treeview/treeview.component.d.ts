import { QueryList } from '@angular/core';
import { TreeViewNodeComponent } from './treeviewnode.component';
import * as i0 from "@angular/core";
export declare class TreeViewComponent {
    readonly label: import("@angular/core").InputSignal<string>;
    readonly condensed: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    private activeIndex;
    protected items: QueryList<TreeViewNodeComponent>;
    protected keyEventHandler(e: KeyboardEvent): void;
    protected focusHandler(e: FocusEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TreeViewComponent, "drv-treeview", never, { "label": { "alias": "label"; "required": true; "isSignal": true; }; "condensed": { "alias": "condensed"; "required": false; "isSignal": true; }; }, {}, ["items"], ["*"], true, never>;
}
