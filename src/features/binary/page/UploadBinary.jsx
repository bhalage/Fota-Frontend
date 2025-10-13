import React, { useEffect, useState, useCallback, useMemo, lazy } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Button } from "antd";
import { fetchBinaries } from "../redux/binarySlice";
const NewBinaryDrawer=lazy(()=>import("../components/NewBinaryDrawer"));
const BinaryTable=lazy(()=>import("../components/BinaryTable"))
const UploadBinary = React.memo(() => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  const { binaries, error } = useSelector(
    (state) => ({
      binaries: state.binary.binaries,
      error: state.binary.error,
    }),
    shallowEqual
  );

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  
  useEffect(() => {
    dispatch(fetchBinaries());
  }, [dispatch]);

  
  if (error) throw new Error(error);

  
  const memoizedBinaries = useMemo(() => binaries || [], [binaries]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center sticky top-0 bg-white z-10 px-4 py-4 shadow mb-4">
        <h1 className="text-2xl font-semibold">Available Binaries</h1>
        <Button type="primary" onClick={openDrawer}>
          + New Binary
        </Button>
      </div>

      <BinaryTable data={memoizedBinaries} />

      <NewBinaryDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </div>
  );
});

export default UploadBinary;
