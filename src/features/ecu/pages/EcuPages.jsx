import { Button } from "antd";
import React, { useEffect, useState } from "react";
import ECUManagementTable from "../components/ECUManagementTable";
import { useDispatch, useSelector } from "react-redux";
import { addNewEcu, getAllEcus } from "../services/ecuService";
import EcuFormDrawer from "../components/EcuFormDrawer";

const EcuPages = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ecu.loading);
  const data = useSelector((state) => state.ecu.ecus);
  const error = useSelector((state) => state.ecu.error);

  useEffect(() => {
    dispatch(getAllEcus());
  }, [dispatch]);

  useEffect(() => {
    console.log("ECUs updated:", data);
    console.log("Error state:", error);
  }, [data,error]);
  if(error){
    throw new Error(error);
  }

  const handleSubmit = (values) => {
    console.log("Submitting new ECU:", values);
    dispatch(addNewEcu(values)).then(() => {
      dispatch(getAllEcus()); 
    });
  };

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
        onClose={() => setDrawerOpen(false)}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default EcuPages;
