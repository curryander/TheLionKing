import type { Route } from '@angular/router';
import { PictogramsType } from '../../types/pictograms';
import { NavigationExtras } from '@angular/router';
import { type IconLinkTarget } from '../iconlink/iconlink.component';
import * as i0 from "@angular/core";
export type LinkTargetType = IconLinkTarget;
export declare class TileComponent {
    private router;
    private configService;
    readonly title: import("@angular/core").InputSignal<string>;
    readonly pictogramType: import("@angular/core").InputSignal<PictogramsType>;
    readonly items: import("@angular/core").InputSignal<string[]>;
    readonly href: import("@angular/core").InputSignal<string>;
    readonly route: import("@angular/core").InputSignal<string[] | Route[]>;
    readonly isExternal: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly linkTarget: import("@angular/core").InputSignal<IconLinkTarget>;
    readonly routeExtras: import("@angular/core").InputSignal<NavigationExtras>;
    readonly hideDescriptionTextOnSmall: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    protected iconSpritePath: string;
    protected trackByFn: (index: number) => number;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get getHref(): string;
    protected onClickHandler(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TileComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TileComponent, "drv-tile", never, { "title": { "alias": "title"; "required": true; "isSignal": true; }; "pictogramType": { "alias": "pictogramType"; "required": true; "isSignal": true; }; "items": { "alias": "items"; "required": true; "isSignal": true; }; "href": { "alias": "href"; "required": false; "isSignal": true; }; "route": { "alias": "route"; "required": false; "isSignal": true; }; "isExternal": { "alias": "isExternal"; "required": false; "isSignal": true; }; "linkTarget": { "alias": "linkTarget"; "required": false; "isSignal": true; }; "routeExtras": { "alias": "routeExtras"; "required": false; "isSignal": true; }; "hideDescriptionTextOnSmall": { "alias": "hideDescriptionTextOnSmall"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
