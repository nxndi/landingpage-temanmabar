import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.locale("id");

const formatDate = {
  // Format ISO date or Date object to string
  toString: (
    date: string | Date,
    format: string = "DD/MM/YYYY HH:mm:ss",
  ): string => {
    return dayjs.utc(date).tz(dayjs.tz.guess()).format(format);
  },

  // Parse string to date
  toDate: (
    dateString: string,
    format: string = "DD/MM/YYYY HH:mm:ss",
  ): Dayjs => {
    return dayjs.tz(dateString, format, dayjs.tz.guess());
  },

  // Convert string date or Date object to ISO date
  toISO: (
    date: string | Date,
    format: string = "DD/MM/YYYY HH:mm:ss",
  ): string => {
    return dayjs.tz(date, format, dayjs.tz.guess()).toISOString();
  },

  // Convert ISO date to a Dayjs object
  fromISO: (isoDate: string): Dayjs => {
    return dayjs.utc(isoDate).tz(dayjs.tz.guess());
  },

  // Compare two ISO dates
  compare: (isoDate1: string, isoDate2?: string): string => {
    dayjs.extend(relativeTime);
    if (!isoDate2) {
      return dayjs.utc(isoDate1).fromNow();
    }
    return dayjs.utc(isoDate1).from(dayjs(isoDate2));
  },
};

export default formatDate;
