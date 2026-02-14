import type { IconType } from '../../types/icons';
import type { BackgroundUI } from '../../types/backgroundUI.type';
import * as i0 from "@angular/core";
export type IcontextTagname = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
export type IcontextVariant = 'default' | 'decorative';
export type IcontextHeadingClass = 'title-regular' | 'title-medium' | 'title-small';
export declare class IcontextComponent {
    readonly iconType: import("@angular/core").InputSignal<IconType>;
    readonly tagName: import("@angular/core").InputSignal<IcontextTagname>;
    readonly backgroundUI: import("@angular/core").InputSignal<BackgroundUI>;
    readonly variant: import("@angular/core").InputSignal<IcontextVariant>;
    private _headingClass;
    get headingClass(): string;
    set headingClass(classes: string);
    static ɵfac: i0.ɵɵFactoryDeclaration<IcontextComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IcontextComponent, "drv-icontext", never, { "iconType": { "alias": "iconType"; "required": true; "isSignal": true; }; "tagName": { "alias": "tagName"; "required": false; "isSignal": true; }; "backgroundUI": { "alias": "backgroundUI"; "required": false; "isSignal": true; }; "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "headingClass": { "alias": "headingClass"; "required": false; }; }, {}, never, ["*"], true, never>;
}
