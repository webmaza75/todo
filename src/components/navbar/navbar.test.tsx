import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';

import Navbar from './navbar';

describe(`Navbar`, () => {
  it(`Navbar renders correctly`, () => {
    const renderer = ShallowRenderer.createRenderer();
    const result = renderer
      .render(<Navbar />);

    expect(result).toMatchSnapshot();
  });
});
