import * as React from 'react';

export function useConfirm(Component) {
  const [open, toggle] = React.useState(false);
  const currentRef = React.useRef((value) => {});

  function show() {
    toggle(true);
    return new Promise(resolve => (currentRef.current = resolve));
  }

  function Confirm(): false | JSX.Element {
    return (
      open && (
        <Component
          onConfirm={() => {
            currentRef.current(true);
            toggle(false);
          }}
          onCancel={() => {
            currentRef.current(false);
            toggle(false);
          }}
        />
      )
    );
  }
  return [Confirm, show];
}
