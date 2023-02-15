const DaysOfTheWeek = Object.freeze({
  SUNDAY: Symbol('Sunday'),
  MONDAY: Symbol('Monday'),
  TUESDAY: Symbol('Tuesday'),
  WEDNESDAY: Symbol('Wednesday'),
  THRUSDAY: Symbol('Thursday'),
  FRIDAY: Symbol('Friday'),
  SATURDAY: Symbol('Saturday'),
});

const DayNight = Object.freeze({
  DAY: Symbol('Day'),
  NIGHT: Symbol('Night'),
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

const convertToHours = (dates) => dates.map((date) => new Date(date).getHours());

/* eslint-disable no-param-reassign */
const storeInDayNightSlots = (hours, dayStart, dayEnd) => (
  hours.reduce((slots, value) => {
    const key = dayStart <= value && value < dayEnd ? DayNight.DAY : DayNight.NIGHT;
    slots[key] = slots[key] + 1 || 1;
    return slots;
  }, { [DayNight.DAY]: 0, [DayNight.NIGHT]: 0 }));
/* eslint-enable no-param-reassign */

module.exports = {
  DaysOfTheWeek,
  DayNight,
  convertToDaysOfTheWeek,
  countDaysOfTheWeek,
  convertToHours,
  storeInDayNightSlots,
};
