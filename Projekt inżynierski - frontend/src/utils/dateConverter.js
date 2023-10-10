export const todayString = new Date().toLocaleDateString("pl-PL", {
  year: "numeric",
  month: "2-digit",
  day: "numeric",
});

export const dateFromNow = (days, today) => {
  return new Date(today.setDate(today.getDate() - days)).toLocaleDateString(
    "pl-PL",
    {
      year: "numeric",
      month: "2-digit",
      day: "numeric",
    }
  );
};
