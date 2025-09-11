import Breadcrumbs from '@/components/Breadcrumbs';  // ✅ Ensure correct filename
import { addNewEcu, attachEcuToModel, getEcusByModelId } from '@/features/ecu/services/ecuService';
import { Button, Col, Collapse, Row, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import NewEcuDrawer from '@/features/ecu/components/NewEcuDrawer'; // ✅ import drawer
import SelectEcuDrawer from './SelectEcuDrawer';

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
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // ✅ Fetch ECUs for this model
  useEffect(() => {
    if (model?.modelId) {
      dispatch(getEcusByModelId(model.modelId));
    }
  }, [dispatch, model?.modelId]);

  useEffect(() => {
    console.log("ECUs for model:", ecus);
  }, [ecus]);

  const handleSubmit = (values) => {
    console.log("Submitting new ECU:", values);
    const ecuIds = values.map(ecu => ecu.ecuId);
    dispatch(attachEcuToModel({modelId,ecuIds})).then(() => {
      dispatch(getEcusByModelId(model.modelId)); 
    }
  );
  };

  const columns = [
    { title: 'ECU Name', dataIndex: 'ecuName', key: 'ecuName' },
    { title: 'Component ID', dataIndex: 'componentId', key: 'componentId' },
    { title: 'Abbreviation', dataIndex: 'abbreviation', key: 'abbreviation' },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <div className="border-b pb-2">
        <Breadcrumbs />
      </div>

      <div style={{ paddingTop: "20px" }}>
        <Collapse
          defaultActiveKey={["1","2"]}
          expandIconPosition="end"
          bordered
          style={{ background: "#fafafa", borderRadius: "8px" }}
        >
          {/* ✅ Panel 1 */}
          <Panel header="Model Information" showArrow={false} key="1">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text strong>Model Id:</Text> {model?.modelId || "N/A"}
              </Col>
              <Col span={12}>
                <Text strong>Model Name:</Text> {model?.modelName || modelName || "N/A"}
              </Col>
            </Row>
          </Panel>

          {/* ✅ Panel 2 with Drawer */}
          <Panel
            key="2"
            showArrow={false}
            header={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <h3 style={{ margin: 0 }}>ECUs Available</h3>
                <Button type="primary" onClick={() => setDrawerOpen(true)}>
                  + New ECU
                </Button>
              </div>
            }
          >
            <Table
              columns={columns}
              dataSource={ecus}
              pagination={false}
              loading={loading}
              bordered
              rowKey="ecuId"
            />
          </Panel>
        </Collapse>
      </div>

      {/* ✅ Drawer Component */}
      <SelectEcuDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ModelInfo;
