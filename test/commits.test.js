const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs/promises');
const commitsModule = require('../src/commits');

async function getFirst10Commits() {
  return JSON.parse(await fs.readFile('./douze.odo.commits.10.json', 'utf8'));
}

describe('Commits module()', () => {
  it('Stub to return first 10 commits', async () => {
    sinon.stub(commitsModule, 'getAllCommits').callsFake(getFirst10Commits);
    const commits = await commitsModule.getAllCommits('douze', 'odo');
    assert.equal(commits.length, 10);
  });
});
