import * as React from 'react';
import * as ShallowRenderer from 'react-test-renderer/shallow';

import SimpleSnackbar from './simple-snackbar';

describe(`SimpleSnackbar`, () => {
  it(`SimpleSnackbar renders correctly`, () => {
    const renderer = ShallowRenderer.createRenderer();
    const result = renderer
      .render(<SimpleSnackbar
        isOpenUndoDeleteSnackbar={false}
        onItemsExactlyDelete={jest.fn()}
        onItemsUndoDelete={jest.fn()}
      />);

    expect(result).toMatchSnapshot();
  });
});
