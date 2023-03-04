const { Octokit } = require('@octokit/rest');

const octokit = new Octokit();

const startTag = '<!--START_SECTION:batman-->';
const endTag = '<!--END_SECTION:batman-->';

const getReadme = async (owner, repo) => {
  const readme = await octokit.rest.repos.getReadme({ owner, repo });
  const buffer = Buffer.from(readme.data.content, readme.data.encoding);
  return buffer.toString();
};

const updateReadme = (readme, content) => {
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

module.exports = {
  getReadme,
  updateReadme,
  startTag,
  endTag,
};
