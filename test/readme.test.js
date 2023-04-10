const assert = require('assert');
const sinon = require('sinon');
const fs = require('fs/promises');
const { mockRestApi, username } = require('./env.test');
const readmeModule = require('../src/readme');

const { startTag, endTag } = readmeModule;

async function getProfileReadme() {
  const json = JSON.parse(await fs.readFile('./test/douze.douze.readme.json', 'utf8'));
  return Buffer.from(json.content, json.encoding).toString();
}

async function getRawProfileReadme() {
  return fs.readFile('./test/douze.douze.readme.md', 'utf8');
}

describe('Readme module', () => {
  beforeEach(() => {
    if (mockRestApi) {
      sinon.stub(readmeModule, 'getReadme').callsFake(getProfileReadme);
    }
  });
  afterEach(() => {
    if (mockRestApi) {
      sinon.restore();
    }
  });
  it('Should return readme file', async function () {
    if (mockRestApi) {
      this.skip();
    } else {
      const readme = await readmeModule.getReadme(username);
      assert.match(readme.content, /Hi there/);
    }
  });
  it('Should update readme file', async () => {
    const readme = await getRawProfileReadme();
    const newContent = 'Hello world';
    const newReadme = readmeModule.updateReadmeContent(readme, newContent);
    assert.match(newReadme, new RegExp(`${startTag}\n${newContent}\n${endTag}`));
  });
});
