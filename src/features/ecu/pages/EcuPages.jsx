import { Button } from "antd";
import React, { lazy, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewEcu, getAllEcus } from "../services/ecuService";

const EcuFormDrawer = lazy(() => import("../components/EcuFormDrawer"));
const ECUManagementTable = lazy(() => import("../components/ECUManagementTable"));

const EcuPages = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ecu.loading);
  const data = useSelector((state) => state.ecu.ecus);

  useEffect(() => {
    dispatch(getAllEcus());
  }, [dispatch]);

  const handleSubmit = useCallback(
    (values) => {
      dispatch(addNewEcu(values)).then(() => {
        dispatch(getAllEcus());
      });
    },
    [dispatch]
  );

  const handleDrawerClose = useCallback(() => setDrawerOpen(false), []);

  return (
    <div className="relative">
      <div className="flex justify-between items-center sticky top-0 bg-white z-10 p-4 shadow mb-4">
        <h1 className="text-2xl font-semibold">All ECUs</h1>
        <Button type="primary" onClick={() => setDrawerOpen(true)}>
          + New ECU
        </Button>
      </div>

      <ECUManagementTable data={data || []} loading={loading} />

      <EcuFormDrawer
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default React.memo(EcuPages);
