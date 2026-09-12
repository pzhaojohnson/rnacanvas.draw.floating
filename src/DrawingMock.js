import { NucleobaseMock } from './NucleobaseMock';

import { BondMock } from './BondMock';

export class DrawingMock {
  domNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

  constructor() {
    // add some extra elements to make finding things harder
    for (let i = 0; i < 10; i++) {
      this.domNode.append(document.createElementNS('http://www.w3.org/2000/svg', 'circle'));

      this.domNode.append(document.createElementNS('http://www.w3.org/2000/svg', 'text'));

      this.domNode.append(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
    }
  }

  bases = [];

  addBase(textContent) {
    let b = new NucleobaseMock(textContent);

    this.domNode.append(b.domNode);

    this.bases.push(b);
  }

  bonds = [];

  addBond(base1, base2) {
    let bond = new BondMock(base1, base2);

    this.domNode.append(bond.domNode);

    this.bonds.push(bond);
  }

  get bonds() {
    return {
      find: callback => this.bonds.find(callback),
    };
  }
}
