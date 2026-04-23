import { mockInstallations } from '../../mockData';

interface Props {
  onBack: () => void;
}

const statusConfig = {
  approved: { label: 'Đã duyệt', color: 'bg-green-100 text-green-700' },
  pending: { label: 'Chờ duyệt', color: 'bg-amber-100 text-amber-700' },
  rejected: { label: 'Từ chối', color: 'bg-red-100 text-red-700' },
};

export default function MobileHistory({ onBack }: Props) {
  const installs = mockInstallations.filter(i => i.technicianId === 'u1');

  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-blue-600 px-5 pt-4 pb-5 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-white font-bold text-lg">Lịch sử lắp đặt</h2>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-xl font-bold text-blue-600">47</p>
            <p className="text-xs text-gray-500 mt-0.5">Tổng cộng</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-xl font-bold text-green-600">12</p>
            <p className="text-xs text-gray-500 mt-0.5">Tháng này</p>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm">
            <p className="text-xl font-bold text-amber-600">2</p>
            <p className="text-xs text-gray-500 mt-0.5">Chờ duyệt</p>
          </div>
        </div>

        <div className="space-y-3">
          {installs.map(install => {
            const cfg = statusConfig[install.status];
            return (
              <div key={install.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-bold text-gray-800 font-mono text-sm">{install.serialNumber}</p>
                      <p className="text-xs text-gray-500">{install.model}</p>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${cfg.color}`}>{cfg.label}</span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                      <span className="text-xs text-gray-600">{install.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
                      <span className="text-xs text-gray-600 truncate">{install.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      <span className="text-xs text-gray-600">{install.installedAt}</span>
                    </div>
                  </div>

                  {install.status === 'rejected' && install.rejectReason && (
                    <div className="mt-2 bg-red-50 rounded-lg p-2">
                      <p className="text-xs text-red-600">{install.rejectReason}</p>
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex gap-3 text-xs text-gray-500">
                      <span>AI: {install.aiScore}%</span>
                      <span className={install.gpsValid ? 'text-green-600' : 'text-red-500'}>
                        GPS: {install.gpsValid ? 'Hợp lệ' : 'Không hợp lệ'}
                      </span>
                    </div>
                    {install.status === 'approved' && (
                      <span className="text-green-600 font-bold text-sm">+{install.points} điểm</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
