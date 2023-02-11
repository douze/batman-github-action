const { Octokit } = require('@octokit/rest');

const octokit = new Octokit();

(async () => {
  const { data } = await octokit.rest.pulls.get({
    owner: 'octokit',
    repo: 'rest.js',
    pull_number: 123,
  });
  console.log(data);
})();