import Breadcrumbs from '@/components/Breadcrumbs';
import { attachEcuToModel, getEcusByModelId } from '@/features/ecu/services/ecuService';
import { Button, Col, Collapse, Row, Table, Typography } from 'antd';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import SelectEcuDrawer from './SelectEcuDrawer';
import TabPanel from './TabPanel';
import { getAllVariantsByModelId } from '@/features/variants/services/variantService';
import { selectVariantsByModelId } from '@/features/variants';
import VariantTable from '@/features/variants/components/VariantTable';
import { columns } from './ModelEcuCol';
import { selectVehiclesByModelId } from '../redux/modelSelector';
import { getAllVehicleByModelId } from '../services/modelService';
import VehicleTable from '@/features/vehicle/components/VehicleTable';

const { Panel } = Collapse;
const { Text } = Typography;

const ModelInfo = () => {
  const { modelName } = useParams();
  const location = useLocation();
  const model = location.state?.model;
  const modelId = model?.modelId;
  const dispatch = useDispatch();
  const ecus = useSelector((state) => state.ecu.ecusByModelId);
  const loading = useSelector((state) => state.ecu.loading);
  const variantsBymodelId= useSelector(selectVariantsByModelId);
  const vehiclesByModelId=useSelector(selectVehiclesByModelId);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    console.log(model)
    if (model?.modelId) {
      dispatch(getEcusByModelId(model.modelId));
      dispatch(getAllVariantsByModelId(model.modelId));
      dispatch(getAllVehicleByModelId(model.modelId));
      
    }
  }, [dispatch, model?.modelId]);

  const handleSubmit = (values) => {
    console.log("Submitting new ECU:", values);
    const ecuIds = values.map(ecu => ecu.ecuId);
    dispatch(attachEcuToModel({ modelId, ecuIds })).then(() => {
      dispatch(getEcusByModelId(model.modelId));
    }
    );
  };

 
  return (
    <div >
      <div >
        <Breadcrumbs />
      </div>

      <div style={{ paddingTop: "10px" }}>
        <Collapse
          activeKey={["1", "2"]}
          bordered
          style={{ background: "#fafafa", borderRadius: "8px", boxShadow: "0 2px 8px #f0f1f2", cursor: "auto" }}
          collapsible="disabled"


        >
          <Panel header={<h3 style={{ margin: 0, fontWeight: 600, fontSize: "16px", color: "black", cursor: "auto" }}>Model Information</h3>} showArrow={false} key="1">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Model Id:</Text> {model?.modelId || "N/A"}
              </Col>
              <Col span={12}>
                <Text strong>Model Name:</Text> {model?.modelName || modelName || "N/A"}
              </Col>
            </Row>
          </Panel>


          <Panel
            key="2"
            showArrow={false}
          >
            <TabPanel

              ecuComp={<Table
                title={() => (<div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    cursor: "auto"
                  }}
                >
                  <h3 style={{ margin: 0, fontWeight: 600, fontSize: "16px", color: "black", cursor: "auto" }}>ECUs Available</h3>
                  <Button type="primary" onClick={() => setDrawerOpen(true)}>
                    Attach ECU
                  </Button>
                </div>)}
                columns={columns}
                dataSource={ecus}
                pagination={false}
                loading={loading}
                bordered
                rowKey="ecuId"
              />} 
              variantComp={
                <VariantTable data={variantsBymodelId} loading={false}/>
              }
              vehicleComp={<VehicleTable data={vehiclesByModelId}/>}
              />
          </Panel>
        </Collapse>
      </div>


      <SelectEcuDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default memo(ModelInfo);
