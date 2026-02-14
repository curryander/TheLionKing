import * as i0 from "@angular/core";
export type CardImageVariant = 'portrait-2x3' | 'portrait-3x4' | 'landscape-4x3' | 'landscape-1x1';
export declare class CardImageComponent {
    readonly variant: import("@angular/core").InputSignal<CardImageVariant>;
    readonly fill: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected get containerCssClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardImageComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardImageComponent, "drv-card-image", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "fill": { "alias": "fill"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
