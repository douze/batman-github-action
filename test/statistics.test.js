const assert = require('assert');
const statisticsModule = require('../src/statistics');

const { DAY, NIGHT } = statisticsModule.DayNight;

describe('Statistics module', () => {
  it('Should extract UTC hours from ISO dates', () => {
    const dates = [
      '2023-02-01T13:45:43Z',
      '2023-02-03T14:06:02Z',
      '2023-02-05T12:41:01Z',
      '2023-02-07T09:18:28Z',
    ];
    const hours = dates.map((date) => statisticsModule.extractUTCHour(date));
    assert.deepEqual(hours, [13, 14, 12, 9]);
  });
  it('Should convert local hours to UTC jours', () => {
    const localHour = '8';
    const utcHour = statisticsModule.convertLocalToUTCHour(localHour);
    const timezeoneOffset = new Date().getTimezoneOffset() / 60; // min to hour
    assert.equal(utcHour, +localHour + +timezeoneOffset);
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
    const localDayStart = 8;
    const localDayEnd = 18;
    const dayStart = statisticsModule.convertLocalToUTCHour(localDayStart);
    const dayEnd = statisticsModule.convertLocalToUTCHour(localDayEnd);
    const groupedHoursDay = [];
    const groupedHoursNight = [];
    // eslint-disable-next-line max-len
    const groupedHours = statisticsModule.groupHoursByDayNightSlots(dates, localDayStart, localDayEnd);
    dates.forEach((date) => {
      const hour = statisticsModule.extractUTCHour(date);
      if (dayStart <= hour && hour < dayEnd) groupedHoursDay.push(hour);
      else groupedHoursNight.push(hour);
    });
    assert.deepEqual(groupedHours[DAY], groupedHoursDay);
    assert.deepEqual(groupedHours[NIGHT], groupedHoursNight);
  });
});
