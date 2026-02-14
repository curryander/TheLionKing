import { IconlinkComponent, IconLinkData, type IconLinkTarget } from '../iconlink/iconlink.component';
import { NavigationExtras } from '@angular/router';
import { ItemlistComponent } from '../itemlist/itemlist.component';
import type { IconType } from '../../types/icons';
import * as i0 from "@angular/core";
export type LinklistColumns = 1 | 2 | 3 | 4;
export type LinklistType = 'button' | 'anchor';
export type LinklistPositions = 'left' | 'right';
export interface LinklistData {
    icon: IconType;
    text: string;
    target?: IconLinkTarget;
    href?: string;
    route?: any[];
    routeExtras?: NavigationExtras;
    downloadAble?: boolean;
    disabled?: boolean;
    subtitle?: string;
    data?: IconLinkData;
}
export declare class LinklistComponent extends ItemlistComponent {
    readonly columns: import("@angular/core").InputSignalWithTransform<number, LinklistColumns>;
    readonly data: import("@angular/core").InputSignal<LinklistData[]>;
    readonly type: import("@angular/core").InputSignal<LinklistType>;
    readonly iconPosition: import("@angular/core").InputSignal<LinklistPositions>;
    readonly itemClick: import("@angular/core").OutputEmitterRef<{
        item: LinklistData;
        event: MouseEvent;
    }>;
    readonly _links: import("@angular/core").Signal<readonly IconlinkComponent[]>;
    protected trackByFn: (index: number) => number;
    protected onClickHandler(item: LinklistData, event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LinklistComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LinklistComponent, "drv-linklist", never, { "columns": { "alias": "columns"; "required": false; "isSignal": true; }; "data": { "alias": "data"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "iconPosition": { "alias": "iconPosition"; "required": false; "isSignal": true; }; }, { "itemClick": "itemClick"; }, never, never, true, never>;
}
