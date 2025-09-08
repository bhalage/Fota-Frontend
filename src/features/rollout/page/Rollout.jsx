// import Breadcrumbs from '@/components/BreadCrumbs';
import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Rollout = () => {
     const navigate = useNavigate();
  return (
   <div className="relative">
      <div className="sticky top-0 bg-white z-10 shadow mb-4">
        {/* <Breadcrumbs /> */}
        <div className="flex justify-between items-center px-4 py-4">
          <h1 className="text-2xl font-semibold">Rollouts</h1>
          <Button type="primary" onClick={() => navigate("/rollout/new")}>
            Create New Rollout
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Rollout