const assert = require('assert');
const statisticsModule = require('../src/statistics');

const { DaysOfTheWeek, DayNight } = statisticsModule;

describe('Statistics module', () => {
  it('Should return days of the week from date in iso 8601 format', () => {
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
  it('Should count the occurences of days of the week', () => {
    const names = [DaysOfTheWeek.WEDNESDAY, DaysOfTheWeek.FRIDAY, DaysOfTheWeek.SUNDAY,
      DaysOfTheWeek.WEDNESDAY, DaysOfTheWeek.SUNDAY, DaysOfTheWeek.SUNDAY];
    const count = statisticsModule.countDaysOfTheWeek(names);
    assert.equal(2, count[DaysOfTheWeek.WEDNESDAY]);
    assert.equal(1, count[DaysOfTheWeek.FRIDAY]);
    assert.equal(3, count[DaysOfTheWeek.SUNDAY]);
  });
  it('Should extract local hours from dates', () => {
    const dates = [
      '2023-02-01T13:45:43Z',
      '2023-02-03T14:06:02Z',
      '2023-02-05T12:41:01Z',
      '2023-02-07T09:18:28Z',
    ];
    const hours = statisticsModule.convertToHours(dates);
    assert.deepEqual(hours, [14, 15, 13, 10]);
  });
  it('Should store hours in correct day/night slots', () => {
    const hours = [8, 9, 12, 18, 20, 23, 1, 3, 6];
    const slots = statisticsModule.storeInDayNightSlots(hours, 8, 18);
    assert.equal(slots[DayNight.DAY], 3);
    assert.equal(slots[DayNight.NIGHT], 6);
  });
});
