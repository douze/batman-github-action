const daysOfTheWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const convertToDaysOfTheWeek = (dates) => (
  dates.map((date) => new Date(date)).map((date) => daysOfTheWeek[date.getDay()]));

/* eslint-disable no-param-reassign */
const countDaysOfTheWeek = (days) => (
  days.reduce((count, value) => {
    count[value] = count[value] + 1 || 1;
    return count;
  }, {}));
/* eslint-enable no-param-reassign */

module.exports = { daysOfTheWeek, convertToDaysOfTheWeek, countDaysOfTheWeek };
