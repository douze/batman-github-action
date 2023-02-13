const { Octokit } = require('@octokit/rest');

const octokit = new Octokit();

const getAllCommitsIterator = async (owner, repo, perPage = 10) => (
  octokit.paginate.iterator(octokit.rest.repos.listCommits, { owner, repo, per_page: perPage }));

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

const extractDates = (commits, login) => (
  commits
    .filter((commit) => commit.author.login === login)
    .map((commit) => commit.commit.author.date));

module.exports = { getAllCommits, extractDates };
