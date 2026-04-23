import { useState, useEffect } from 'react';
import { mockUsers } from '../../mockData';
import { User } from '../../types';
import { supabase } from '../../lib/supabase';

const statusConfig = {
  approved: { label: 'Đã duyệt', color: 'bg-green-100 text-green-700' },
  pending: { label: 'Chờ duyệt', color: 'bg-amber-100 text-amber-700' },
  rejected: { label: 'Từ chối', color: 'bg-red-100 text-red-700' },
  flagged: { label: 'Nghi ngờ', color: 'bg-orange-100 text-orange-700' },
};

export default function AdminTechnicians() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'flagged'>('all');
  const [selected, setSelected] = useState<User | null>(null);

  const filtered = filter === 'all' ? users : users.filter(u => u.status === filter);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('technicians')
      .select('*')
      .order('joined_at', { ascending: false });
    
    if (data) {
      // Map Supabase snake_case to CamelCase if necessary, but here we assume match for demo
      setUsers(data as any);
    } else if (error) {
      console.error('Fetch users error:', error);
      setUsers([]);
    }
  };

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from('technicians')
      .update({ status: 'approved' })
      .eq('id', id);

    if (!error) {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'approved' as const } : u));
      setSelected(null);
    }
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase
      .from('technicians')
      .update({ status: 'rejected' })
      .eq('id', id);

    if (!error) {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'rejected' as const } : u));
      setSelected(null);
    }
  };

  const handleFlag = async (id: string) => {
    const { error } = await supabase
      .from('technicians')
      .update({ status: 'flagged' })
      .eq('id', id);

    if (!error) {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status: 'flagged' as const } : u));
      setSelected(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2">
          {(['all', 'pending', 'flagged'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${filter === f ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              {f === 'all' ? 'Tất cả' : f === 'pending' ? 'Chờ duyệt' : 'Nghi ngờ'}
              {f === 'pending' && <span className="ml-1.5 bg-amber-200 text-amber-800 text-xs px-1.5 py-0.5 rounded-full">{users.filter(u => u.status === 'pending').length}</span>}
              {f === 'flagged' && <span className="ml-1.5 bg-orange-200 text-orange-800 text-xs px-1.5 py-0.5 rounded-full">{users.filter(u => u.status === 'flagged').length}</span>}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input placeholder="Tìm kiếm..." className="outline-none text-sm w-40" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Thợ</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Vai trò</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Khu vực</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Lắp đặt</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Điểm</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Trạng thái</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(user => {
              const cfg = statusConfig[user.status];
              return (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-700 text-sm font-bold">{user.name[0]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{user.role === 'technician' ? 'Thợ' : 'Đại lý'}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{user.region}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-800">{user.installCount}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-blue-600">{user.points.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${cfg.color}`}>{cfg.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(user)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
                    >
                      Xem
                    </button>
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
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-800 text-lg">Chi tiết thợ</h3>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <span className="text-blue-700 text-2xl font-bold">{selected.name[0]}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">{selected.name}</h4>
                  <p className="text-gray-500">{selected.phone}</p>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${statusConfig[selected.status].color}`}>
                    {statusConfig[selected.status].label}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Vai trò', value: selected.role === 'technician' ? 'Thợ lắp đặt' : 'Đại lý' },
                  { label: 'Khu vực', value: selected.region },
                  { label: 'Lắp đặt', value: `${selected.installCount} máy` },
                  { label: 'Điểm hiện tại', value: `${selected.points.toLocaleString()} điểm` },
                  { label: 'Tổng thu nhập', value: `${(selected.totalEarned / 1000000).toFixed(1)}M đ` },
                  { label: 'CCCD', value: selected.cccdUploaded ? 'Đã xác minh' : 'Chưa upload' },
                  { label: 'Ngày tham gia', value: selected.joinedAt },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>

              {(selected.status === 'pending' || selected.status === 'flagged') && (
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleApprove(selected.id)}
                    className="flex-1 bg-green-600 text-white font-bold py-2.5 rounded-xl text-sm"
                  >
                    Phê duyệt
                  </button>
                  <button
                    onClick={() => handleReject(selected.id)}
                    className="flex-1 bg-red-500 text-white font-bold py-2.5 rounded-xl text-sm"
                  >
                    Từ chối
                  </button>
                </div>
              )}
              {selected.status === 'approved' && (
                <button
                  onClick={() => handleFlag(selected.id)}
                  className="w-full border-2 border-orange-400 text-orange-600 font-bold py-2.5 rounded-xl text-sm"
                >
                  Đánh dấu nghi ngờ
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
