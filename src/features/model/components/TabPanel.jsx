import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";

const TabPanel = ({ ecuComp, variantComp,vehicleComp }) => {
  
  const [activeKey, setActiveKey] = useState(
    () => localStorage.getItem("activeTab") || "ecu"
  );

 
  const handleTabChange = (key) => {
    setActiveKey(key);
    localStorage.setItem("activeTab", key);
  };

  return (
    <Tabs activeKey={activeKey} onChange={handleTabChange}>
      <TabPane tab="ECU" key="ecu">
        {ecuComp}
      </TabPane>
      <TabPane tab="Variants" key="variants">
        {variantComp}
      </TabPane>
      <TabPane tab="Vehicles" key="vehicles">
        {vehicleComp}
      </TabPane>
    </Tabs>
  );
};

export default React.memo(TabPanel);
