import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Typography, Col, Collapse, Row, Table, Button, Tag, notification } from "antd";
import { decodeToken } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import {
  approveRollout,
  disapproveRollout,
  getAllRolloutByUserId,
} from "../services/adminService";

const Admin = () => {
  const [api, contextHolder] = notification.useNotification();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const { Text } = Typography;
  const dispatch = useDispatch();
  const { rollouts = [], loading, error } = useSelector((state) => state.admin || {});

  
  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUserName(decoded.name || "N/A");
        setEmail(decoded.email || "N/A");
        setUserId(decoded["cognito:username"] || "");
      }
    }
  }, []);

  
  useEffect(() => {
    if (userId) {
      dispatch(getAllRolloutByUserId(userId));
    }
  }, [userId, dispatch]);


  const handleApprove = useCallback(
    (id) => {
      dispatch(approveRollout({ userId, rolloutId: id }))
        .unwrap()
        .then(() => dispatch(getAllRolloutByUserId(userId)));
    },
    [dispatch, userId]
  );

  const handleDisapprove = useCallback(
    (id) => {
      dispatch(disapproveRollout({ userId, rolloutId: id }))
        .unwrap()
        .then(() => dispatch(getAllRolloutByUserId(userId)));
    },
    [dispatch, userId]
  );

  
  const columns = useMemo(
    () => [
      { title: "Rollout Name", dataIndex: "rolloutName", key: "rolloutName" },
      { title: "Created By", dataIndex: "rolloutOwner", key: "rolloutOwner" },
      { title: "VIN", dataIndex: "vin", key: "vin" },
      {
        title: "Status",
        dataIndex: "approveStatus",
        key: "status",
        render: (status) => {
          let color = "default";
          if (status === "APPROVED") color = "green";
          else if (status === "NOT_APPROVED") color = "red";
          else if (status === "REJECTED") color = "orange";
          return (
            <Tag color={color} aria-label={`Status: ${status}`}>
              {status}
            </Tag>
          );
        },
      },
      {
        title: "Actions",
        key: "actions",
        render: (_, record) => {
          const status = (record.approveStatus || record.status || "").toUpperCase();
          const isApproved = status === "APPROVED";
          const isPending = status === "REJECTED";

          return (
            <div role="group" aria-label="Action Buttons">
              <Button
                type="primary"
                style={{ marginRight: 8 }}
                disabled={isApproved || isPending}
                onClick={() => handleApprove(record.id)}
              >
                Approve
              </Button>

              <Button
                danger
                disabled={isApproved || isPending}
                onClick={() => handleDisapprove(record.id)}
              >
                Reject
              </Button>
            </div>
          );
        },
      },
    ],
    [handleApprove, handleDisapprove]
  );

  const sortedRollouts = useMemo(() => {
  if (!Array.isArray(rollouts)) return [];
  return [...rollouts].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}, [rollouts]);


  return (
    <main>
      {contextHolder}

      <header className="flex justify-between items-center sticky top-0 bg-white z-10 px-4 py-4 shadow mb-4">
        <h1 className="text-2xl font-semibold" aria-label="User Information">
          User Information
        </h1>
      </header>

      <section style={{ paddingTop: "10px" }}>
        <Collapse
  activeKey={["1", "2"]}
  bordered
  items={[
    {
      key: "1",
      label: "User Details",
      children: (
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text strong>Name:</Text> {userName}
          </Col>
          <Col span={12}>
            <Text strong>Email:</Text> {email}
          </Col>
          <Col span={12}>
            <Text strong>User ID:</Text> {userId || "N/A"}
          </Col>
        </Row>
      ),
    },
    {
      key: "2",
      label: "Rollout Table",
      children: (
        <>
          <Table
            loading={loading}
            dataSource={sortedRollouts}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            aria-label="Rollout Table"
          />
          {error && (
            <div style={{ color: "red", marginTop: 10 }} role="alert">
              Error: {error}
            </div>
          )}
        </>
      ),
    },
  ]}
/>

      </section>
    </main>
  );
};

export default React.memo(Admin);
