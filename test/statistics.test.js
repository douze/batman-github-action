const assert = require('assert');
const statisticsModule = require('../src/statistics');

const { DaysOfTheWeek } = statisticsModule;

describe('Statistics module', () => {
  it('Should return wednesday, friday, sunday and tuesday', () => {
    const dates = [
      '2023-02-01T13:45:43Z',
      '2023-02-03T14:06:02Z',
      '2023-02-05T12:41:01Z',
      '2023-02-07T09:18:28Z',
    ];

    const names = statisticsModule.convertToDaysOfTheWeek(dates);
    assert.equal(names[0], DaysOfTheWeek.WEDNESDAY);
    assert.equal(names[1], DaysOfTheWeek.FRIDAY);
    assert.equal(names[2], DaysOfTheWeek.SUNDAY);
    assert.equal(names[3], DaysOfTheWeek.TUESDAY);
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
    assert.equal(2, count[DaysOfTheWeek.WEDNESDAY]);
    assert.equal(1, count[DaysOfTheWeek.FRIDAY]);
    assert.equal(3, count[DaysOfTheWeek.SUNDAY]);
  });
});
