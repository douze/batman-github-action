const assert = require('assert');
const statisticsModule = require('../src/statistics');
const batmanModule = require('../src/batman');

const { Identity } = batmanModule;

describe('Batman module', () => {
  it('Should group hours by days of the week and day/night slots', () => {
    const dates = [
      '2023-02-01T23:45:43Z',
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
    const result = batmanModule.whoAmI(groupedHours);
    assert.deepEqual(result, { identity: Identity.BATMAN, percentageByDay: 40, percentageByNight: 60 });
  });
});
