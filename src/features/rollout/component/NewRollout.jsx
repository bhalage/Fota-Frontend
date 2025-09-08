import Breadcrumbs from "@/components/BreadCrumbs";
import React from "react";


const NewRollout = () => {
  return (
    <div className="relative">
      <div className="sticky top-0 bg-white z-10 shadow mb-4">
        <Breadcrumbs />
        <div className="px-4 py-4">
          <h1 className="text-2xl font-semibold">Create New Rollout</h1>
        </div>
      </div>
      <div className="p-4">
        {/* Form or content for new rollout */}
        <p>Here goes your rollout creation form...</p>
      </div>
    </div>
  );
};

export default NewRollout;
