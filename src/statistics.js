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

const dayToDaysOfTheWeek = (dayNumber) => (
  DaysOfTheWeek[Object.keys(DaysOfTheWeek).find((d, i) => dayNumber === i)]);

const convertDatesToDaysOfTheWeek = (dates) => (
  dates
    .map((date) => new Date(date).getDay())
    .map((dayNumber) => dayToDaysOfTheWeek(dayNumber)));

/* eslint-disable no-param-reassign */
const countDaysOfTheWeek = (daysOfTheWeek) => (
  daysOfTheWeek.reduce((count, dayOfTheWeek) => {
    count[dayOfTheWeek] = count[dayOfTheWeek] + 1 || 1;
    return count;
  }, {}));
/* eslint-enable no-param-reassign */

const convertDatesToHours = (dates) => dates.map((date) => new Date(date).getHours());

/* eslint-disable no-param-reassign */
const countAsDayNightSlots = (hours, localDayStart, localDayEnd) => (
  hours.reduce((slots, hour) => {
    const key = localDayStart <= hour && hour < localDayEnd ? DayNight.DAY : DayNight.NIGHT;
    slots[key] = slots[key] + 1 || 1;
    return slots;
  }, { [DayNight.DAY]: 0, [DayNight.NIGHT]: 0 }));
/* eslint-enable no-param-reassign */

const extractDayOfTheWeekAndHour = (dateAsISO) => {
  const date = new Date(dateAsISO);
  return { dayOfTheWeek: dayToDaysOfTheWeek(date.getDay()), hour: date.getHours() };
};

/* eslint-disable no-param-reassign */
const groupHoursByDaysOfTheWeek = (dates) => (
  dates.reduce((group, date) => {
    const { dayOfTheWeek, hour } = extractDayOfTheWeekAndHour(date);
    group[dayOfTheWeek] = group[dayOfTheWeek] || [];
    group[dayOfTheWeek].push(hour);
    return group;
  }, {}));
/* eslint-enable no-param-reassign */

module.exports = {
  DaysOfTheWeek,
  DayNight,
  convertDatesToDaysOfTheWeek,
  countDaysOfTheWeek,
  convertDatesToHours,
  countAsDayNightSlots,
  groupHoursByDaysOfTheWeek,
};
