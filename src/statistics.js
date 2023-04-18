const DayNight = Object.freeze({
  DAY: Symbol('Day'),
  NIGHT: Symbol('Night'),
});

const extractUTCHour = (date) => new Date(date).getUTCHours();

const convertLocalToUTCHour = (localHour) => {
  const date = new Date();
  date.setHours(localHour);
  return date.getUTCHours();
};

const hourToDayNightKey = (hour, dayStart, dayEnd) => (
  dayStart <= hour && hour < dayEnd ? DayNight.DAY : DayNight.NIGHT);

/* eslint-disable no-param-reassign */
const groupHoursByDayNightSlots = (dates, localDayStart, localDayEnd) => (
  dates.reduce((group, date) => {
    const hour = extractUTCHour(date);
    const dayStart = convertLocalToUTCHour(localDayStart);
    const dayEnd = convertLocalToUTCHour(localDayEnd);
    const dayNightKey = hourToDayNightKey(hour, dayStart, dayEnd);
    group[dayNightKey] = group[dayNightKey] || [];
    group[dayNightKey].push(hour);
    return group;
  }, {}));
/* eslint-enable no-param-reassign */

module.exports = {
  DayNight,
  extractUTCHour,
  convertLocalToUTCHour,
  groupHoursByDayNightSlots,
};
