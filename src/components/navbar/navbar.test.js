import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Navbar from './navbar.jsx';

describe(`Navbar`, () => {
  it(`Navbar renders correctly`, () => {
    const renderer = new ShallowRenderer();
    const result = renderer
      .render(<Navbar />);

    expect(result).toMatchSnapshot();
  });
});
