import { User } from '../../types';
import { MobileScreen } from './MobileApp';
import { mockNotifications } from '../../mockData';

interface Props {
  user: User;
  onNavigate: (screen: MobileScreen) => void;
}

export default function MobileHome({ user, onNavigate }: Props) {
  const unread = mockNotifications.filter(n => !n.read).length;

  return (
    <div className="bg-gray-50 min-h-full pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 pt-4 pb-16">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-blue-200 text-sm">Xin chào,</p>
            <h2 className="text-white font-bold text-lg leading-tight">{user.name}</h2>
          </div>
          <button
            onClick={() => onNavigate('notifications')}
            className="relative w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">{unread}</span>
            )}
          </button>
        </div>

        {/* Status badge */}
        <div className="flex items-center gap-2">
          <span className="bg-green-400 text-green-900 text-xs font-bold px-2 py-0.5 rounded-full">Đã xác minh</span>
          <span className="text-blue-200 text-xs">{user.region}</span>
        </div>
      </div>

      {/* Stats card */}
      <div className="mx-4 -mt-10 bg-white rounded-2xl shadow-lg p-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{user.points.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-0.5">Điểm tích lũy</p>
          </div>
          <div className="text-center border-x border-gray-100">
            <p className="text-2xl font-bold text-gray-800">{user.installCount}</p>
            <p className="text-xs text-gray-500 mt-0.5">Máy đã lắp</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-green-600">{(user.totalEarned / 1000000).toFixed(1)}M</p>
            <p className="text-xs text-gray-500 mt-0.5">Đã nhận (VND)</p>
          </div>
        </div>
      </div>

      {/* Main action */}
      <div className="mx-4 mb-4">
        <button
          onClick={() => onNavigate('activate')}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl py-5 flex items-center gap-4 px-5 shadow-md active:scale-95 transition-transform"
        >
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8H3m4 0H4m7-4v.01M5 3H4m1 5H4m3-2H6" />
            </svg>
          </div>
          <div className="text-left">
            <p className="font-bold text-lg">Kích Hoạt Lắp Đặt</p>
            <p className="text-blue-200 text-sm">Quét serial & xác nhận bảo hành</p>
          </div>
          <svg className="w-5 h-5 text-white/70 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>

      {/* Quick actions */}
      <div className="mx-4 grid grid-cols-3 gap-3 mb-4">
        <button
          onClick={() => onNavigate('points')}
          className="bg-white rounded-xl p-3 flex flex-col items-center gap-2 shadow-sm active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <span className="text-xs font-semibold text-gray-700">Đổi thưởng</span>
        </button>
        <button
          onClick={() => onNavigate('history')}
          className="bg-white rounded-xl p-3 flex flex-col items-center gap-2 shadow-sm active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </div>
          <span className="text-xs font-semibold text-gray-700">Lịch sử</span>
        </button>
        <button
          onClick={() => onNavigate('profile')}
          className="bg-white rounded-xl p-3 flex flex-col items-center gap-2 shadow-sm active:scale-95 transition-transform"
        >
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
          </div>
          <span className="text-xs font-semibold text-gray-700">Hồ sơ</span>
        </button>
      </div>

      {/* Promo banner */}
      <div className="mx-4 mb-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-12 h-12 bg-white/30 rounded-xl flex items-center justify-center flex-shrink-0">
          <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        <div>
          <p className="font-bold text-white text-sm">Tháng 4: x2 điểm!</p>
          <p className="text-orange-100 text-xs">Lắp AW18ID-2 trở lên nhận gấp đôi điểm</p>
        </div>
      </div>

      {/* Recent activity */}
      <div className="mx-4">
        <h3 className="font-bold text-gray-800 mb-3 text-sm">Hoạt động gần đây</h3>
        <div className="space-y-2">
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">AW10ID1234567</p>
              <p className="text-xs text-gray-500">22/04/2026 09:30</p>
            </div>
            <span className="text-green-600 font-bold text-sm">+50đ</span>
          </div>
          <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate">AW18ID7654321</p>
              <p className="text-xs text-gray-500">21/04/2026 14:15</p>
            </div>
            <span className="text-amber-600 font-bold text-sm">Chờ</span>
          </div>
        </div>
      </div>
    </div>
  );
}
