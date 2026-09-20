import type { Drawing } from './Drawing';

import { StrungText } from './StrungText';

import { StrungCircle } from './StrungCircle';

import { StrungRectangle } from './StrungRectangle';

import { StrungTriangle } from './StrungTriangle';

import type { StrungElementOwner } from './StrungElementOwner';

import { isNonNullObject } from '@rnacanvas/value-check';

export const StrungElement = {
  recreate<O extends StrungElementOwner>(savedStrungElement: unknown, parentDrawing: Drawing<O>) {
    if (!isNonNullObject(savedStrungElement)) {
      throw new Error(`Saved strung element isn't an object: ${savedStrungElement}.`);
    }

    if ('text' in savedStrungElement) {
      return StrungText.recreate(savedStrungElement, parentDrawing);
    } else if ('circle' in savedStrungElement) {
      return StrungCircle.recreate(savedStrungElement, parentDrawing);
    } else if ('rectangle' in savedStrungElement) {
      return StrungRectangle.recreate(savedStrungElement, parentDrawing);
    } else if ('triangle' in savedStrungElement) {
      return StrungTriangle.recreate(savedStrungElement, parentDrawing);
    } else {
      throw new Error(`Saved strung element doesn't have a recognized element type: ${savedStrungElement}.`);
    }
  },
};
