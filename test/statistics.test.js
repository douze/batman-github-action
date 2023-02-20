const assert = require('assert');
const statisticsModule = require('../src/statistics');

const { DAY, NIGHT } = statisticsModule.DayNight;

describe('Statistics module', () => {
  it('Should extract local hours from ISO dates', () => {
    const dates = [
      '2023-02-01T13:45:43Z',
      '2023-02-03T14:06:02Z',
      '2023-02-05T12:41:01Z',
      '2023-02-07T09:18:28Z',
    ];
    const hours = dates.map((date) => statisticsModule.convertISODateToLocalHour(date));
    assert.deepEqual(hours, [14, 15, 13, 10]);
  });
  it('Should group hours by day/night slots', () => {
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
    const groupedHours = statisticsModule.groupHoursByDayNightSlots(dates, 8, 18);
    assert.deepEqual(groupedHours[DAY], [14, 17, 15, 13, 10]);
    assert.deepEqual(groupedHours[NIGHT], [19, 22, 7, 20, 23]);
  });
});
