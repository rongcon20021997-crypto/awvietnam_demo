import { User } from '../../types';

interface Props {
  user: User;
  onBack: () => void;
  onLogout: () => void;
}

export default function MobileProfile({ user, onBack, onLogout }: Props) {
  return (
    <div className="min-h-full bg-gray-50 pb-24">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 pt-4 pb-16">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-white font-bold text-lg">Hồ sơ cá nhân</h2>
        </div>
      </div>

      {/* Avatar card */}
      <div className="mx-4 -mt-10 bg-white rounded-2xl shadow-lg p-5 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0">
            <span className="text-white text-2xl font-bold">{user.name[0]}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-base">{user.name}</h3>
            <p className="text-gray-500 text-sm">{user.phone}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Đã xác minh</span>
              <span className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full capitalize">{user.role === 'technician' ? 'Thợ lắp đặt' : 'Đại lý'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-4 grid grid-cols-3 gap-2 mb-4">
        <div className="bg-white rounded-xl p-3 text-center shadow-sm">
          <p className="text-lg font-bold text-blue-600">{user.points.toLocaleString()}</p>
          <p className="text-xs text-gray-500">Điểm</p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center shadow-sm">
          <p className="text-lg font-bold text-gray-800">{user.installCount}</p>
          <p className="text-xs text-gray-500">Lắp đặt</p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center shadow-sm">
          <p className="text-lg font-bold text-green-600">{(user.totalEarned / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-gray-500">Đã nhận</p>
        </div>
      </div>

      {/* Info */}
      <div className="mx-4 bg-white rounded-2xl shadow-sm p-4 mb-4">
        <h3 className="font-bold text-gray-800 text-sm mb-3">Thông tin tài khoản</h3>
        <div className="space-y-3">
          {[
            { label: 'Số điện thoại', value: user.phone },
            { label: 'Khu vực', value: user.region },
            { label: 'Ngày tham gia', value: user.joinedAt },
            { label: 'CCCD', value: user.cccdUploaded ? 'Đã xác minh' : 'Chưa upload' },
          ].map(item => (
            <div key={item.label} className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
              <span className="text-sm text-gray-500">{item.label}</span>
              <span className="text-sm font-semibold text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu items */}
      <div className="mx-4 bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
        {[
          { icon: '🔔', label: 'Cài đặt thông báo' },
          { icon: '🏦', label: 'Tài khoản ngân hàng' },
          { icon: '🔒', label: 'Đổi mật khẩu' },
          { icon: '❓', label: 'Trợ giúp & hỗ trợ' },
        ].map((item, i) => (
          <button key={i} className="w-full flex items-center justify-between px-4 py-3.5 border-b border-gray-50 last:border-0 active:bg-gray-50">
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </div>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
        ))}
      </div>

      <div className="mx-4">
        <button
          onClick={onLogout}
          className="w-full border-2 border-red-400 text-red-500 font-bold py-3.5 rounded-xl text-sm"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}
