import { mockStats } from '../../mockData';

export default function AdminDashboard() {
  const stats = mockStats;

  const statCards = [
    { label: 'Tổng thợ', value: stats.totalTechnicians.toLocaleString(), sub: '+12 tháng này', color: 'text-blue-600', bg: 'bg-blue-50', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg> },
    { label: 'Chờ duyệt', value: stats.pendingApprovals.toString(), sub: 'Thợ mới đăng ký', color: 'text-amber-600', bg: 'bg-amber-50', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
    { label: 'Tổng kích hoạt', value: stats.totalInstallations.toLocaleString(), sub: `+${stats.thisMonthInstallations} tháng này`, color: 'text-green-600', bg: 'bg-green-50', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
    { label: 'Đổi thưởng chờ', value: stats.pendingRewards.toString(), sub: 'Cần xử lý', color: 'text-red-500', bg: 'bg-red-50', icon: <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
  ];

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(card => (
          <div key={card.label} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${card.bg} rounded-lg flex items-center justify-center ${card.color}`}>
                {card.icon}
              </div>
            </div>
            <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-sm font-semibold text-gray-700 mt-0.5">{card.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top regions */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Khu vực bán mạnh</h3>
          <div className="space-y-3">
            {stats.topRegions.map((r, i) => {
              const max = stats.topRegions[0].count;
              const pct = Math.round((r.count / max) * 100);
              return (
                <div key={r.region} className="flex items-center gap-3">
                  <span className="w-5 text-xs font-bold text-gray-400 text-right">{i + 1}</span>
                  <span className="w-24 text-sm text-gray-700 font-medium flex-shrink-0">{r.region}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-800 w-12 text-right">{r.count.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top models */}
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Model bán chạy</h3>
          <div className="space-y-3">
            {stats.topModels.map((m, i) => {
              const max = stats.topModels[0].count;
              const pct = Math.round((m.count / max) * 100);
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-amber-500', 'bg-orange-500', 'bg-red-400'];
              return (
                <div key={m.model} className="flex items-center gap-3">
                  <span className="w-5 text-xs font-bold text-gray-400 text-right">{i + 1}</span>
                  <span className="w-24 text-sm text-gray-700 font-medium font-mono flex-shrink-0">{m.model}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div className={`${colors[i]} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }}></div>
                  </div>
                  <span className="text-sm font-bold text-gray-800 w-12 text-right">{m.count.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Monthly trend */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">Kích hoạt theo tháng (2026)</h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">YTD</span>
        </div>
        <div className="flex items-end gap-2 h-32">
          {[180, 224, 310, 412, 0, 0, 0, 0, 0, 0, 0, 0].map((v, i) => {
            const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
            const maxVal = 412;
            const h = v ? Math.max(8, Math.round((v / maxVal) * 100)) : 4;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className={`w-full rounded-t-lg transition-all ${v > 0 ? 'bg-blue-500' : 'bg-gray-200'}`}
                  style={{ height: `${h}%` }}
                ></div>
                <span className="text-[10px] text-gray-400">{months[i]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white rounded-xl p-5 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4">Hoạt động gần đây</h3>
        <div className="space-y-3">
          {[
            { text: 'Nguyễn Văn Tuấn kích hoạt máy AW10ID1234567', time: '09:30', type: 'install', status: 'Đã duyệt' },
            { text: 'Trần Minh Khoa đăng ký tài khoản mới', time: '08:45', type: 'register', status: 'Chờ duyệt' },
            { text: 'Lê Thị Hương yêu cầu đổi thưởng 200 điểm', time: '08:12', type: 'reward', status: 'Đã duyệt' },
            { text: 'Serial AW24ID9876543 bị từ chối (GPS không hợp lệ)', time: '07:50', type: 'reject', status: 'Từ chối' },
          ].map((item, i) => {
            const colors: Record<string, string> = { install: 'bg-green-100 text-green-600', register: 'bg-blue-100 text-blue-600', reward: 'bg-amber-100 text-amber-600', reject: 'bg-red-100 text-red-600' };
            const statusColors: Record<string, string> = { 'Đã duyệt': 'text-green-600', 'Chờ duyệt': 'text-amber-600', 'Từ chối': 'text-red-500' };
            return (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${colors[item.type]}`}>
                  {item.type === 'install' ? '✓' : item.type === 'register' ? '👤' : item.type === 'reward' ? '★' : '✗'}
                </div>
                <p className="flex-1 text-sm text-gray-700">{item.text}</p>
                <span className={`text-xs font-semibold ${statusColors[item.status]}`}>{item.status}</span>
                <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
