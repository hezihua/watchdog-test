"use client";

import { useEffect } from "react";
import { Monitor } from "frontend-watch-web-sdk";

export default function MonitorProvider({ children }) {
  useEffect(() => {
    // 初始化 Monitor SDK
    const monitor = new Monitor({
      appId: "kvq0fslb1768400649714",
      cacheMax: 1, // 每条数据立即上报（测试用）
      webVitalsTimeouts: 10000, // Web Vitals 超时时间 10 秒
      api: "http://localhost:3001/api/report", // 上报 API 地址
    });

    console.log("🐕 Frontend Watch Dog SDK 已初始化", monitor);

    // 设置用户 ID（可选）
    Monitor.setUserId("test-user-001");
  }, []);

  return children;
}
