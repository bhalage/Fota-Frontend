import React, { Suspense } from 'react'
const EcuTable =React.lazy(()=>import('./ECUManagementTable'))
const EcuList = ({data,loading,error}) => {
  return (<>
  {error && <p className='text-red-500'>Error : error</p>}
    <Suspense fallback={<div>Loading Ecus ...</div>}>
     <EcuTable data={data || []} loading={loading} />
  </Suspense>
  </>
  )
}

export default EcuList