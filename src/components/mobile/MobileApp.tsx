import { useState } from 'react';
import MobileLogin from './MobileLogin';
import MobileHome from './MobileHome';
import MobileActivate from './MobileActivate';
import MobilePoints from './MobilePoints';
import MobileHistory from './MobileHistory';
import MobileProfile from './MobileProfile';
import MobileNotifications from './MobileNotifications';
import { currentTechnician } from '../../mockData';

export type MobileScreen =
  | 'login'
  | 'register'
  | 'home'
  | 'activate'
  | 'points'
  | 'history'
  | 'profile'
  | 'notifications';

export default function MobileApp() {
  const [screen, setScreen] = useState<MobileScreen>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setScreen('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setScreen('login');
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <MobileLogin onLogin={handleLogin} />;
    }
    switch (screen) {
      case 'home':
        return <MobileHome user={currentTechnician} onNavigate={setScreen} />;
      case 'activate':
        return <MobileActivate onBack={() => setScreen('home')} />;
      case 'points':
        return <MobilePoints user={currentTechnician} onBack={() => setScreen('home')} />;
      case 'history':
        return <MobileHistory onBack={() => setScreen('home')} />;
      case 'profile':
        return <MobileProfile user={currentTechnician} onBack={() => setScreen('home')} onLogout={handleLogout} />;
      case 'notifications':
        return <MobileNotifications onBack={() => setScreen('home')} />;
      default:
        return <MobileHome user={currentTechnician} onNavigate={setScreen} />;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 py-8">
      <div className="relative">
        {/* Phone frame */}
        <div className="w-[375px] h-[780px] bg-white rounded-[48px] shadow-2xl overflow-hidden border-4 border-slate-700 relative">
          {/* Status bar */}
          <div className="bg-slate-900 h-10 flex items-center justify-between px-6 text-white text-xs font-semibold">
            <span>9:41</span>
            <div className="flex gap-1 items-center">
              <div className="flex gap-0.5">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1.5 bg-white rounded-full"></div>
                <div className="w-1 h-2 bg-white rounded-full"></div>
                <div className="w-1 h-2.5 bg-white rounded-full"></div>
              </div>
              <span className="ml-1">WiFi</span>
              <span className="ml-1">100%</span>
            </div>
          </div>

          {/* Screen content */}
          <div className="h-[calc(100%-40px)] overflow-y-auto overflow-x-hidden">
            {renderScreen()}
          </div>
        </div>

        {/* Bottom nav bar overlay for logged-in state */}
        {isLoggedIn && (
          <div className="absolute bottom-[2px] left-0 right-0 mx-[4px] bg-white border-t border-gray-200 rounded-b-[44px] flex justify-around items-center py-2 px-2 z-10">
            <button
              onClick={() => setScreen('home')}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${screen === 'home' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
              <span className="text-[10px] font-medium">Trang chủ</span>
            </button>
            <button
              onClick={() => setScreen('activate')}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${screen === 'activate' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-[10px] font-medium">Kích hoạt</span>
            </button>
            <button
              onClick={() => setScreen('points')}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${screen === 'points' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              <span className="text-[10px] font-medium">Điểm thưởng</span>
            </button>
            <button
              onClick={() => setScreen('profile')}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${screen === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
              <span className="text-[10px] font-medium">Cá nhân</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
