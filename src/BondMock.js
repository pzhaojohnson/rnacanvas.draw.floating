export class BondMock {
  domNode = document.createElementNS('http://www.w3.org/2000/svg', 'line');

  /**
   * Make each bond unique.
   */
  id = `${Math.random()}`;

  constructor(base1, base2) {
    this.base1 = base1;
    this.base2 = base2;
  }

  atLength(length) {
    return { x: 0, y: 0, direction: 0 };
  }

  addEventListener(name, listener) {}
}
