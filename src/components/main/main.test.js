import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Main from './main.jsx';

describe(`Main`, () => {
  it(`Main renders correctly`, () => {
    const renderer = new ShallowRenderer();
    const result = renderer
      .render(<Main />);

    expect(result).toMatchSnapshot();
  });
});