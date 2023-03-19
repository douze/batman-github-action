const { getAllRepos, getAllCommits, extractDates } = require('./commits');
const { groupHoursByDayNightSlots } = require('./statistics');
const { whoAmI } = require('./batman');

const getAllMyCommitDates = async (username) => {
  const repos = await getAllRepos(username);
  const allMyCommitDates = [];
  for await (const repo of repos) {
    const repoCommits = await getAllCommits(username, repo);
    allMyCommitDates.push(...extractDates(repoCommits, username));
  }
  return allMyCommitDates;
};

const getIdentity = (dates) => {
  const groupedHours = groupHoursByDayNightSlots(dates, 8, 18);
  const identity = whoAmI(groupedHours);
  return identity;
};

module.exports = { getAllMyCommitDates, getIdentity };
