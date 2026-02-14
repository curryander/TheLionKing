import { type LinklistData, type LinklistColumns } from '../linklist/linklist.component';
import * as i0 from "@angular/core";
export interface JumplinkData {
    text: string;
    href: string;
}
export declare class JumplinksComponent {
    data: LinklistData[];
    columns: LinklistColumns;
    protected templateData: LinklistData[];
    static ɵfac: i0.ɵɵFactoryDeclaration<JumplinksComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<JumplinksComponent, "drv-jumplinks", never, { "data": { "alias": "data"; "required": false; }; "columns": { "alias": "columns"; "required": false; }; }, {}, never, never, true, never>;
    static ngAcceptInputType_data: JumplinkData[];
    static ngAcceptInputType_columns: unknown;
}
