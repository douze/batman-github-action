const core = require('@actions/core');
const github = require('@actions/github');

const octokit = github.getOctokit(core.getInput('github_token'));

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

const updateSvgAndReadme = async (username, svg, readme, percentageByDay) => {
  const svgBlob = await octokit.rest.git.createBlob({
    owner: username,
    repo: username,
    content: svg,
  });
  const readMeBlob = await octokit.rest.git.createBlob({
    owner: username,
    repo: username,
    content: readme,
  });
  const tree = await octokit.rest.git.createTree({
    owner: username,
    repo: username,
    tree: [
      {
        path: 'image.svg',
        mode: '100644',
        type: 'blob',
        sha: svgBlob.data.sha,
      },
      {
        path: 'README.md',
        mode: '100644',
        type: 'blob',
        sha: readMeBlob.data.sha,
      },
    ],
  });
  const ref = await octokit.rest.git.getRef({
    owner: username,
    repo: username,
    ref: 'heads/main',
  });
  const commit = await octokit.rest.git.createCommit({
    owner: username,
    repo: username,
    message: `Update README from batman-github-action ${percentageByDay.toFixed(2)}/${100 - percentageByDay.toFixed(2)}`,
    tree: tree.data.sha,
    parents: [ref.data.object.sha],
  });
  octokit.rest.git.updateRef({
    owner: username,
    repo: username,
    ref: ref.data.ref.slice(5),
    sha: commit.data.sha,
  });
};

module.exports = {
  getReadme,
  updateReadmeContent,
  updateSvgAndReadme,
  startTag,
  endTag,
};
