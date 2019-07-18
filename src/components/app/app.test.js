import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import App from './app.jsx';

describe(`App`, () => {
  it(`App renders correctly`, () => {
    const renderer = new ShallowRenderer();
    const result = renderer
      .render(<App />);

    expect(result).toMatchSnapshot();
  });
});
