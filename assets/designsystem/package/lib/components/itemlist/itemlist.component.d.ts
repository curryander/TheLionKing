import { ItemlistItemComponent } from './itemlistitem.component';
import * as i0 from "@angular/core";
export declare class ItemlistComponent {
    readonly isScrollable: import("@angular/core").InputSignal<boolean>;
    readonly hostClass: import("@angular/core").InputSignal<string>;
    readonly items: import("@angular/core").Signal<readonly ItemlistItemComponent[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ItemlistComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ItemlistComponent, "drv-itemlist", never, { "isScrollable": { "alias": "isScrollable"; "required": false; "isSignal": true; }; "hostClass": { "alias": "hostClass"; "required": false; "isSignal": true; }; }, {}, ["items"], ["*"], true, never>;
}
