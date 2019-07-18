import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import AppTable from './app-table.jsx';

describe(`AppTable`, () => {
  it(`AppTable renders correctly`, () => {
    const renderer = new ShallowRenderer();
    const result = renderer
      .render(<AppTable />);

    expect(result).toMatchSnapshot();
  });
});
