import { useState } from 'react';
import { mockRewardRequests } from '../../mockData';
import { RewardRequest } from '../../types';

const statusConfig = {
  pending: { label: 'Chờ duyệt', color: 'bg-amber-100 text-amber-700' },
  approved: { label: 'Đã duyệt', color: 'bg-blue-100 text-blue-700' },
  paid: { label: 'Đã thanh toán', color: 'bg-green-100 text-green-700' },
};

export default function AdminRewards() {
  const [requests, setRequests] = useState(mockRewardRequests);
  const [selected, setSelected] = useState<RewardRequest | null>(null);

  const handleApprove = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' as const } : r));
    setSelected(null);
  };

  const handlePaid = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'paid' as const } : r));
    setSelected(null);
  };

  const totalPending = requests.filter(r => r.status === 'pending').length;
  const totalAmount = requests.filter(r => r.type === 'cash' && r.status !== 'paid').reduce((s, r) => s + r.amount, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Chờ duyệt', value: totalPending.toString(), color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Tổng tiền cần trả', value: `${(totalAmount / 1000000).toFixed(1)}M đ`, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Đã xử lý (tháng)', value: '12', color: 'text-green-600', bg: 'bg-green-50' },
        ].map(card => (
          <div key={card.label} className={`${card.bg} rounded-xl p-4`}>
            <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
            <p className="text-sm text-gray-600 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Thợ</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Loại</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Điểm / Giá trị</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Chi tiết</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Ngày yêu cầu</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Trạng thái</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {requests.map(req => {
              const cfg = statusConfig[req.status];
              return (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{req.technicianName}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${req.type === 'cash' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                      {req.type === 'cash' ? 'Tiền mặt' : 'Quà tặng'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-bold text-gray-800">{req.points} điểm</p>
                    {req.type === 'cash' && <p className="text-xs text-green-600">{req.amount.toLocaleString()}đ</p>}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {req.type === 'cash' ? req.bankAccount : req.giftItem}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{req.requestedAt}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${cfg.color}`}>{cfg.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => setSelected(req)} className="text-blue-600 text-sm font-semibold hover:text-blue-700">Xem</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-800 text-lg">Yêu cầu đổi thưởng</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Thợ', value: selected.technicianName },
                  { label: 'Loại', value: selected.type === 'cash' ? 'Tiền mặt' : 'Quà tặng' },
                  { label: 'Điểm đổi', value: `${selected.points} điểm` },
                  { label: selected.type === 'cash' ? 'Số tiền' : 'Quà', value: selected.type === 'cash' ? `${selected.amount.toLocaleString()}đ` : selected.giftItem || '' },
                  { label: 'Ngày yêu cầu', value: selected.requestedAt },
                  { label: 'Trạng thái', value: statusConfig[selected.status].label },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>

              {selected.type === 'cash' && selected.bankAccount && (
                <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                  <p className="text-xs text-blue-500 font-medium">Tài khoản ngân hàng</p>
                  <p className="text-sm font-bold text-blue-800 mt-0.5">{selected.bankAccount}</p>
                </div>
              )}

              <div className="flex gap-3">
                {selected.status === 'pending' && (
                  <button onClick={() => handleApprove(selected.id)} className="flex-1 bg-blue-600 text-white font-bold py-2.5 rounded-xl text-sm">
                    Phê duyệt
                  </button>
                )}
                {selected.status === 'approved' && (
                  <button onClick={() => handlePaid(selected.id)} className="flex-1 bg-green-600 text-white font-bold py-2.5 rounded-xl text-sm">
                    Xác nhận đã thanh toán
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
