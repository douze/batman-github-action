const assert = require('assert');
const statisticsModule = require('../src/statistics');

describe('Statistics module', () => {
  it('Should return wednesday, friday, sunday and tuesday', () => {
    const dates = [
      '2023-02-01T13:45:43Z',
      '2023-02-03T14:06:02Z',
      '2023-02-05T12:41:01Z',
      '2023-02-07T09:18:28Z',
    ];

    const names = statisticsModule.convertToDaysOfTheWeek(dates);
    assert.equal(names[0], statisticsModule.daysOfTheWeek[3]);
    assert.equal(names[1], statisticsModule.daysOfTheWeek[5]);
    assert.equal(names[2], statisticsModule.daysOfTheWeek[0]);
    assert.equal(names[3], statisticsModule.daysOfTheWeek[2]);
  });
  it('Should return 2 wednesday, 1 friday and 3 sunday', () => {
    const dates = [
      '2023-02-01T13:45:43Z',
      '2023-02-01T15:45:43Z',
      '2023-02-03T14:06:02Z',
      '2023-02-05T12:41:01Z',
      '2023-02-05T13:41:01Z',
      '2023-02-05T14:41:01Z',
    ];

    const names = statisticsModule.convertToDaysOfTheWeek(dates);
    const count = statisticsModule.countDaysOfTheWeek(names);
    assert.equal(2, count[statisticsModule.daysOfTheWeek[3]]);
    assert.equal(1, count[statisticsModule.daysOfTheWeek[5]]);
    assert.equal(3, count[statisticsModule.daysOfTheWeek[0]]);
  });
});
