export class NucleobaseMock {
  /**
   * Make each base unique.
   */
  id = `${Math.random()}`;

  constructor(textContent) {
    this.domNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    this.domNode.textContent = textContent;
  }
}
