import * as i0 from "@angular/core";
export declare class RowDirective {
    readonly noGutter: import("@angular/core").InputSignal<"" | "right" | "left" | "both">;
    readonly padding: import("@angular/core").InputSignal<boolean>;
    readonly condensed: import("@angular/core").InputSignal<boolean>;
    readonly narrow: import("@angular/core").InputSignal<boolean>;
    protected get combinedClassNames(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<RowDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RowDirective, "[drv-row]", never, { "noGutter": { "alias": "noGutter"; "required": false; "isSignal": true; }; "padding": { "alias": "padding"; "required": false; "isSignal": true; }; "condensed": { "alias": "condensed"; "required": false; "isSignal": true; }; "narrow": { "alias": "narrow"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
