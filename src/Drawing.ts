import type { StrungElementOwner } from './StrungElementOwner';

/**
 * The drawing interface used by floating elements.
 */
export interface Drawing {
  readonly domNode: SVGSVGElement;

  readonly bonds: {
    /**
     * Finds and returns the first bond that fulfills the provided callback function.
     *
     * Returns `undefined` if no bonds fulfill the provided callback function.
     */
    find<O extends StrungElementOwner>(f: (bond: O) => boolean): O | undefined;
  }
}
