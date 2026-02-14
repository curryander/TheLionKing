import type { IconType } from '../../types/icons';
import * as i0 from "@angular/core";
export type StatusLayout = 'block' | 'inline';
export type StatusVariant = 'default' | 'condensed';
export type StatusBgColor = 'ui-01' | 'ui-02' | 'ui-04' | 'ui-05' | 'ui-09' | 'alert' | 'warning' | 'success';
export declare class StatusComponent {
    readonly layout: import("@angular/core").InputSignal<StatusLayout>;
    readonly variant: import("@angular/core").InputSignal<StatusVariant>;
    readonly bgColor: import("@angular/core").InputSignal<StatusBgColor>;
    readonly icon: import("@angular/core").InputSignal<IconType>;
    readonly iconLabel: import("@angular/core").InputSignal<string>;
    protected get containerCssClasses(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<StatusComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StatusComponent, "drv-status", never, { "layout": { "alias": "layout"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "bgColor": { "alias": "bgColor"; "required": false; "isSignal": true; }; "icon": { "alias": "icon"; "required": false; "isSignal": true; }; "iconLabel": { "alias": "iconLabel"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}
