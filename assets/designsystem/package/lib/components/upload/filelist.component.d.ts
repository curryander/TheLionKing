import { OnChanges, SimpleChanges } from '@angular/core';
import { type FormItemMessage } from '../formitem/formitem.component';
import * as i0 from "@angular/core";
export interface FileListItem {
    id: string;
    name: string;
    href?: string;
    blob?: Blob;
    size: number;
    hasError?: boolean;
    deletable?: boolean;
    errorMessages?: FormItemMessage[];
    progress?: number | null;
    indeterminate?: boolean;
    downloadAble?: boolean;
    callbackFn?: () => void;
}
export declare class FileListComponent implements OnChanges {
    readonly headline: import("@angular/core").InputSignal<string>;
    readonly fileList: import("@angular/core").InputSignal<FileListItem[]>;
    readonly deleteButtonLabel: import("@angular/core").InputSignal<string>;
    readonly cancelButtonLabel: import("@angular/core").InputSignal<string>;
    readonly progressBarLabel: import("@angular/core").InputSignal<string>;
    readonly progressBarFromLabel: import("@angular/core").InputSignal<string>;
    readonly externalLinkLabel: import("@angular/core").InputSignal<string>;
    readonly errorPrefix: import("@angular/core").InputSignal<string>;
    readonly deleted: import("@angular/core").OutputEmitterRef<FileListItem>;
    readonly cancelled: import("@angular/core").OutputEmitterRef<FileListItem>;
    protected templateList: FileListItem[];
    protected trackByFn: (index: number) => number;
    /**
     * @param {SimpleChanges} changes SimpleChanges
     * @internal
     */
    ngOnChanges(changes: SimpleChanges): void;
    protected getListItemClass(item: FileListItem): string;
    protected fileListActionHandler(action: 'delete' | 'cancel', item: FileListItem): void;
    protected itemClickHandler(e: MouseEvent, item: FileListItem): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FileListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FileListComponent, "drv-filelist", never, { "headline": { "alias": "headline"; "required": false; "isSignal": true; }; "fileList": { "alias": "fileList"; "required": false; "isSignal": true; }; "deleteButtonLabel": { "alias": "deleteButtonLabel"; "required": true; "isSignal": true; }; "cancelButtonLabel": { "alias": "cancelButtonLabel"; "required": true; "isSignal": true; }; "progressBarLabel": { "alias": "progressBarLabel"; "required": true; "isSignal": true; }; "progressBarFromLabel": { "alias": "progressBarFromLabel"; "required": false; "isSignal": true; }; "externalLinkLabel": { "alias": "externalLinkLabel"; "required": false; "isSignal": true; }; "errorPrefix": { "alias": "errorPrefix"; "required": false; "isSignal": true; }; }, { "deleted": "deleted"; "cancelled": "cancelled"; }, never, never, true, never>;
}
