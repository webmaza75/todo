import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';

import TaskAvatar from './task-avatar';

describe(`TaskAvatar`, () => {
  it(`TaskAvatar renders correctly`, () => {
    const renderer = ShallowRenderer.createRenderer();
    const props = 'Payload Monitoring Report';
    const result = renderer
      .render(<TaskAvatar props={props} />);

    expect(result).toMatchSnapshot();
  });
});
