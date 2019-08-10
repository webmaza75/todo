import {
  getRepeatDays,
  getReportTime
} from './utils';

import * as jsc from 'jsverify';
import {uniq} from 'lodash';

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
  it(`repeatDays has uniqum values`, () => {
    const checkUniqRepeatDays =
      jsc.forall(jsc.array(jsc.nat(6)), (dayList: Array<number>) =>  {
        const result = getRepeatDays(dayList);
        const anotherResult = getRepeatDays(uniq(dayList));
        return result === anotherResult;
      });

    jsc.assert(checkUniqRepeatDays);
  });

  it(`repeatDays should be equal`, () => {
    const checkEqualRepeatDays =
      jsc.forall(jsc.array(jsc.nat(6)), (dayList: Array<number>) =>  {
        const sortDayList = [...dayList].sort();
        const shuffleDayList = [...dayList].sort(() => 0.5 - Math.random());
        const reverseDayList = [...dayList].reverse();

        const simpleResult = getRepeatDays(dayList);
        const sortResult = getRepeatDays(sortDayList);
        const shuffleResult = getRepeatDays(shuffleDayList);
        const reverseResult = getRepeatDays(reverseDayList);

        return simpleResult === sortResult &&
          sortResult === shuffleResult &&
          shuffleResult === reverseResult;
      });

    jsc.assert(checkEqualRepeatDays);
  });
});
