import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { notification } from "antd";
import { decodeToken } from "react-jwt";
import { useDispatch, useSelector } from "react-redux";
import { getAllRolloutByUserId } from "../features/admin/services/adminService";

const ApproveNotification = () => {
  const [api, contextHolder] = notification.useNotification();
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const { rollouts = [] } = useSelector((state) => state.admin || {});
  const rowRefs = useRef({});

  useEffect(() => {
    const token = localStorage.getItem("idToken");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded?.["cognito:username"]) {
        setUserId(decoded["cognito:username"]);
      }
    }
  }, []);

  
  useEffect(() => {
    if (userId) {
      dispatch(getAllRolloutByUserId(userId));
    }
  }, [userId, dispatch]);

  
  const notifyPendingRollouts = useCallback(() => {
    if (!Array.isArray(rollouts)) return;

    rollouts.forEach((rollout) => {
      if (rollout.approveStatus === "NOT_APPROVED") {
        api.open({
          key: rollout.id,
          message: (
            <span style={{ color: "white", fontWeight: "bold" }}>
              Action Required
            </span>
          ),
          description: (
            <span style={{ color: "white", fontWeight: "bold" }}>
              Take action on rollout with ID {rollout.id}
            </span>
          ),
          placement: "topRight",
          duration: 0,
          className: "custom-notification",
          style: {
            backgroundColor: "#228b22",
            borderLeft: "5px solid #faad14",
          },
          onClick: () => {
            const element = rowRefs.current[rollout.id];
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
              element.style.backgroundColor = "white";
              setTimeout(() => (element.style.backgroundColor = ""), 1500);
            }
          },
        });
      }
    });
  }, [rollouts, api]);

  useEffect(() => {
    notifyPendingRollouts();
  }, [notifyPendingRollouts]);

  return <>{contextHolder}</>;
};

export default React.memo(ApproveNotification);
