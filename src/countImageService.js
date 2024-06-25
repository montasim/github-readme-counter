const PLACES = 7;

const countImageService = (count, backgroundColor, textColor) => {
    const countArray = count.toString().padStart(PLACES, '0').split('');

    const svgParts = countArray.map((digit, index) => `
        <rect fill="${backgroundColor}" x="${index * 32}" y="0.5" width="29" height="29" />
        <text font-family="Roboto" font-size="24" fill="${textColor}">
            <tspan x="${index * 32 + 7}" y="22">${digit}</tspan>
        </text>
    `).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="${PLACES * 32}px" height="30px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>Count</title>
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          ${svgParts}
        </g>
    </svg>
  `;
};

module.exports = countImageService;
