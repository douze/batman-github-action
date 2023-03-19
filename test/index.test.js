const assert = require('assert');

const { getAllMyCommitDates, getIdentity } = require('../src/index');

const runIntegrationTest = false;

describe('Index module (integration)', function () {
  this.timeout(10000);

  it('Should... works', async function () {
    if (runIntegrationTest) {
      const username = 'douze';
      const myCommitDates = await getAllMyCommitDates(username);
      assert.ok(myCommitDates.length > 80);
      const identity = getIdentity(myCommitDates);
      assert.ok(identity.identity !== undefined);
    } else {
      this.skip();
    }
  });
});
