import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';

import AppPanel from './app-panel';

describe(`AppPanel`, () => {
  it(`AppPanel renders correctly`, () => {
    const renderer = ShallowRenderer.createRenderer();
    const selected = [];
    const result = renderer
      .render(<AppPanel
        selected={selected}
        onSelectionReset={jest.fn()}
        onItemsDelete={jest.fn()}
        onItemsUndoDelete={jest.fn()}
        searchTitle={''}
        onInputChange={jest.fn()}
        onTitleSearch={jest.fn()}
      />);
    
    expect(result).toMatchSnapshot();
  });
});
