const core = require('@actions/core');
const github = require('@actions/github');

const octokit = github.getOctokit(core.getInput('github_token'));

const getAllRepos = async (username) => {
  const iterator = octokit.paginate.iterator(octokit.rest.repos.listForUser, { username });

  const allRepos = [];
  for await (const { data: repos } of iterator) {
    for (const repo of repos) {
      allRepos.push(repo.name);
    }
  }
  return allRepos;
};

const getAllCommits = async (username, repo) => {
  // eslint-disable-next-line max-len
  const iterator = octokit.paginate.iterator(octokit.rest.repos.listCommits, { owner: username, repo });

  const allCommits = [];
  for await (const { data: commits } of iterator) {
    for (const commit of commits) {
      allCommits.push(commit);
    }
  }
  return allCommits;
};

const extractDates = (commits, username) => (
  commits
    .filter((commit) => commit.author !== null && commit.author.login === username)
    .map((commit) => commit.commit.author.date));

module.exports = { getAllRepos, getAllCommits, extractDates };
