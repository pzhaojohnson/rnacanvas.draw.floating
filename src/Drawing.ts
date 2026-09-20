import type { StrungElementOwner } from './StrungElementOwner';

/**
 * The drawing interface used by floating elements.
 */
export interface Drawing<O extends StrungElementOwner> {
  readonly domNode: SVGSVGElement;

  readonly bonds: {
    /**
     * Finds and returns the first bond that fulfills the provided callback function.
     *
     * Returns `undefined` if no bonds fulfill the provided callback function.
     */
    find(f: (bond: O) => boolean): O | undefined;
  }
}
