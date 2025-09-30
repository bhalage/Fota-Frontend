import React, { Suspense } from 'react';
const NewModelDrawer = React.lazy(() => import('./NewModelDrawer'));

const ModelFormDrawer = ({ isOpen, onClose, name, setName, onSubmit }) => (
  <Suspense fallback={<div>Loading drawer...</div>}>
    <NewModelDrawer
      isOpen={isOpen}
      onClose={onClose}
      name={name}
      setName={setName}
      handleSubmit={onSubmit}
    />
  </Suspense>
);

export default React.memo(ModelFormDrawer);
