type TPeriodKEY = "DAY" | "WEEK" | "MONTH";
type TPeriodText = "Hari" | "Bulan" | "Tahun";

export type TPeriod = {
  text: TPeriodText;
};
export type TPeriods = {
  [key in TPeriodKEY]: TPeriod;
};

const PERIOD: TPeriods = {
  DAY: { text: "Hari" },
  WEEK: { text: "Bulan" },
  MONTH: { text: "Tahun" },
};

export default PERIOD;
