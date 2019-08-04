import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';

import ConfirmationDeleteDialog from './confirmation-delete-dialog';

describe(`ConfirmationDeleteDialog`, () => {
  it(`ConfirmationDeleteDialog renders correctly`, () => {
    const renderer = ShallowRenderer.createRenderer();
    const result = renderer
      .render(<ConfirmationDeleteDialog
        open={false}
        onTasksCancelDelete={jest.fn()}
        onTasksConfirmDelete={jest.fn()}
      />);

    expect(result).toMatchSnapshot();
  });
});
