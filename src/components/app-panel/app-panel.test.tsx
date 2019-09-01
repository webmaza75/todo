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
        searchTitle={''}
        onInputChange={jest.fn()}
        isOpenConfirmDeleteDialog={false}
        onTasksCancelDelete={jest.fn()}
        onTasksConfirmDelete={jest.fn()}
        isOpenUndoDeleteSnackbar={false}
        onItemsExactlyDelete={jest.fn()}
        onItemsUndoDelete={jest.fn()}
        onToggleTaskForm={jest.fn()}
        isTaskFormOpen={false}
      />);
    
    expect(result).toMatchSnapshot();
  });
});
