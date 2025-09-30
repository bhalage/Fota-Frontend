import Breadcrumbs from "@/components/BreadCrumbs";
import { useLocation, useParams } from "react-router-dom";
import VehicleGeneralInfo from "./VehicleGeneralInfo";
import RolloutTable from "@/features/rollout/component/RolloutTable";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRolloutsByVin } from "../services/vehicleService";

const VehicleInfo = () => {
  const { vehicleId } = useParams();
  const location = useLocation();
  const vehicle = location.state?.vehicle;
const dispatch=useDispatch();
const rolloutList=useSelector((state)=>state.vehicles?.rolloutList||[]);
const loading=useSelector((state)=>state.vehicles.loading);
  if (!vehicle) {
    return <p>No vehicle data found for ID: {vehicleId}</p>;
  }
  useEffect(()=>{
     if (vehicleId) {
    dispatch(getAllRolloutsByVin(vehicleId));
  }
    
  },[dispatch])
console.log(rolloutList)
  return (
    <div>
        <div className="">

        <Breadcrumbs/>
        </div>
        <VehicleGeneralInfo/>
       <div className="pt-4">
         <RolloutTable data={rolloutList} loading={loading}/>
       </div>
      
    </div>
  );
};

export default VehicleInfo;
