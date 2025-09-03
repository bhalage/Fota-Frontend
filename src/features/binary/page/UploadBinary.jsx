import React, { useEffect, useState } from 'react'
import NewBinaryDrawer from '../components/NewBinaryDrawer';
import { Button } from 'antd';
import { Binary } from 'lucide-react';
import BinaryTable from '../components/BinaryTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBinaries } from '../redux/binarySlice';

const UploadBinary = () => {
  const [isDrawerOpen, setDrawerOpen] = useState (false);
  const { binaries } = useSelector((state) => state.binary);
  const dispatch=useDispatch();
  useEffect(() => {
  dispatch(fetchBinaries());
}, [dispatch]);

useEffect(() => {
  console.log("Binaries from Redux:", binaries);
}, [binaries]);

  return (
  <div className="relative">
      <div  className="flex justify-between items-center sticky top-0 bg-white z-10 px-4 py-4 shadow mb-4">
        <h1 className="text-2xl font-semibold">Available Binaries</h1>
        <Button
         type="primary"
          onClick={() => setDrawerOpen(true)}
        >
          + New Binary
        </Button>
      </div>
      <BinaryTable data={binaries||[]}/>
      <NewBinaryDrawer isOpen={isDrawerOpen} onClose={()=>setDrawerOpen(false)}/>
</div>
  )
}

export default UploadBinary