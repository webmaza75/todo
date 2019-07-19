import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';

import Main from './main';

describe(`Main`, () => {
  it(`Main renders correctly`, () => {
    const renderer = ShallowRenderer.createRenderer();
    const result = renderer
      .render(<Main />);

    expect(result).toMatchSnapshot();
  });
});