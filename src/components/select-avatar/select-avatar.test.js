import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';

import SelectAvatar from './select-avatar';

describe(`SelectAvatar`, () => {
  it(`SelectAvatar renders correctly with not select mode`, () => {
    const renderer = ShallowRenderer.createRenderer();
    const isSelectMode = false;
    const selected = false;
    const type = 'Payload Monitoring Report';
    const result = renderer
      .render(<SelectAvatar
        isSelectMode={isSelectMode}
        selected={selected}
        type={type}
      />);

    expect(result).toMatchSnapshot();
  });

  it(`SelectAvatar renders correctly with non-selected item`, () => {
    const renderer = ShallowRenderer.createRenderer();
    const isSelectMode = true;
    const selected = true;
    const type = 'Payload Monitoring Report';
    const result = renderer
    .render(<SelectAvatar
      isSelectMode={isSelectMode}
      selected={selected}
      type={type}
    />);

    expect(result).toMatchSnapshot();
  });
});
