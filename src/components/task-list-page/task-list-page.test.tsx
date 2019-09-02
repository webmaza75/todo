import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';

import TaskListPage from './task-list-page';

describe(`TaskListPage`, () => {
  it(`TaskListPage renders correctly`, () => {
    const renderer = ShallowRenderer.createRenderer();
    const result = renderer
      .render(<TaskListPage />);

    expect(result).toMatchSnapshot();
  });
});