const assert = require('assert');
const {
  runIntegrationTest,
  updateReadMe,
  username,
  dayStart,
  dayEnd,
} = require('./env.test');
const { Identity } = require('../src/batman');
const indexModule = require('../src/index');

describe('Index module (integration)', function () {
  this.timeout(10000);

  it('Should... works', async function () {
    if (runIntegrationTest) {
      const myCommitDates = await indexModule.getAllMyCommitDates(username);
      assert.ok(myCommitDates.length > 80);
      // eslint-disable-next-line max-len
      const { identity, percentageByDay } = indexModule.getIdentityWithStatistics(myCommitDates, dayStart, dayEnd);
      assert.ok(identity !== undefined);
      // eslint-disable-next-line max-len
      const newReadMe = await indexModule.updateProfileReadme(username, identity, percentageByDay, updateReadMe);
      assert.ok(
        newReadMe.toLowerCase().indexOf(Identity.BATMAN.description.toLowerCase()) !== -1
        || newReadMe.toLowerCase().indexOf(Identity.BRUCE_WAYNE.description.toLowerCase()) !== -1,
      );
    } else {
      this.skip();
    }
  });
});
