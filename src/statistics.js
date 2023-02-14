const DaysOfTheWeek = Object.freeze({
  SUNDAY: Symbol('Sunday'),
  MONDAY: Symbol('Monday'),
  TUESDAY: Symbol('Tuesday'),
  WEDNESDAY: Symbol('Wednesday'),
  THRUSDAY: Symbol('Thursday'),
  FRIDAY: Symbol('Friday'),
  SATURDAY: Symbol('Saturday'),
});

const convertToDaysOfTheWeek = (dates) => (
  dates
    .map((date) => new Date(date).getDay())
    .map((day) => DaysOfTheWeek[Object.keys(DaysOfTheWeek).find((d, i) => day === i)]));

/* eslint-disable no-param-reassign */
const countDaysOfTheWeek = (daysOfTheWeek) => (
  daysOfTheWeek.reduce((count, value) => {
    count[value] = count[value] + 1 || 1;
    return count;
  }, {}));
/* eslint-enable no-param-reassign */

module.exports = { DaysOfTheWeek, convertToDaysOfTheWeek, countDaysOfTheWeek };
