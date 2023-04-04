const INPUT_MOCK = {
  INPUT_USERNAME: 'douze',
};

Object.assign(process.env, {
  ...INPUT_MOCK,
});

module.exports = {
  mockRestApi: true,
  runIntegrationTest: true,
  updateReadMe: true,
  username: 'douze',
  repo: 'odo',
};
