import { OnInit, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as i0 from "@angular/core";
interface VideoProps {
    poster: string;
    width: number;
    height: number;
    type: string;
    src: string;
}
interface EmbedProps {
    src: string;
    width: number;
    height: number;
    loading?: 'lazy' | 'eager';
    title: string;
}
interface ImageProps {
    src: string;
    width: number;
    height: number;
    loading?: 'lazy' | 'eager';
    alt: string;
    lightbox: boolean;
    srcset?: string[];
    sizes?: string;
}
export declare class MediaComponent implements OnInit {
    private modalService;
    readonly variant: import("@angular/core").InputSignal<"default" | "caption-right" | "caption-left">;
    readonly aspectRatio: import("@angular/core").InputSignal<string>;
    readonly video: import("@angular/core").InputSignal<VideoProps>;
    readonly embed: import("@angular/core").InputSignal<EmbedProps>;
    readonly image: import("@angular/core").InputSignal<ImageProps>;
    readonly caption: import("@angular/core").InputSignal<string>;
    readonly duration: import("@angular/core").InputSignal<string>;
    readonly date: import("@angular/core").InputSignal<string>;
    readonly copyright: import("@angular/core").InputSignal<string>;
    readonly modalOpenButtonText: import("@angular/core").InputSignal<string>;
    readonly modalCloseButtonText: import("@angular/core").InputSignal<string>;
    readonly videoPlayButtonLabel: import("@angular/core").InputSignal<string>;
    readonly videoElement: import("@angular/core").Signal<ElementRef<any>>;
    protected modalId: string;
    protected isOpen: boolean;
    protected sanitizer: DomSanitizer;
    /** Inserted by Angular inject() migration for backwards compatibility */
    constructor(...args: unknown[]);
    protected get cssClass(): string;
    protected get cssWrapperClass(): string;
    protected get aspectRatioStyle(): string | null;
    protected get responsiveImageProps(): string[];
    /** @internal */
    ngOnInit(): void;
    protected playVideo({ target }: {
        target: any;
    }): void;
    protected lightBoxClickHandler(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MediaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MediaComponent, "drv-media", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "aspectRatio": { "alias": "aspectRatio"; "required": false; "isSignal": true; }; "video": { "alias": "video"; "required": false; "isSignal": true; }; "embed": { "alias": "embed"; "required": false; "isSignal": true; }; "image": { "alias": "image"; "required": false; "isSignal": true; }; "caption": { "alias": "caption"; "required": false; "isSignal": true; }; "duration": { "alias": "duration"; "required": false; "isSignal": true; }; "date": { "alias": "date"; "required": false; "isSignal": true; }; "copyright": { "alias": "copyright"; "required": false; "isSignal": true; }; "modalOpenButtonText": { "alias": "modalOpenButtonText"; "required": false; "isSignal": true; }; "modalCloseButtonText": { "alias": "modalCloseButtonText"; "required": false; "isSignal": true; }; "videoPlayButtonLabel": { "alias": "videoPlayButtonLabel"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
export {};
