const renderAsPercentageCircle = (identityDescription, percentageByDay) => {
  // Circle formula: perimeter = 2*PI*radius
  // radius = perimeter / 2 / PI
  const svgSize = 200;
  const diameter = svgSize * 0.9;
  const radius = diameter / 2;
  const x = svgSize / 2;
  const y = svgSize * 0.05;
  const perimeter = 2 * Math.PI * radius;
  const strokeWith = svgSize * 0.05;
  return `
<svg width="${svgSize}px" height="${svgSize}px" xmlns="http://www.w3.org/2000/svg">
  <path fill="none" stroke="#f18e3c" stroke-width="${strokeWith}" stroke-dasharray="${percentageByDay * 0.01 * perimeter} ${perimeter}"
    d="M${x} ${y} a ${radius} ${radius} 0 0 1 0 ${diameter} a ${radius} ${radius} 0 0 1 0 -${diameter}"/>
  <path fill="none" stroke="#2153b1" stroke-width="${strokeWith}" stroke-dasharray="0 ${percentageByDay * 0.01 * perimeter} ${perimeter}"
    d="M${x} ${y} a ${radius} ${radius} 0 0 1 0 ${diameter} a ${radius} ${radius} 0 0 1 0 -${diameter}"/>
  <text x="100" y="100" alignment-baseline="central" text-anchor="middle">${identityDescription.toUpperCase()}</text>
</svg>
`;
};

module.exports = { renderAsPercentageCircle };
