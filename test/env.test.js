const INPUT_MOCK = {
  INPUT_USERNAME: 'douze',
};

Object.assign(process.env, {
  ...INPUT_MOCK,
});

module.exports = {
  mockRestApi: true,
  runIntegrationTest: false,
  updateReadMe: false,
  username: 'douze',
  repo: 'odo',
};
