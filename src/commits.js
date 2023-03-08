const github = require('@actions/github');
require('dotenv').config();

const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

const getAllRepos = async (username) => {
  const iterator = await octokit.paginate.iterator(octokit.rest.repos.listForUser, { username });

  const allRepos = [];
  for await (const { data: repos } of iterator) {
    for (const repo of repos) {
      allRepos.push(repo.name);
    }
  }
  return allRepos;
};

const getAllCommits = async (username, repo) => {
  const iterator = await octokit.paginate.iterator(octokit.rest.repos.listCommits, { owner: username, repo });

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
    .filter((commit) => commit.author.login === username)
    .map((commit) => commit.commit.author.date));

module.exports = { getAllRepos, getAllCommits, extractDates };
