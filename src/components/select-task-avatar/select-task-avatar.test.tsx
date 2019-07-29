import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';

import SelectTaskAvatar from './select-task-avatar';

describe(`SelectTaskAvatar`, () => {
  it(`TaskAvatar renders correctly with selected item`, () => {
    const renderer = ShallowRenderer.createRenderer();
    const isSelectedItem = true;
    const result = renderer
      .render(<SelectTaskAvatar isSelectedItem={isSelectedItem} />);

    expect(result).toMatchSnapshot();
  });

  it(`TaskAvatar renders correctly with non-selected item`, () => {
    const renderer = ShallowRenderer.createRenderer();
    const isSelectedItem = false;
    const result = renderer
      .render(<SelectTaskAvatar isSelectedItem={isSelectedItem} />);

    expect(result).toMatchSnapshot();
  });
});
