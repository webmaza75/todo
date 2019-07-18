import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import AppPanel from './app-panel.jsx';

describe(`AppPanel`, () => {
  it(`AppPanel renders correctly`, () => {
    const renderer = new ShallowRenderer();
    const result = renderer
      .render(<AppPanel />);
    
    expect(result).toMatchSnapshot();
  });
});
