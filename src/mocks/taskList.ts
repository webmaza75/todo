import {TaskItem} from '../types';

const taskList: TaskItem[] = [
  {
    id: 1,
    type: `Payload Monitoring Report`,
    title: `Auto Orica USA report setting`,
    timeZone: `Asia/Aqtu UTC+5:00`,
    reportTime: `Wed Jul 17 2019 10:00:13 GMT+0300`,
    repeat: [6, 0, 1, 2, 3, 4, 5]
  },
  {
    id: 2,
    type: `Payload Monitoring Report`,
    title: `Motion Metrics International`,
    timeZone: `Asia/Aqtu UTC+5:00`,
    reportTime: `Wed Jul 17 2019 09:00:13 GMT+0300`,
    repeat: [0, 6]
  },
  {
    id: 3,
    type: `Fragmentation Report`,
    title: `MPM auto weekly report task`,
    timeZone: `America/Los_Angeles UTC+8:00`,
    reportTime: `Wed Jul 17 2019 15:00:13 GMT+0300`,
    repeat: [1, 2, 3, 4]
  },
  {
    id: 4,
    type: `Tooth Detection Report`,
    title: `Orica USA auto report`,
    timeZone: `Africa/Johannesburg UTC+2:00`,
    reportTime: `Wed Jul 17 2019 09:30:13 GMT+0300`,
    repeat: [4]
  },
  {
    id: 5,
    type: `Tooth Detection Report`,
    title: `Orica USA auto report`,
    timeZone: `Africa/Johannesburg UTC+2:00`,
    reportTime: `Wed Jul 17 2019 09:30:13 GMT+0300`,
    repeat: [1, 2, 4, 5, 3]
  },
];

export default taskList;
