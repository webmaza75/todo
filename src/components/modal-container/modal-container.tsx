import * as React from 'react';

import {createPubSub} from '../../lib/createPubSub';

const pubsub = createPubSub();

export function ModalContainer() {
  const [ModalComponent, toggleShow] = React.useState(Object);

  React.useEffect(() => {
    pubsub.subscribe("openModal", modal => {
      toggleShow({ modal });
    });
    return () => pubsub.unsubscribe("openModal");
  }, []);

  return (
    <div>
      {ModalComponent && ModalComponent.modal && (
        <ModalComponent.modal
          onConfirm={() => {
            toggleShow(false);
            pubsub.publish("modalComplete", true);
          }}
          onCancel={() => {
            toggleShow(false);
            pubsub.publish("modalComplete", false);
          }}
        />
      )}
    </div>
  );
}

export function openModal(Modal) {
  return new Promise(resolve => {
    pubsub.subscribe("modalComplete", function cb(param) {
      resolve(param);
      return pubsub.unsubscribe("modalComplete");
    });

    pubsub.publish("openModal", Modal);
  });
}
