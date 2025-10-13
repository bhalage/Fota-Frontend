import React, {useEffect, useState } from "react";
import NewVehicleDrawer from "../components/NewVehicleDrawer";
import TokenPopup from "../components/TokenPopup";
import VehicleTable from "../components/VehicleTable";
import { useDispatch, useSelector } from "react-redux";
import { addNewVehicle, getAllVehicles } from "../services/vehicleService";
import { selectVehicles } from "../redux/vehicleSelector";
import { Button } from "antd";

const Vehicle = () => {
  const dispatch = useDispatch();
  const vehiclesData = useSelector(selectVehicles);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [tokenPopupOpen, setTokenPopupOpen] = useState(false);
  const [token, setToken] = useState("");
 
  const [vehicle, setVehicle] = useState({
    modelId: "",
    variantId: "",
    vehicleName: "",
    year: "",
  });

  const handleSubmit = async () => {
    try {
      const result = await dispatch(addNewVehicle(vehicle)).unwrap();
      console.log("Vehicle added:", result);
      if (result.status) {
        setToken(result?.data?.jwtToken);
        setTokenPopupOpen(true);
        setDrawerOpen(false);
        setVehicle({ modelId: "", variantId: "", name: "", year: "" });
        await dispatch(getAllVehicles());
      }
    } catch (error) {
      console.error("Failed to add vehicle:", error);
    }
  };

  useEffect(() => {
    if (!vehiclesData || vehiclesData.length === 0) {
      dispatch(getAllVehicles());
     
    }
  }, [dispatch, vehiclesData]);
    useEffect(() => {
  console.log(vehiclesData);
},[vehiclesData])
  return (
    <div className="relative">
      <div className="flex justify-between items-center sticky top-0 bg-white z-10 px-4 py-4 shadow mb-4">
        <h1 className="text-xl font-semibold">All Vehicles</h1>
        <Button type="primary" onClick={() => setDrawerOpen(true)}>
          + New Vehicle
        </Button>
      </div>
      <VehicleTable data={vehiclesData} />
      <NewVehicleDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        vehicle={vehicle}
        setVehicle={setVehicle}
        handleSubmit={handleSubmit}
      />
      <TokenPopup
        isOpen={tokenPopupOpen}
        onClose={() => setTokenPopupOpen(false)}
        token={token}
      />
    </div>
  );
};

export default React.memo(Vehicle);
