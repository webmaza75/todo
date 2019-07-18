export const getRepeatDays = (arr) => {
  const dayList = [`Sun`, `Mon`, `Tue`, `Wed`, `Thur`, `Fri`, `Sat`];
  const sortedArr = arr.sort();
  
  if (sortedArr.length === 2 && sortedArr.toString() === [0, 6].toString()) {
    return `Weekend`;
  }
  if (sortedArr.length === 5 && sortedArr.toString() === [1, 2, 3, 4, 5].toString()) {
    return `Weekdays`;
  }
  return sortedArr.map((item) => dayList[item]).join(`, `);
};

export const getReportTime = (date) => {
  let hours = new Date(date).getHours();
  const extentionTime = hours >= 0 && hours < 12 ? `AM` : `PM`;
  hours = hours < 12 ? hours : hours - 12;
  return `${hours}:${new Date(date).getMinutes().toString().padStart(2, `0`)} ${extentionTime}`;
};
