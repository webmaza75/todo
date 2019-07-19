import {
  getRepeatDays,
  getReportTime
} from './utils';

describe(`utils work correctly`, () => {
  const repeatDays = [
    [[0], `Sun`],
    [[1], `Mon`],
    [[2], `Tue`],
    [[3, 2], `Tue, Wed`],
    [[4], `Thur`],
    [[5, 6], `Fri, Sat`],
    [[6], `Sat`],
    [[0, 6], `Weekend`],
    [[6, 0], `Weekend`],
    [[1, 1, 3, 4, 6], `Mon, Mon, Wed, Thur, Sat`],
    [[1, 2, 3, 4, 5], `Weekdays`],
    [[1, 3, 4], `Mon, Wed, Thur`],
    [[0, 1, 2, 3, 4, 5, 6], `Everyday`]
  ];
  test.each(repeatDays)(`getRepeatDays returns correctly repeat days\` values`, (dayList: number[], repeatNames: string) => {
    expect(getRepeatDays(dayList)).toEqual(repeatNames);
  });

  const reportTimeList = [
    [`Wed Jul 17 2019 00:00:00 GMT+0300`, `0:00 AM`],
    [`Wed Jul 17 2019 00:00:59 GMT+0300`, `0:00 AM`],
    [`Wed Jul 17 2019 00:01:00 GMT+0300`, `0:01 AM`],
    [`Wed Jul 17 2019 00:59:00 GMT+0300`, `0:59 AM`],
    [`Wed Jul 17 2019 02:59:00 GMT+0300`, `2:59 AM`],
    [`Wed Jul 17 2019 09:30:55 GMT+0300`, `9:30 AM`],
    [`Wed Jul 17 2019 10:03:00 GMT+0300`, `10:03 AM`],
    [`Wed Jul 17 2019 11:59:00 GMT+0300`, `11:59 AM`],
    [`Wed Jul 17 2019 12:00:00 GMT+0300`, `0:00 PM`],
    [`Wed Jul 17 2019 13:40:00 GMT+0300`, `1:40 PM`],
    [`Wed Jul 17 2019 17:59:00 GMT+0300`, `5:59 PM`],
    [`Wed Jul 17 2019 19:30:00 GMT+0300`, `7:30 PM`],
    [`Wed Jul 17 2019 22:00:59 GMT+0300`, `10:00 PM`],
    [`Wed Jul 17 2019 23:59:59 GMT+0300`, `11:59 PM`]
  ];
  test.each(reportTimeList)(`getReportTime returns correctly reportTime with 12th long day`, (datetime, reportTime) => {
    expect(getReportTime(datetime)).toEqual(reportTime);
  });
});
