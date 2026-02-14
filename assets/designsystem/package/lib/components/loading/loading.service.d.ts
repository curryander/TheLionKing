import * as i0 from "@angular/core";
export interface Loading {
    id: string;
    visible?: boolean;
    asProgress?: boolean;
    progress?: number;
}
export declare class LoadingService {
    private _knobs;
    readonly knobs: import("rxjs").Observable<Loading>;
    updateKnobs(data: Loading): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<LoadingService>;
}
