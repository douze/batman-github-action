const core = require('@actions/core');

const { getAllRepos, getAllCommits, extractDates } = require('./commits');
const { groupHoursByDayNightSlots } = require('./statistics');
const { whoAmI } = require('./batman');
const { getReadme, updateReadmeContent, updateSvgAndReadme } = require('./readme');
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

const getIdentityWithStatistics = (dates, dayStart, dayEnd) => {
  const groupedHours = groupHoursByDayNightSlots(dates, dayStart, dayEnd);
  return whoAmI(groupedHours);
};

const updateProfileReadme = async (username, identity, percentageByDay, update = false) => {
  const readme = await getReadme(username);
  const svg = renderAsPercentageCircle(identity.description, percentageByDay);
  const udpatedReadme = updateReadmeContent(readme.content, '<img src="./image.svg">');
  if (update) {
    updateSvgAndReadme(username, svg, udpatedReadme, percentageByDay);
  }
  return udpatedReadme;
};

module.exports = { getAllMyCommitDates, getIdentityWithStatistics, updateProfileReadme };

const run = async () => {
  try {
    const username = core.getInput('username_id');
    const dayStart = core.getInput('day_start');
    const dayEnd = core.getInput('day_end');
    const commitDates = await getAllMyCommitDates(username);
    const { identity, percentageByDay } = getIdentityWithStatistics(commitDates, dayStart, dayEnd);
    updateProfileReadme(username, identity, percentageByDay, true);
  } catch (error) {
    core.setFailed(error.message);
  }
};

if (!process.env.TEST) {
  run();
}
