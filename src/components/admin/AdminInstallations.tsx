import { useState } from 'react';
import { mockInstallations } from '../../mockData';
import { Installation } from '../../types';

const statusConfig = {
  approved: { label: 'Đã duyệt', color: 'bg-green-100 text-green-700' },
  pending: { label: 'Chờ AI duyệt', color: 'bg-amber-100 text-amber-700' },
  rejected: { label: 'Từ chối', color: 'bg-red-100 text-red-700' },
};

export default function AdminInstallations() {
  const [installs, setInstalls] = useState(mockInstallations);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selected, setSelected] = useState<Installation | null>(null);

  const filtered = filter === 'all' ? installs : installs.filter(i => i.status === filter);

  const handleApprove = (id: string) => {
    setInstalls(prev => prev.map(i => i.id === id ? { ...i, status: 'approved' as const, points: 50 } : i));
    setSelected(null);
  };

  const handleReject = (id: string) => {
    setInstalls(prev => prev.map(i => i.id === id ? { ...i, status: 'rejected' as const, points: 0 } : i));
    setSelected(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 flex-wrap">
        {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
          >
            {f === 'all' ? 'Tất cả' : statusConfig[f].label}
            <span className="ml-1.5 text-xs opacity-70">({(f === 'all' ? installs : installs.filter(i => i.status === f)).length})</span>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Serial / Model</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Thợ</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Khách hàng</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">GPS</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">AI Score</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Ngày lắp</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Trạng thái</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(inst => {
              const cfg = statusConfig[inst.status];
              return (
                <tr key={inst.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-sm font-bold text-gray-800 font-mono">{inst.serialNumber}</p>
                    <p className="text-xs text-gray-400">{inst.model}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">{inst.technicianName}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-700">{inst.customerName}</p>
                    <p className="text-xs text-gray-400">{inst.customerPhone}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold ${inst.gpsValid ? 'text-green-600' : 'text-red-500'}`}>
                      {inst.gpsValid ? '✓ Hợp lệ' : '✗ Lỗi'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full ${inst.aiScore >= 80 ? 'bg-green-500' : inst.aiScore >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${inst.aiScore}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-700">{inst.aiScore}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{inst.installedAt}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${cfg.color}`}>{cfg.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(inst)} className="text-blue-600 text-sm font-semibold hover:text-blue-700">Xem</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
              <h3 className="font-bold text-gray-800 text-lg">Chi tiết kích hoạt</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-6 space-y-5">
              {/* AI Score summary */}
              <div className={`rounded-xl p-4 flex items-center gap-4 ${selected.aiScore >= 80 ? 'bg-green-50 border border-green-200' : selected.aiScore >= 50 ? 'bg-amber-50 border border-amber-200' : 'bg-red-50 border border-red-200'}`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${selected.aiScore >= 80 ? 'bg-green-200 text-green-700' : selected.aiScore >= 50 ? 'bg-amber-200 text-amber-700' : 'bg-red-200 text-red-700'}`}>
                  {selected.aiScore}%
                </div>
                <div>
                  <p className="font-bold text-gray-800">Điểm AI</p>
                  <p className="text-sm text-gray-600">{selected.aiScore >= 80 ? 'Ảnh rõ nét, thông tin đầy đủ' : selected.aiScore >= 50 ? 'Ảnh chưa rõ, cần xem lại' : 'Ảnh không đạt, GPS nghi ngờ'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Serial', value: selected.serialNumber, mono: true },
                  { label: 'Model', value: selected.model },
                  { label: 'Thợ lắp', value: selected.technicianName },
                  { label: 'Khu vực', value: selected.region },
                  { label: 'Khách hàng', value: selected.customerName },
                  { label: 'SĐT KH', value: selected.customerPhone },
                  { label: 'Ngày lắp', value: selected.installedAt },
                  { label: 'GPS', value: selected.gpsValid ? 'Hợp lệ' : 'Không hợp lệ' },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className={`text-sm font-semibold text-gray-800 mt-0.5 ${item.mono ? 'font-mono' : ''}`}>{item.value}</p>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">Địa chỉ lắp đặt</p>
                <p className="text-sm text-gray-800 bg-gray-50 rounded-lg p-3">{selected.address}</p>
              </div>

              {selected.rejectReason && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-xs font-bold text-red-700 mb-1">Lý do từ chối:</p>
                  <p className="text-sm text-red-600">{selected.rejectReason}</p>
                </div>
              )}

              {selected.photos.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-2">Ảnh đính kèm</p>
                  <div className="grid grid-cols-2 gap-2">
                    {selected.photos.map((photo, i) => (
                      <img key={i} src={photo} alt={`photo-${i}`} className="rounded-xl w-full h-32 object-cover" />
                    ))}
                  </div>
                </div>
              )}

              {selected.status === 'pending' && (
                <div className="flex gap-3">
                  <button onClick={() => handleApprove(selected.id)} className="flex-1 bg-green-600 text-white font-bold py-3 rounded-xl">Phê duyệt (+50đ)</button>
                  <button onClick={() => handleReject(selected.id)} className="flex-1 bg-red-500 text-white font-bold py-3 rounded-xl">Từ chối</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
