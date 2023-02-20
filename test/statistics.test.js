const assert = require('assert');
const statisticsModule = require('../src/statistics');

const { DaysOfTheWeek, DayNight } = statisticsModule;
/* eslint-disable object-curly-newline */
const { WEDNESDAY, FRIDAY, SUNDAY, TUESDAY } = DaysOfTheWeek;
const { DAY, NIGHT } = DayNight;
/* eslint-enable no-param-reassign */

describe('Statistics module', () => {
  it('Should return days of the week from date in iso 8601 format', () => {
    const dates = [
      '2023-02-01T13:45:43Z',
      '2023-02-03T14:06:02Z',
      '2023-02-05T12:41:01Z',
      '2023-02-07T09:18:28Z',
    ];

    const names = statisticsModule.convertDatesToDaysOfTheWeek(dates);
    assert.deepEqual(names, [WEDNESDAY, FRIDAY, SUNDAY, TUESDAY]);
  });
  it('Should count the occurences of days of the week', () => {
    const names = [WEDNESDAY, FRIDAY, SUNDAY, WEDNESDAY, SUNDAY, SUNDAY];
    const count = statisticsModule.countDaysOfTheWeek(names);
    assert.equal(2, count[WEDNESDAY]);
    assert.equal(1, count[FRIDAY]);
    assert.equal(3, count[SUNDAY]);
  });
  it('Should extract local hours from dates', () => {
    const dates = [
      '2023-02-01T13:45:43Z',
      '2023-02-03T14:06:02Z',
      '2023-02-05T12:41:01Z',
      '2023-02-07T09:18:28Z',
    ];
    const hours = statisticsModule.convertDatesToHours(dates);
    assert.deepEqual(hours, [14, 15, 13, 10]);
  });
  it('Should store hours in correct day/night slots', () => {
    const hours = [8, 9, 12, 18, 20, 23, 1, 3, 6];
    const slots = statisticsModule.countAsDayNightSlots(hours, 8, 18);
    assert.equal(slots[DAY], 3);
    assert.equal(slots[NIGHT], 6);
  });
  it('Should group hours by days of the week', () => {
    const dates = [
      '2023-02-01T13:45:43Z',
      '2023-02-01T16:45:43Z',
      '2023-02-01T18:45:43Z',
      '2023-02-03T14:06:02Z',
      '2023-02-03T21:06:02Z',
      '2023-02-05T12:41:01Z',
      '2023-02-07T06:18:28Z',
      '2023-02-07T09:18:28Z',
      '2023-02-07T19:18:28Z',
      '2023-02-07T22:18:28Z',
    ];
    const groupedHours = statisticsModule.groupHoursByDaysOfTheWeek(dates);
    assert.deepEqual(
      Object.getOwnPropertySymbols(groupedHours),
      [WEDNESDAY, FRIDAY, SUNDAY, TUESDAY],
    );
    assert.deepEqual(groupedHours[WEDNESDAY], [14, 17, 19]);
    assert.deepEqual(groupedHours[FRIDAY], [15, 22]);
    assert.deepEqual(groupedHours[SUNDAY], [13]);
    assert.deepEqual(groupedHours[TUESDAY], [7, 10, 20, 23]);
  });
  it('Should group hours by days of the week and day/night slots', () => {
    const dates = [
      '2023-02-01T13:45:43Z',
      '2023-02-01T16:45:43Z',
      '2023-02-01T18:45:43Z',
      '2023-02-03T14:06:02Z',
      '2023-02-03T21:06:02Z',
      '2023-02-05T12:41:01Z',
      '2023-02-07T06:18:28Z',
      '2023-02-07T09:18:28Z',
      '2023-02-07T19:18:28Z',
      '2023-02-07T22:18:28Z',
    ];
    const groupedHours = statisticsModule.groupHoursByDaysOfTheWeekAndDayNightSlots(dates, 8, 18);
    assert.deepEqual(
      Object.getOwnPropertySymbols(groupedHours),
      [DaysOfTheWeek.WEDNESDAY, DaysOfTheWeek.FRIDAY, DaysOfTheWeek.SUNDAY, DaysOfTheWeek.TUESDAY],
    );
    assert.deepEqual(groupedHours[WEDNESDAY][DAY], [14, 17]);
    assert.deepEqual(groupedHours[WEDNESDAY][NIGHT], [19]);
    assert.deepEqual(groupedHours[FRIDAY][DAY], [15]);
    assert.deepEqual(groupedHours[FRIDAY][NIGHT], [22]);
    assert.deepEqual(groupedHours[SUNDAY][DAY], [13]);
    assert.deepEqual(groupedHours[SUNDAY][NIGHT], []);
    assert.deepEqual(groupedHours[TUESDAY][DAY], [10]);
    assert.deepEqual(groupedHours[TUESDAY][NIGHT], [7, 20, 23]);
  });
});
