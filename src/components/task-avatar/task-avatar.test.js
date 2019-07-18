import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import TaskAvatar from './task-avatar.jsx';

describe(`TaskAvatar`, () => {
  it(`TaskAvatar renders correctly`, () => {
    const renderer = new ShallowRenderer();
    const result = renderer
      .render(<TaskAvatar />);

    expect(result).toMatchSnapshot();
  });
});