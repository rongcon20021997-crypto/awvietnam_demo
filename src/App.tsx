import { useState } from 'react';
import MobileApp from './components/mobile/MobileApp';
import AdminApp from './components/admin/AdminApp';

type Tab = 'mobile' | 'admin';

export default function App() {
  const [tab, setTab] = useState<Tab>('mobile');

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Tab switcher */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-4 flex items-center gap-1 h-12">
          <div className="flex items-center gap-2 mr-4">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17 7H7a5 5 0 000 10h10a5 5 0 000-10zM7 15a3 3 0 110-6 3 3 0 010 6z"/>
              </svg>
            </div>
            <span className="font-bold text-gray-800 text-sm hidden sm:block">Airwell App Demo</span>
          </div>

          <button
            onClick={() => setTab('mobile')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === 'mobile'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            App Thợ (Mobile)
          </button>

          <button
            onClick={() => setTab('admin')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === 'admin'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
            </svg>
            Web Quản Trị (Admin)
          </button>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden md:block">
              {tab === 'mobile'
                ? 'Demo: SĐT 0901234567 + OTP bất kỳ'
                : 'Demo: admin@airwell.vn / admin123'}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={tab === 'admin' ? '' : 'hidden'}>
        <AdminApp />
      </div>
      <div className={tab === 'mobile' ? '' : 'hidden'}>
        <MobileApp />
      </div>
    </div>
  );
}
