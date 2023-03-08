const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs/promises');
const commitsModule = require('../src/commits');

const owner = 'douze';
const repo = 'odo';
const mockRestApi = true;

async function getFirst5Repos() {
  return ['dotfiles', 'estm', 'odo', 'Viewer', 'wade'];
}

async function getFirst10Commits() {
  return JSON.parse(await fs.readFile('./test/douze.odo.commits.10.json', 'utf8'));
}

describe('Commits module', () => {
  beforeEach(() => {
    if (mockRestApi) {
      sinon.stub(commitsModule, 'getAllRepos').callsFake(getFirst5Repos);
      sinon.stub(commitsModule, 'getAllCommits').callsFake(getFirst10Commits);
    }
  });
  afterEach(() => {
    if (mockRestApi) {
      sinon.restore();
    }
  });
  it('Should return the list of my repos', async function () {
    if (mockRestApi) {
      this.skip();
    } else {
      const repos = await commitsModule.getAllRepos(owner);
      assert.ok(repos.length > 0);
    }
  });
  it('Should return first 5 repos when stubing', async function () {
    if (mockRestApi) {
      const repos = await commitsModule.getAllRepos(owner);
      assert.equal(repos.length, 5);
    } else {
      this.skip();
    }
  });
  it('Should return the list of commits for odo repo', async function () {
    if (mockRestApi) {
      this.skip();
    } else {
      const commits = await commitsModule.getAllCommits(owner, repo);
      assert.ok(commits.length > 0);
    }
  });
  it('Should return first 10 commits when stubing', async function () {
    if (mockRestApi) {
      const commits = await commitsModule.getAllCommits(owner, repo);
      assert.equal(commits.length, 10);
    } else {
      this.skip();
    }
  });
  it('Should return 8 commits when filtering', async () => {
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
