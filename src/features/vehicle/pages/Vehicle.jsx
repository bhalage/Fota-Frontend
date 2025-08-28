import { useEffect, useState } from "react";
import NewVehicleDrawer from "../components/NewVehicleDrawer";
import TokenPopup from "../components/TokenPopup";
import VehicleTable from "../components/VehicleTable";
import { useDispatch, useSelector } from "react-redux";
import { addNewVehicle, getAllVehicles } from "../services/vehicleService";
import { selectVehicles } from "../redux/vehicleSelector";

const Vehicle = () => {
  const dispatch = useDispatch();
  const vehiclesData = useSelector(selectVehicles); // ✅ safe array
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [tokenPopupOpen, setTokenPopupOpen] = useState(false);
  const [token, setToken] = useState("");

  const [vehicle, setVehicle] = useState({
    modelId: "",
    variantId: "",
    vehicleName: "",
    year: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(addNewVehicle(vehicle)).unwrap();
      if (result?.data?.jwtToken) {
        setToken(result?.data?.jwtToken);
        setTokenPopupOpen(true);
        setDrawerOpen(false);
        setVehicle({ modelId: "", variantId: "", name: "", year: "" });
      dispatch(getAllVehicles());
      }
    } catch (error) {
      console.error("Failed to add vehicle:", error);
    }
  };

  useEffect(() => {
    dispatch(getAllVehicles());
  }, [dispatch]);

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">All Vehicles</h1>
        <button
          className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setDrawerOpen(true)}
        >
          + New Vehicle
        </button>
      </div>

      {/* Vehicle list */}
      <VehicleTable data={vehiclesData} />

      {/* Drawer */}
      <NewVehicleDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        vehicle={vehicle}
        setVehicle={setVehicle}
        handleSubmit={handleSubmit}
      />

      {/* Token popup */}
      <TokenPopup
        isOpen={tokenPopupOpen}
        onClose={() => setTokenPopupOpen(false)}
        token={token}
      />
    </div>
  );
};

export default Vehicle;
