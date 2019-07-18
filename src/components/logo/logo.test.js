import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Logo from './logo.jsx';

describe(`Logo`, () => {
  it(`Logo renders correctly`, () => {
    const renderer = new ShallowRenderer();
    const result = renderer
      .render(<Logo />);

    expect(result).toMatchSnapshot();
  });
});