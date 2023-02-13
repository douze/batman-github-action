const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs/promises');
const commitsModule = require('../src/commits');

const owner = 'douze';
const repo = 'odo';

async function getFirst10Commits() {
  return JSON.parse(await fs.readFile('./test/douze.odo.commits.10.json', 'utf8'));
}

describe('Commits module (stubed)', () => {
  beforeEach(() => {
    sinon.stub(commitsModule, 'getAllCommits').callsFake(getFirst10Commits);
  });
  afterEach(() => {
    sinon.restore();
  });
  it('Should return first 10 commits by default', async () => {
    const commits = await commitsModule.getAllCommits(owner, repo);
    assert.equal(commits.length, 10);
  });
  it('Should return 8 commits when filtered', async () => {
    const commits = await getFirst10Commits();
    const filteredCommits = commitsModule.extractDates(commits, owner);
    assert.equal(filteredCommits.length, 8);
  });
  it('Should return commit dates', async () => {
    const commits = await getFirst10Commits();
    const filteredCommits = commitsModule.extractDates(commits, owner);
    const expectedDates = [
      '2023-01-10T13:45:43Z',
      '2023-01-06T14:06:02Z',
      '2022-05-21T12:41:01Z',
      '2022-05-20T09:18:28Z',
      '2021-04-06T18:45:40Z',
      '2021-02-13T13:22:33Z',
      '2021-01-27T13:49:22Z',
      '2021-01-22T21:46:14Z',
    ];
    assert.deepEqual(filteredCommits, expectedDates);
  });
});
