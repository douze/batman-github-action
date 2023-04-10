const INPUT_MOCK = {
  INPUT_USERNAME_ID: 'douze',
};

Object.assign(process.env, {
  ...INPUT_MOCK,
  TEST: true,
});

module.exports = {
  mockRestApi: false,
  runIntegrationTest: true,
  updateReadMe: false,
  username: 'douze',
  repo: 'odo',
  dayStart: 8,
  dayEnd: 18,
};
