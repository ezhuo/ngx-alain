import * as addDays from 'date-fns/add_days';
import * as endOfDay from 'date-fns/end_of_day';
import * as endOfMonth from 'date-fns/end_of_month';
import * as endOfWeek from 'date-fns/end_of_week';
import * as endOfYear from 'date-fns/end_of_year';
import * as format from 'date-fns/format';
import * as parse from 'date-fns/parse';
import * as startOfDay from 'date-fns/start_of_day';
import * as startOfMonth from 'date-fns/start_of_month';
import * as startOfWeek from 'date-fns/start_of_week';
import * as startOfYear from 'date-fns/start_of_year';
import * as subMonths from 'date-fns/sub_months';
import * as subWeeks from 'date-fns/sub_weeks';
import * as subYears from 'date-fns/sub_years';

/**
 * 获取时间范围
 * @param type 类型，带 `-` 表示过去一个时间，若指定 `number` 表示天数
 * @param time 开始时间
 */
export function getTimeDistance(
  type:
    | 'today'
    | '-today'
    | 'yesterday'
    | 'week'
    | '-week'
    | 'month'
    | '-month'
    | 'year'
    | '-year'
    | number,
  time?: Date | string | number,
): [Date, Date] {
  time = parse(time || new Date());
  const options = { weekStartsOn: 1 };

  let res: [Date, Date];
  switch (type) {
    case 'today':
      res = [time, time];
      break;
    case '-today':
      res = [addDays(time, -1), time];
      break;
    case 'yesterday':
      res = [addDays(time, -1), addDays(time, -1)];
      break;
    case 'week':
      res = [startOfWeek(time, options), endOfWeek(time, options)];
      break;
    case '-week':
      res = [startOfWeek(subWeeks(time, 1), options), endOfWeek(subWeeks(time, 1), options)];
      break;
    case 'month':
      res = [startOfMonth(time), endOfMonth(time)];
      break;
    case '-month':
      res = [startOfMonth(subMonths(time, 1)), endOfMonth(subMonths(time, 1))];
      break;
    case 'year':
      res = [startOfYear(time), endOfYear(time)];
      break;
    case '-year':
      res = [startOfYear(subYears(time, 1)), endOfYear(subYears(time, 1))];
      break;
    default:
      res = type > 0 ? [time, addDays(time, type)] : [addDays(time, type), time];
      break;
  }
  return fixEndTimeOfRange(res);
}

/**
 * fix time is the most, big value
 */
export function fixEndTimeOfRange(dates: [Date, Date]): [Date, Date] {
  return [ startOfDay(dates[0]), endOfDay(dates[1]) ];
}
