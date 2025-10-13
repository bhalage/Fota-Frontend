
import Breadcrumbs from "@/components/BreadCrumbs";
import { useLocation, useParams } from "react-router-dom";
import VehicleGeneralInfo from "./VehicleGeneralInfo";
import RolloutTable from "@/features/rollout/component/RolloutTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRolloutsByVin } from "../services/vehicleService";
import VehicleLogs from "./VehicleLogs";
import { Button } from "antd";

const VehicleInfo = () => {
  const { vehicleId } = useParams();
  const location = useLocation();
  const vehicle = location.state?.vehicle;
  const dispatch = useDispatch();

  const rolloutList = useSelector((state) => state.vehicles?.rolloutList || []);
  const loading = useSelector((state) => state.vehicles.loading);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = () => setIsModalOpen(false);
  const showModal = () => setIsModalOpen(true);

  useEffect(() => {
    if (vehicleId) {
      dispatch(getAllRolloutsByVin(vehicleId));
    }
  }, [dispatch, vehicleId]);

  if (!vehicle) {
    return <p>No vehicle data found for ID: {vehicleId}</p>;
  }

  return (
    <div>
      <Breadcrumbs />
      <VehicleGeneralInfo />
      
      
      <div style={{ paddingTop: "15px", textAlign: "right" }}>
        <Button type="primary" onClick={showModal}>
          View Live Logs
        </Button>
      </div>

      
      <div className="pt-4">
        <RolloutTable data={rolloutList} loading={loading} />
      </div>

      
      <VehicleLogs isModalOpen={isModalOpen} handleCancel={handleCancel} />
    </div>
  );
};

export default VehicleInfo;

