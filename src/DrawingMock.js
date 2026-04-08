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
}
