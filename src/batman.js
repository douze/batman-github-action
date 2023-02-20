const { DayNight } = require('./statistics');

const Identity = Object.freeze({
  BRUCE_WAYNE: Symbol('Bruce Wayne'),
  BATMAN: Symbol('Batman'),
});

const numberOfHoursToPercentage = (numberOfHours, totalNumberOfJours) => (
  (numberOfHours / totalNumberOfJours) * 100);

const whoAmI = (groupedHours) => {
  const numberOfHoursByDay = groupedHours[DayNight.DAY].length;
  const numberOfHoursByNight = groupedHours[DayNight.NIGHT].length;
  const totalNumberOfHours = numberOfHoursByDay + numberOfHoursByNight;
  if (totalNumberOfHours === 0) return { identity: Identity.BATMAN }; // sane defaults ;)

  return {
    identity: numberOfHoursByNight > numberOfHoursByDay ? Identity.BATMAN : Identity.BRUCE_WAYNE,
    percentageByDay: numberOfHoursToPercentage(numberOfHoursByDay, totalNumberOfHours),
    percentageByNight: numberOfHoursToPercentage(numberOfHoursByNight, totalNumberOfHours),
  };
};

module.exports = {
  Identity,
  whoAmI,
};
