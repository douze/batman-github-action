const core = require('@actions/core');
const github = require('@actions/github');

const octokit = github.getOctokit(core.getInput('githubToken'));

const startTag = '<!--START_SECTION:batman-->';
const endTag = '<!--END_SECTION:batman-->';

const getReadme = async (username) => {
  const readme = await octokit.rest.repos.getReadme({ owner: username, repo: username });
  const buffer = Buffer.from(readme.data.content, readme.data.encoding);
  return { sha: readme.data.sha, content: buffer.toString() };
};

const updateReadmeContent = (readme, content) => {
  const startTagIndex = readme.indexOf(startTag);
  const endTagIndex = readme.indexOf(endTag);
  if (startTagIndex === -1 || endTagIndex === -1) return readme;
  return [
    readme.slice(0, startTagIndex + startTag.length),
    '\n',
    content,
    '\n',
    readme.slice(endTagIndex),
  ].join('');
};

const updateReadme = async (username, sha, readMeContent) => {
  octokit.rest.repos.createOrUpdateFileContents({
    owner: username,
    repo: username,
    path: 'README.md',
    message: 'Update README from batman-github-action',
    content: Buffer.from(readMeContent).toString('base64'),
    sha,
  });
};

module.exports = {
  getReadme,
  updateReadmeContent,
  updateReadme,
  startTag,
  endTag,
};
