export const getRepeatDays = (arr: number[]): string => {
  const dayNameList = [`Sun`, `Mon`, `Tue`, `Wed`, `Thur`, `Fri`, `Sat`];
  const sortedArr: number[] = [...arr].sort();
  
  if (sortedArr.length === 2 && sortedArr.toString() === [0, 6].toString()) {
    return `Weekend`;
  }
  if (sortedArr.length === 5 && sortedArr.toString() === [1, 2, 3, 4, 5].toString()) {
    return `Weekdays`;
  }
  if (sortedArr.length === 7 && sortedArr.toString() === [0, 1, 2, 3, 4, 5, 6].toString()) {
    return `Everyday`;
  }
  return sortedArr.map((item) => dayNameList[item]).join(`, `);
};

export const getReportTime = (date: string): string => {
  let hours: number = new Date(date).getHours();
  const extentionTime: string = hours >= 0 && hours < 12 ? `AM` : `PM`;
  hours = hours < 12 ? hours : hours - 12;
  let tempStr: string = new Date(date).getMinutes().toString();
  return `${hours}:${tempStr.padStart(2, `0`)} ${extentionTime}`;
};