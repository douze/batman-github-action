const { makeBadge } = require('badge-maker')
const fs = require('fs');

// Generate badge from coverage summary
const summary = require(`../coverage/coverage-summary.json`).total;
const categories = Object.keys(summary);
const percentages = categories.map((key) => summary[key].pct).filter((pct) => !isNaN(pct));
const worst = Math.min(...percentages);
const hue = (120 * worst / 100);
const hsl = `hsl(${hue},100%,40%)`;
const coverage = makeBadge({ label: 'coverage', message: worst.toString(), color: hsl });
fs.writeFileSync('.github/coverage.svg', coverage);

// Generate badge from eslint output
const eslintOutput = require('../coverage/eslint.json');
const errorCount = eslintOutput
    .map((item) => item.errorCount + item.fatalErrorCount)
    .reduce((previous, current) => previous + current, 0);
const lint = makeBadge({ label: 'lint', message: errorCount.toString(), color: errorCount == 0 ? 'brightgreen' : 'red' });
fs.writeFileSync('.github/lint.svg', lint);
