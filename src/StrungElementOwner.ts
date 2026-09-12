import type { StrungElement } from '@rnacanvas/draw.strung';

export type StrungElementOwner = (
  ConstructorParameters<typeof StrungElement>[1]
  & { id: string }
);
