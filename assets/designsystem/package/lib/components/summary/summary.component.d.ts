import * as i0 from "@angular/core";
export type SummaryVariantType = 'smaller' | 'equal';
export type SummaryMainInfoHighlight = 'label' | 'value';
export type SummaryLayoutType = 'block' | 'columns' | 'grid';
export declare class SummaryComponent {
    readonly title: import("@angular/core").InputSignal<string>;
    readonly items: import("@angular/core").InputSignal<Record<string, string>>;
    readonly variant: import("@angular/core").InputSignal<SummaryVariantType>;
    readonly layout: import("@angular/core").InputSignal<SummaryLayoutType>;
    readonly mainInfoHighlight: import("@angular/core").InputSignal<SummaryMainInfoHighlight>;
    protected trackByFn: (index: number) => number;
    get cssClasses(): string;
    protected unsorted(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<SummaryComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SummaryComponent, "drv-summary", never, { "title": { "alias": "title"; "required": false; "isSignal": true; }; "items": { "alias": "items"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "layout": { "alias": "layout"; "required": false; "isSignal": true; }; "mainInfoHighlight": { "alias": "mainInfoHighlight"; "required": false; "isSignal": true; }; }, {}, never, ["drv-buttonbar", "drv-overflowmenu"], true, never>;
}
