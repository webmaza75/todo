import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';

import AppPanel from './app-panel';

describe(`AppPanel`, () => {
  it(`AppPanel renders correctly`, () => {
    const renderer = ShallowRenderer.createRenderer();
    const result = renderer
      .render(<AppPanel />);
    
    expect(result).toMatchSnapshot();
  });
});
