import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';

import Logo from './logo';

describe(`Logo`, () => {
  it(`Logo renders correctly`, () => {
    const renderer = ShallowRenderer.createRenderer();
    const result = renderer
      .render(<Logo />);

    expect(result).toMatchSnapshot();
  });
});