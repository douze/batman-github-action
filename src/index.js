const { getAllRepos, getAllCommits, extractDates } = require('./commits');
const { groupHoursByDayNightSlots } = require('./statistics');
const { whoAmI } = require('./batman');
const { getReadme, updateReadmeContent, updateReadme } = require('./readme');
const { renderAsPercentageCircle } = require('./renderer');

const getAllMyCommitDates = async (username) => {
  const repos = await getAllRepos(username);
  const allMyCommitDates = [];
  for await (const repo of repos) {
    const repoCommits = await getAllCommits(username, repo);
    allMyCommitDates.push(...extractDates(repoCommits, username));
  }
  return allMyCommitDates;
};

const getIdentityWithStatistics = (dates) => {
  const groupedHours = groupHoursByDayNightSlots(dates, 8, 18);
  return whoAmI(groupedHours);
};

const updateProfileReadme = async (username, identity, percentageByDay, update = false) => {
  const readme = await getReadme(username);
  const svg = renderAsPercentageCircle(identity.description, percentageByDay);
  const udpatedReadme = updateReadmeContent(readme.content, identity.description);
  if (update) {
    updateReadme(username, readme.sha, udpatedReadme);
  }
  return udpatedReadme;
};

module.exports = { getAllMyCommitDates, getIdentityWithStatistics, updateProfileReadme };
