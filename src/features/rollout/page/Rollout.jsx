import { Button } from "antd";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRollouts } from "../services/rollOutService";
import RolloutTable from "../component/RolloutTable";

const Rollout = () => {
 
  const dispatch = useDispatch();
  const { rollouts: data, loading, error } = useSelector((state) => state.rollout);

  useEffect(() => {
    dispatch(getRollouts());
  }, [dispatch]);

  if(error){
    throw new Error(error)
  }
  const sortedData = useMemo(() => {
    if (!data) return [];
    return [...data].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt) || b.id - a.id
    );
  }, [data]);

  useEffect(() => {
    console.log("Rollout Data (Sorted):", sortedData);
  }, [sortedData]);

  return (
    <div className="relative">
     <div className="sticky top-0 bg-white z-10 shadow mb-4">
       <RolloutHeader/>
        <RolloutTable loading={loading} data={sortedData} />
      </div>
    </div>
  );
};

export default Rollout;

export const RolloutHeader=()=>{
   const navigate = useNavigate();
  return  <>
        <div className="flex justify-between items-center px-4 py-4">
          <h1 className="text-2xl font-semibold">Rollouts</h1>
          <Button type="primary" onClick={() => navigate("/rollout/new")}>
            Create New Rollout
          </Button>
        </div>
        </>
}