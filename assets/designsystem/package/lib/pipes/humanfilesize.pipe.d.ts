import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class HumanFileSizePipe implements PipeTransform {
    transform(input: string, decimalPoints?: number): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<HumanFileSizePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<HumanFileSizePipe, "humanFileSize", true>;
}
