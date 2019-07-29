import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';

import AppTable from './app-table';

describe(`AppTable`, () => {
  it(`AppTable renders correctly`, () => {
    const renderer = ShallowRenderer.createRenderer();
    const result = renderer
      .render(<AppTable onItemSelect={jest.fn()} selected={[]} />);

    expect(result).toMatchSnapshot();
  });
});
