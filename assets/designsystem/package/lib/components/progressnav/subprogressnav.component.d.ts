import { TemplateRef, AfterContentInit } from '@angular/core';
import * as i0 from "@angular/core";
export declare class SubProgressnavComponent implements AfterContentInit {
    private cdRef;
    readonly level: import("@angular/core").InputSignalWithTransform<number, unknown>;
    readonly isExpanded: import("@angular/core").ModelSignal<boolean>;
    /** @internal */
    readonly subtreeTemplate: import("@angular/core").Signal<TemplateRef<unknown>>;
    /** @internal */
    readonly items: import("@angular/core").Signal<readonly any[]>;
    protected get styleProps(): string;
    /** @internal */
    ngAfterContentInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SubProgressnavComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SubProgressnavComponent, "drv-subprogressnav", never, { "level": { "alias": "level"; "required": false; "isSignal": true; }; "isExpanded": { "alias": "isExpanded"; "required": false; "isSignal": true; }; }, { "isExpanded": "isExpandedChange"; }, ["items"], ["*"], true, never>;
}
