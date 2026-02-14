import * as i0 from "@angular/core";
export type CardVariant = 'default' | 'overlayed-actions';
export declare class CardContentDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<CardContentDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CardContentDirective, "drv-card-content", never, {}, {}, never, never, true, never>;
}
export declare class CardActionsDirective {
    static ɵfac: i0.ɵɵFactoryDeclaration<CardActionsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CardActionsDirective, "drv-card-actions", never, {}, {}, never, never, true, never>;
}
export declare class CardComponent {
    readonly clickable: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly variant: import("@angular/core").InputSignal<CardVariant>;
    readonly cardId: import("@angular/core").InputSignal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardComponent, "drv-card", never, { "clickable": { "alias": "clickable"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "cardId": { "alias": "cardId"; "required": true; "isSignal": true; }; }, {}, never, ["drv-card-header", "drv-card-content", "drv-card-actions"], true, never>;
}
