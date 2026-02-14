import * as i0 from "@angular/core";
export declare class CardHeaderComponent {
    readonly cardTitle: import("@angular/core").InputSignal<string>;
    readonly cardId: import("@angular/core").InputSignal<string>;
    readonly subtitle: import("@angular/core").InputSignal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardHeaderComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardHeaderComponent, "drv-card-header", never, { "cardTitle": { "alias": "cardTitle"; "required": true; "isSignal": true; }; "cardId": { "alias": "cardId"; "required": true; "isSignal": true; }; "subtitle": { "alias": "subtitle"; "required": false; "isSignal": true; }; }, {}, never, ["drv-checkbox", "drv-radiobutton", "drv-button", "drv-overflowmenu", "*"], true, never>;
}
