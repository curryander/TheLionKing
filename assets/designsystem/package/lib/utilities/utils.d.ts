export type ThrottledFunction<T extends unknown[]> = (...args: T) => void;
declare const normalizeEventKey: (event: KeyboardEvent) => string;
declare const isPrintable: (str: string) => boolean;
declare const isEqual: (a: object, b: object) => boolean;
declare const getFocusableElements: (parent: HTMLElement) => HTMLElement[];
declare const getNextFocusableElement: (parent: HTMLElement, currentElement: HTMLElement) => HTMLElement;
declare const getImageDimensions: (src: string) => Promise<{
    height: number;
    width: number;
}>;
/**
 * @param {string | boolean | null | undefined} value value to transform
 * @returns {boolean | undefined} converted value
 * @internal
 */
export declare function toBoolean(value: string | boolean | null | undefined): boolean | undefined;
declare const throttle: (mainFunction: ThrottledFunction<unknown[]>, delay: number) => ThrottledFunction<unknown[]>;
declare const trackByFn: (index: number) => number;
declare const normalizeShortCut: (shortcutValue: string) => string | undefined;
declare const getHotKeyFromtEvent: (event: KeyboardEvent) => string;
export { normalizeEventKey, isPrintable, isEqual, getFocusableElements, getNextFocusableElement, getImageDimensions, throttle, trackByFn, normalizeShortCut, getHotKeyFromtEvent, };
