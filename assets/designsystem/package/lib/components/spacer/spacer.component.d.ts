import * as i0 from "@angular/core";
export type SpacerContentPlacing = 'start' | 'center' | 'end' | 'space-between' | 'space-between-first' | 'space-between-last';
export type SpacingVariant = 'default' | 'contents' | 'sections';
export declare class SpacerComponent {
    readonly placing: import("@angular/core").InputSignal<SpacerContentPlacing>;
    readonly variant: import("@angular/core").InputSignal<SpacingVariant>;
    protected get containerCssClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<SpacerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SpacerComponent, "drv-spacer", never, { "placing": { "alias": "placing"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
