export const average = (entries) => {
  let sumOfSgv = 0;
  entries.map((entry) => (sumOfSgv += entry.sgv));
  return Math.round(sumOfSgv / Object.keys(entries).length);
};

export const percentOfHigh = (entries) => {
  let sumOfHighSgv = Object.keys(
    entries.filter((entry) => entry.sgv > 180)
  ).length;
  return ((sumOfHighSgv / Object.keys(entries).length) * 100).toPrecision(2);
};

export const percentOfLow = (entries) => {
  let sumOfLowSgv = Object.keys(
    entries.filter((entry) => entry.sgv < 70)
  ).length;
  return ((sumOfLowSgv / Object.keys(entries).length) * 100).toPrecision(2);
};

export const percentOfInRange = (entries) => {
  let sumOfInRangeSgv = Object.keys(
    entries.filter((entry) => 70 <= entry.sgv && entry.sgv <= 180)
  ).length;
  return ((sumOfInRangeSgv / Object.keys(entries).length) * 100).toPrecision(3);
};

export const glycatedHemoglobinCalculator = (entries) => {
  return parseFloat((average(entries) + 46.7) / 28.7).toFixed(1);
};
