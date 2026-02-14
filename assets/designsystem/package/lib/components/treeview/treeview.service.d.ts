import { ElementRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TreeViewService {
    private anchors;
    private currentPage;
    readonly anchors$: import("rxjs").Observable<ElementRef<any>>;
    readonly currentPage$: import("rxjs").Observable<ElementRef<any>>;
    focusAnchor(anchor: ElementRef): void;
    setCurrentPage(anchor: ElementRef): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TreeViewService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TreeViewService>;
}
