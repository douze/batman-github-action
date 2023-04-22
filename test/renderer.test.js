const assert = require('assert');
const rendererModule = require('../src/renderer');
const batmanModule = require('../src/batman');

const { Identity } = batmanModule;

const expectedCircle = `
<svg width="200px" height="200px" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" stroke="#f18e3c" stroke-width="10" stroke-dasharray="452.38934211693027 565.4866776461628"
    d="M100 10 a 90 90 0 0 1 0 180 a 90 90 0 0 1 0 -180"/>
  <path fill="none" stroke="#2153b1" stroke-width="10" stroke-dasharray="0 452.38934211693027 565.4866776461628"
    d="M100 10 a 90 90 0 0 1 0 180 a 90 90 0 0 1 0 -180"/>
  <text x="100" y="100" alignment-baseline="central" text-anchor="middle">BATMAN</text>
</svg>
`;

describe('Renderer module', () => {
  it('Should render circle SVG', async () => {
    const svg = rendererModule.renderAsPercentageCircle(Identity.BATMAN.description, 80);
    assert.equal(svg, expectedCircle);
  });
});
