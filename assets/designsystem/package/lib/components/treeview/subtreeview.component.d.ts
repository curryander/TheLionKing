import { TemplateRef, AfterContentInit, QueryList } from '@angular/core';
import { TreeViewNodeComponent } from './treeviewnode.component';
import * as i0 from "@angular/core";
export declare class SubTreeViewComponent implements AfterContentInit {
    private cdRef;
    readonly level: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly id: import("@angular/core").InputSignal<string>;
    /** @internal */
    readonly subtreeTemplate: import("@angular/core").Signal<TemplateRef<unknown>>;
    /** @internal */
    items: QueryList<TreeViewNodeComponent>;
    protected get styleProps(): string;
    /** @internal */
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SubTreeViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SubTreeViewComponent, "drv-subtreeview", never, { "level": { "alias": "level"; "required": false; "isSignal": true; }; "id": { "alias": "id"; "required": true; "isSignal": true; }; }, {}, ["items"], ["*"], true, never>;
}
