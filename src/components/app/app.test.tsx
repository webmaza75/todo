import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';

import App from './app';

describe(`App`, () => {
  it(`App renders correctly`, () => {
    const renderer = ShallowRenderer.createRenderer();
    const result = renderer
      .render(<App />);

    expect(result).toMatchSnapshot();
  });
});
