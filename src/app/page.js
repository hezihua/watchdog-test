"use client";

import { useState } from "react";

export default function Home() {
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, { message, type, timestamp }]);
  };

  // 测试 JS 错误
  const triggerJsError = () => {
    addLog("触发 JS 错误...", "warning");
    setTimeout(() => {
      throw new Error("这是一个测试的 JS 错误！");
    }, 100);
  };

  // 测试 Promise 拒绝错误
  const triggerPromiseError = () => {
    addLog("触发 Promise 拒绝错误...", "warning");
    Promise.reject(new Error("这是一个测试的 Promise 拒绝错误！"));
  };

  // 测试资源加载错误
  const triggerResourceError = () => {
    addLog("触发资源加载错误...", "warning");
    const img = document.createElement("img");
    img.src = "http://not-exist-domain.com/fake-image.png";
    document.body.appendChild(img);
  };

  // 测试 Fetch 请求（成功）
  const triggerFetchSuccess = async () => {
    addLog("发起 Fetch 请求（成功）...", "info");
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      const data = await res.json();
      addLog(`Fetch 成功: ${JSON.stringify(data).slice(0, 50)}...`, "success");
    } catch (error) {
      addLog(`Fetch 失败: ${error.message}`, "error");
    }
  };

  // 测试 Fetch 请求（失败）
  const triggerFetchError = async () => {
    addLog("发起 Fetch 请求（失败）...", "warning");
    try {
      const res = await fetch("https://not-exist-api.com/api/test");
      const data = await res.json();
      addLog(`Fetch 成功: ${data}`, "success");
    } catch (error) {
      addLog(`Fetch 失败: ${error.message}`, "error");
    }
  };

  // 测试 XMLHttpRequest GET 请求
  const triggerXhrRequest = () => {
    addLog("发起 XHR GET 请求...", "info");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/posts/1");
    xhr.onload = () => {
      if (xhr.status === 200) {
        addLog(`XHR GET 成功: ${xhr.responseText.slice(0, 50)}...`, "success");
      } else {
        addLog(`XHR GET 失败: ${xhr.status}`, "error");
      }
    };
    xhr.onerror = () => {
      addLog("XHR 网络错误", "error");
    };
    xhr.send();
  };

  // 测试 XMLHttpRequest POST 请求
  const triggerXhrPostRequest = () => {
    addLog("发起 XHR POST 请求...", "info");
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 201) {
        addLog(`XHR POST 成功: ${xhr.responseText.slice(0, 50)}...`, "success");
      } else {
        addLog(`XHR POST 失败: ${xhr.status}`, "error");
      }
    };
    xhr.onerror = () => {
      addLog("XHR POST 网络错误", "error");
    };
    xhr.send(JSON.stringify({ title: "XHR测试", body: "测试内容", userId: 1 }));
  };

  // 测试 POST 请求
  const triggerPostRequest = async () => {
    addLog("发起 POST 请求...", "info");
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "测试标题",
          body: "测试内容",
          userId: 1,
        }),
      });
      const data = await res.json();
      addLog(`POST 成功: id=${data.id}`, "success");
    } catch (error) {
      addLog(`POST 失败: ${error.message}`, "error");
    }
  };

  // 清空日志
  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* 头部 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            🐕 Frontend Watch Dog SDK 测试
          </h1>
          <p className="text-gray-400">
            测试 SDK 的所有监控功能：性能、错误、请求、点击、页面状态
          </p>
        </div>

        {/* 性能监控说明 */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            📊 性能监控 (自动采集)
          </h2>
          <p className="text-gray-400 mb-4">
            以下指标在页面加载时自动采集并上报：
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "DNS", desc: "DNS 解析时间" },
              { name: "TCP", desc: "TCP 连接时间" },
              { name: "白屏", desc: "首次渲染时间" },
              { name: "FCP", desc: "首次内容绘制" },
              { name: "TTFB", desc: "首字节时间" },
              { name: "LCP", desc: "最大内容绘制" },
              { name: "FID", desc: "首次输入延迟" },
              { name: "资源", desc: "资源加载详情" },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-white/5 rounded-lg p-3 text-center"
              >
                <div className="text-lg font-semibold text-purple-400">
                  {item.name}
                </div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 错误监控测试 */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4 text-red-400">
            ❌ 错误监控测试
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={triggerJsError}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition-all"
            >
              触发 JS 错误
            </button>
            <button
              onClick={triggerPromiseError}
              className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 rounded-lg transition-all"
            >
              触发 Promise 错误
            </button>
            <button
              onClick={triggerResourceError}
              className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 rounded-lg transition-all"
            >
              触发资源加载错误
            </button>
          </div>
        </div>

        {/* 请求监控测试 */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">
            🌐 请求监控测试
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={triggerFetchSuccess}
              className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg transition-all"
            >
              Fetch 成功请求
            </button>
            <button
              onClick={triggerFetchError}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg transition-all"
            >
              Fetch 失败请求
            </button>
            <button
              onClick={triggerXhrRequest}
              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 rounded-lg transition-all"
            >
              XHR GET 请求
            </button>
            <button
              onClick={triggerXhrPostRequest}
              className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/50 rounded-lg transition-all"
            >
              XHR POST 请求
            </button>
            <button
              onClick={triggerPostRequest}
              className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg transition-all"
            >
              Fetch POST 请求
            </button>
          </div>
        </div>

        {/* 点击监控说明 */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4 text-green-400">
            👆 点击监控 (自动采集)
          </h2>
          <p className="text-gray-400 mb-4">
            所有点击事件会自动记录元素路径，例如：
            <code className="bg-white/10 px-2 py-1 rounded ml-2">
              html&gt;body&gt;div.container&gt;button#submit
            </code>
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              id="test-btn-1"
              className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 rounded-lg transition-all"
              onClick={() => addLog("点击了测试按钮 1", "info")}
            >
              测试按钮 1
            </button>
            <button
              id="test-btn-2"
              className="px-4 py-2 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/50 rounded-lg transition-all"
              onClick={() => addLog("点击了测试按钮 2", "info")}
            >
              测试按钮 2
            </button>
          </div>
        </div>

        {/* 页面状态监控 */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4 text-yellow-400">
            📄 页面状态监控
          </h2>
          <p className="text-gray-400 mb-4">
            自动记录页面进入时间、离开时间、停留时长。路由变化时会上报。
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/about"
              className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 rounded-lg transition-all"
            >
              跳转到 /about
            </a>
            <button
              onClick={() => {
                window.history.pushState({}, "", "/test-route");
                addLog("使用 pushState 跳转到 /test-route", "info");
              }}
              className="px-4 py-2 bg-lime-500/20 hover:bg-lime-500/30 border border-lime-500/50 rounded-lg transition-all"
            >
              pushState 测试
            </button>
            <button
              onClick={() => {
                window.history.replaceState({}, "", "/replaced-route");
                addLog("使用 replaceState 替换为 /replaced-route", "info");
              }}
              className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-lg transition-all"
            >
              replaceState 测试
            </button>
            <button
              onClick={() => {
                window.location.hash = `#section-${Date.now()}`;
                addLog(`触发 hashchange: ${window.location.hash}`, "info");
              }}
              className="px-4 py-2 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/50 rounded-lg transition-all"
            >
              hashchange 测试
            </button>
          </div>
        </div>

        {/* 日志输出 */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-300">📝 操作日志</h2>
            <button
              onClick={clearLogs}
              className="px-3 py-1 text-sm bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 rounded-lg transition-all"
            >
              清空日志
            </button>
          </div>
          <div className="bg-black/30 rounded-lg p-4 h-64 overflow-y-auto font-mono text-sm">
            {logs.length === 0 ? (
              <p className="text-gray-500">暂无日志，点击上方按钮进行测试...</p>
            ) : (
              logs.map((log, index) => (
                <div
                  key={index}
                  className={`mb-1 ${
                    log.type === "error"
                      ? "text-red-400"
                      : log.type === "warning"
                      ? "text-yellow-400"
                      : log.type === "success"
                      ? "text-green-400"
                      : "text-gray-300"
                  }`}
                >
                  <span className="text-gray-500">[{log.timestamp}]</span>{" "}
                  {log.message}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 提示 */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>💡 提示：打开浏览器控制台查看 SDK 日志和网络请求</p>
          <p>📡 数据会上报到配置的 API 地址（需要启动后端服务接收）</p>
        </div>
      </div>
    </div>
  );
}
