export const glucoseToday = (entries, today) => {
  return entries.filter(
    (entry) =>
      new Date(entry.date).toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
      }) === today
  );
};

export const glucoseByDays = (entries, day) => {
  console.log(entries);
  return entries.filter(
    (entry) =>
      new Date(entry.date).toLocaleDateString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "numeric",
      }) < day
  );
};
