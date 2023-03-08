const { Octokit } = require('@octokit/rest');

const octokit = new Octokit();

const getAllCommits = async (owner, repo) => {
  const iterator = await octokit.paginate.iterator(octokit.rest.repos.listCommits, { owner, repo });

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
