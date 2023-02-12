const { Octokit } = require('@octokit/rest');

const octokit = new Octokit();

const getAllCommitsIterator = async (owner, repo) => (
  octokit.paginate.iterator(octokit.rest.repos.listCommits, { owner, repo, per_page: 10 }));

const getAllCommits = async (owner, repo) => {
  const iterator = await getAllCommitsIterator(owner, repo);

  const allCommits = [];
  for await (const { data: commits } of iterator) {
    for (const commit of commits) {
      allCommits.push(commit);
    }
  }
  return allCommits;
};

module.exports = { getAllCommits };
