import type { IconType } from '../../types/icons';
import * as i0 from "@angular/core";
export declare class StatusScreenComponent {
    readonly title: import("@angular/core").InputSignal<string>;
    readonly iconLabel: import("@angular/core").InputSignal<string>;
    readonly iconType: import("@angular/core").InputSignal<IconType>;
    readonly buttonLabel: import("@angular/core").InputSignal<string>;
    readonly buttonHref: import("@angular/core").InputSignal<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StatusScreenComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StatusScreenComponent, "drv-statusscreen", never, { "title": { "alias": "title"; "required": true; "isSignal": true; }; "iconLabel": { "alias": "iconLabel"; "required": true; "isSignal": true; }; "iconType": { "alias": "iconType"; "required": false; "isSignal": true; }; "buttonLabel": { "alias": "buttonLabel"; "required": false; "isSignal": true; }; "buttonHref": { "alias": "buttonHref"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
