import React, { Suspense } from 'react';
const ModelTable = React.lazy(() => import('./ModelTable'));

const ModelList = ({ data, loading, error }) => (
  <>
    {error && <p className="text-red-500">Error: {error}</p>}
    <Suspense fallback={<div>Loading models...</div>}>
      <ModelTable data={data || []} loading={loading} />
    </Suspense>
  </>
);

export default React.memo(ModelList);
