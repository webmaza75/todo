import {
  getRepeatDays,
  getReportTime
} from './utils';

import * as jsc from 'jsverify';
import {uniq} from 'lodash';

describe(`utils work correctly`, () => {
  const repeatDays: [number[], string][] = [
    [[0], `Sun`],
    [[1], `Mon`],
    [[2], `Tue`],
    [[3, 2], `Tue, Wed`],
    [[4], `Thur`],
    [[5, 6], `Fri, Sat`],
    [[6], `Sat`],
    [[0, 6], `Weekend`],
    [[6, 0], `Weekend`],
    [[1, 1, 3, 4, 6], `Mon, Wed, Thur, Sat`],
    [[1, 2, 3, 4, 5], `Weekdays`],
    [[1, 3, 4], `Mon, Wed, Thur`],
    [[0, 1, 2, 3, 4, 5, 6], `Everyday`]
  ];
  test.each(repeatDays)(`getRepeatDays returns correctly repeat days\` values`, (dayList: number[], repeatNames: string) => {
    expect(getRepeatDays(dayList)).toEqual(repeatNames);
  });

  const reportTimeList: [string, string][] = [
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

describe(`utils\` reportTime logic works correctly`, () => {
  it(`reportTime length is more or equal then 7 and less or equal then 8`, () => {
    const checkReportTimeLength =
      jsc.forall(jsc.datetime, (date: string) =>  {
        const result = getReportTime(date);
        return result.length >= 7 && result.length <= 8;
      });

    jsc.assert(checkReportTimeLength);
  });

  it(`reportTime tail contains AM or PM`, () => {
    const checkReportTimeTail =
      jsc.forall(jsc.datetime, (date: string) =>  {
        const result = getReportTime(date);

        if (new Date(date).getHours() >= 12) {
          return result.substr(-2) === 'PM';
        }
        return result.substr(-2) === 'AM';
      });

    jsc.assert(checkReportTimeTail);
  });

  it(`reportTime 2-th or 3-th char is ':'`, () => {
    const checkReportTimeColonPosition =
      jsc.forall(jsc.datetime, (date: string) =>  {
        const result = getReportTime(date);

        return result.indexOf(':') === 1 || result.indexOf(':') === 2;
      });

    jsc.assert(checkReportTimeColonPosition);
  });

  it(`reportTime is a string`, () => {
    const checkReportTimeType =
      jsc.forall(jsc.datetime, (date: string) =>  {
        const result = getReportTime(date);

        return typeof result === "string";
      });

    jsc.assert(checkReportTimeType);
  });

  it(`reportTime has correct format`, () => {
    const checkReportTimeFormat =
      jsc.forall(jsc.datetime, (date: string) =>  {
        const result = getReportTime(date);

        return result.search(/^\d{1,2}:\d{2} (A|P)M$/) !== -1;
      });

    jsc.assert(checkReportTimeFormat);
  });

  it(`reportTime 0 <= hours < 12 and 0 <= minutes <= 59`, () => {
    const checkReportTimeFormat =
      jsc.forall(jsc.datetime, (date: string) =>  {
        const result = getReportTime(date);
        const chunks = result.split(':');
        const chunk0 = parseInt(chunks[0], 10);
        const chunk1 = parseInt(chunks[1], 10);

        return chunk0 >= 0 &&
          chunk0 < 12 &&
          chunk1 >=0 &&
          chunk1 <= 59;
      });

    jsc.assert(checkReportTimeFormat);
  });
});

describe(`utils\` getRepeatDays logic works correctly`, () => {
  it(`repeatDays is a string`, () => {
    const checkRepeatDays =
      jsc.forall(jsc.array(jsc.nat(6)), (dayList: Array<number>) =>  {
        const result = getRepeatDays(dayList);
        return typeof result === "string";
      });

    jsc.assert(checkRepeatDays);
  });

  it(`repeatDays has uniqum values`, () => {
    const checkUniqRepeatDays =
      jsc.forall(jsc.array(jsc.nat(6)), (dayList: Array<number>) =>  {
        const result = getRepeatDays(dayList);
        const anotherResult = getRepeatDays(uniq(dayList));
        return result === anotherResult;
      });

    jsc.assert(checkUniqRepeatDays);
  });

  it(`repeatDays has uniqum values`, () => {
    const checkUniqRepeatDays =
      jsc.forall(jsc.array(jsc.nat(6)), (dayList: Array<number>) =>  {
        const result = getRepeatDays(dayList);
        const uniqDayList = uniq(dayList);
        const dayCount = uniqDayList.length;

        if (dayCount === 7) {
          return result === 'Everyday';
        } else if (dayCount === 2 && uniqDayList.includes(0) && uniqDayList.includes(6)) {
          return result === 'Weekend';
        } else if (dayCount === 5 && !uniqDayList.includes(0) && !uniqDayList.includes(6)) {
          return result === 'Weekdays';
        } else if (dayCount === 0) {
          return result === '';
        } else if (dayCount === 1) {
          return result.length === 3 || result.length === 4;
        }

        return dayCount === result.split(',').length;
      });

    jsc.assert(checkUniqRepeatDays);
  });
});
