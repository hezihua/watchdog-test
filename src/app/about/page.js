"use client";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            📄 About 页面
          </h1>
          <p className="text-gray-400">
            这是用于测试页面跳转和页面状态监控的页面
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-4 text-indigo-400">
            🔄 路由跳转测试
          </h2>
          <p className="text-gray-400 mb-4">
            当你从首页跳转到这个页面时，SDK 会自动记录：
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-2 mb-6">
            <li>上一个页面的停留时间</li>
            <li>当前页面的进入时间</li>
            <li>页面 URL 和查询参数</li>
          </ul>

          <div className="flex flex-wrap gap-3">
            <a
              href="/"
              className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/50 rounded-lg transition-all"
            >
              返回首页
            </a>
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/50 rounded-lg transition-all"
            >
              history.back()
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>💡 查看浏览器控制台和网络请求，观察 SDK 上报的数据</p>
        </div>
      </div>
    </div>
  );
}
