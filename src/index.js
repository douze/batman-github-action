const { getAllCommits } = require('./commits');

const run = async () => {
  const commits = await getAllCommits('douze', 'odo');
  console.log(commits.length);
};

run();
