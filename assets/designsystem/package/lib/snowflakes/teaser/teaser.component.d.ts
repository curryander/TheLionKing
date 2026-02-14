import { NavigationExtras, Route } from '@angular/router';
import { IconLinkTarget } from '../../components/iconlink/iconlink.component';
import * as i0 from "@angular/core";
export declare class TeaserComponent {
    private router;
    readonly title: import("@angular/core").InputSignal<string>;
    readonly teaserText: import("@angular/core").InputSignal<string>;
    readonly linkText: import("@angular/core").InputSignal<string>;
    readonly externalLinkText: import("@angular/core").InputSignal<string>;
    readonly href: import("@angular/core").InputSignal<string>;
    readonly target: import("@angular/core").InputSignal<IconLinkTarget>;
    readonly route: import("@angular/core").InputSignal<string[] | Route[]>;
    readonly routeExtras: import("@angular/core").InputSignal<NavigationExtras>;
    readonly isExternalLink: import("@angular/core").InputSignalWithTransform<boolean, unknown>;
    readonly itemClick: import("@angular/core").OutputEmitterRef<MouseEvent>;
    protected get getHref(): string;
    protected onClickHandler(event: PointerEvent | MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TeaserComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TeaserComponent, "drv-teaser", never, { "title": { "alias": "title"; "required": true; "isSignal": true; }; "teaserText": { "alias": "teaserText"; "required": false; "isSignal": true; }; "linkText": { "alias": "linkText"; "required": true; "isSignal": true; }; "externalLinkText": { "alias": "externalLinkText"; "required": false; "isSignal": true; }; "href": { "alias": "href"; "required": false; "isSignal": true; }; "target": { "alias": "target"; "required": false; "isSignal": true; }; "route": { "alias": "route"; "required": false; "isSignal": true; }; "routeExtras": { "alias": "routeExtras"; "required": false; "isSignal": true; }; "isExternalLink": { "alias": "isExternalLink"; "required": false; "isSignal": true; }; }, { "itemClick": "itemClick"; }, never, ["drv-pictogram, picture, img"], true, never>;
}
