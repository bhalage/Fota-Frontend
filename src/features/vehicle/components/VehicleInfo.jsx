import Breadcrumbs from "@/components/BreadCrumbs";
import { useLocation, useParams } from "react-router-dom";
import VehicleGeneralInfo from "./VehicleGeneralInfo";

const VehicleInfo = () => {
  const { vehicleId } = useParams();
  const location = useLocation();
  const vehicle = location.state?.vehicle;

  if (!vehicle) {
    return <p>No vehicle data found for ID: {vehicleId}</p>;
  }

  return (
    <div>
        <div className="">

        <Breadcrumbs/>
        </div>
        <VehicleGeneralInfo/>
      
    </div>
  );
};

export default VehicleInfo;
