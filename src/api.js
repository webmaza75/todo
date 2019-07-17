import { get } from 'axios';
import { intersection, uniq } from 'lodash';
import * as moment from 'moment';
import { environment } from '../environments/environment';
import { mockData } from './mock-data';

let fakeStartId = 1000;

class ApiService {
  async getById(id) {
    const task = mockData.filter(x => x.id === id)[0];
    return task;
  }

  async isUniqueTaskTitle(title) {
    const t = mockData.find(x => x.title === title);
    return t ? t.id : undefined;
  }

  getTasks() {
    return new Promise(ok => {
      setTimeout(() => {
        ok(mockData);
      }, 500);
    });
  }

  getTimezoneByLatLng({ lat, lng }) {
    const params = {
      key: environment.gTzKey,
      location: `${lat},${lng}`,
      timestamp: Math.floor(Date.now() / 1000).toString()
    };
    return get('https://maps.googleapis.com/maps/api/timezone/json', {
      params
    }).then(({ data }) => {
      const c = moment.duration(Math.abs(data.rawOffset), 'seconds');
      const formatted = moment('2000-01-01 00:00:00').add(c).format('HH:mm');

      const sign = data.rawOffset > 0 ? '+' : '-';
      return `${data.timeZoneId} UTC${sign}${formatted}`;
    });
  }

  getLocationsByAddress(address) {
    const acceptableTypes = [
      'political',
      'country',
      'administrative_area_level_1',
      'administrative_area_level_2'
    ];

    if (!address) {
      return Promise.resolve([]);
    }
    const params = {
      address,
      key: environment.gmapsApiKey
    };

    return get('https://maps.googleapis.com/maps/api/geocode/json', {
      params
    }).then(({ data }) => {
      const regions = data.results.filter(
        e => intersection(e.types, acceptableTypes).length
      );
      return regions.map(r => r.geometry.location);
    });
  }

  getTimeZoneByName(name) {
    const locations = this.getLocationsByAddress(name);
    return locations
      .then(list =>
        Promise.all(list.map(entry => this.getTimezoneByLatLng(entry)))
      )
      .then(data => {
        return uniq(data);
      });
  }

  async getRecipients() {
    return [
      { name: 'Foo', value: 'foo@demo.com' },
      { name: 'Bar', value: 'bar@demo.com' },
      { name: 'Baz', value: 'baz@demo.com' }
    ];
  }

  deleteTasks(tasks) {
    return new Promise(ok => setTimeout(() => ok(), 1000));
  }

  async upsert(task) {
    if (task.id) {
      const oldTask = mockData.find(t => t.id === task.id);
      if (oldTask) {
        Object.assign(oldTask, task);
      }
    } else {
      task.id = fakeStartId++;
      mockData.push(task);
    }
    return new Promise(ok => {
      setTimeout(ok, 500);
    });
  }
}

export default new ApiService();
