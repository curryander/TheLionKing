import * as i0 from "@angular/core";
export type ModalRole = 'alertdialog' | 'dialog';
export interface Modal {
    id?: string;
    panelId?: string;
    open: boolean;
}
export declare class ModalService {
    private modalData;
    private _modals;
    readonly modals: import("rxjs").Observable<Modal>;
    unRegisterModal(id: string): void;
    updateModal(data: Modal): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModalService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ModalService>;
}
