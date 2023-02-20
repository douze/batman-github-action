const DayNight = Object.freeze({
  DAY: Symbol('Day'),
  NIGHT: Symbol('Night'),
});

const convertISODateToLocalHour = (date) => new Date(date).getHours();

const hourToDayNightKey = (hour, dayStart, dayEnd) => (
  dayStart <= hour && hour < dayEnd ? DayNight.DAY : DayNight.NIGHT);

/* eslint-disable no-param-reassign */
const groupHoursByDayNightSlots = (dates, localDayStart, localDayEnd) => (
  dates.reduce((group, date) => {
    const hour = convertISODateToLocalHour(date);
    const dayNightKey = hourToDayNightKey(hour, localDayStart, localDayEnd);
    group[dayNightKey] = group[dayNightKey] || [];
    group[dayNightKey].push(hour);
    return group;
  }, {}));
/* eslint-enable no-param-reassign */

module.exports = {
  DayNight,
  convertISODateToLocalHour,
  groupHoursByDayNightSlots,
};
