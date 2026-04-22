import { useState } from 'react';
import { AdminSection } from './AdminApp';
import AdminDashboard from './AdminDashboard';
import AdminTechnicians from './AdminTechnicians';
import AdminInstallations from './AdminInstallations';
import AdminRewards from './AdminRewards';

interface Props {
  section: AdminSection;
  onNavigate: (s: AdminSection) => void;
  onLogout: () => void;
}

const navItems: { id: AdminSection; label: string; icon: React.ReactNode }[] = [
  {
    id: 'dashboard',
    label: 'Tổng quan',
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>,
  },
  {
    id: 'technicians',
    label: 'Thợ lắp đặt',
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
  },
  {
    id: 'installations',
    label: 'Kích hoạt',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>,
  },
  {
    id: 'rewards',
    label: 'Đổi thưởng',
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  },
  {
    id: 'reports',
    label: 'Báo cáo',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>,
  },
  {
    id: 'programs',
    label: 'Chương trình',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>,
  },
];

export default function AdminLayout({ section, onNavigate, onLogout }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (section) {
      case 'dashboard': return <AdminDashboard />;
      case 'technicians': return <AdminTechnicians />;
      case 'installations': return <AdminInstallations />;
      case 'rewards': return <AdminRewards />;
      case 'reports': return <AdminReportsPlaceholder />;
      case 'programs': return <AdminProgramsPlaceholder />;
      default: return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} bg-slate-900 flex-shrink-0 flex flex-col transition-all duration-200`}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-4 border-b border-slate-700">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17 7H7a5 5 0 000 10h10a5 5 0 000-10zM7 15a3 3 0 110-6 3 3 0 010 6z"/></svg>
          </div>
          {sidebarOpen && <span className="text-white font-bold text-sm tracking-wide">AIRWELL ADMIN</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                section === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-slate-700">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors text-sm font-medium"
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            {sidebarOpen && <span>Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center gap-4 px-6 flex-shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <div className="flex-1">
            <h2 className="font-bold text-gray-800 text-base">
              {navItems.find(n => n.id === section)?.label || 'Tổng quan'}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Hệ thống hoạt động</span>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function AdminReportsPlaceholder() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Báo cáo & Thống kê</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Xuất Excel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Lắp đặt theo tháng', 'Phân bổ khu vực', 'Top Model bán chạy'].map(title => (
          <div key={title} className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-semibold text-gray-700 mb-4 text-sm">{title}</h4>
            <div className="space-y-2">
              {[85, 62, 45, 38, 28].map((w, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${w}%` }}></div>
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">{w}%</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminProgramsPlaceholder() {
  const programs = [
    { name: 'Tháng 4: x2 điểm', status: 'active', from: '01/04/2026', to: '30/04/2026', desc: 'AW18ID-2 trở lên nhận gấp đôi điểm' },
    { name: 'Thưởng đại lý Q2', status: 'upcoming', from: '01/05/2026', to: '30/06/2026', desc: 'Đại lý lắp 50+ máy nhận thưởng thêm 500K' },
    { name: 'Khai trương miền Bắc', status: 'ended', from: '01/01/2026', to: '31/03/2026', desc: 'Thưởng đặc biệt cho thợ khu vực Hà Nội' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Chương trình khuyến mãi</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">+ Tạo chương trình</button>
      </div>
      <div className="space-y-4">
        {programs.map((p, i) => (
          <div key={i} className="bg-white rounded-xl p-5 shadow-sm flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${p.status === 'active' ? 'bg-green-500' : p.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h4 className="font-bold text-gray-800">{p.name}</h4>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.status === 'active' ? 'bg-green-100 text-green-700' : p.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                  {p.status === 'active' ? 'Đang chạy' : p.status === 'upcoming' ? 'Sắp tới' : 'Đã kết thúc'}
                </span>
              </div>
              <p className="text-sm text-gray-600">{p.desc}</p>
              <p className="text-xs text-gray-400 mt-1">{p.from} — {p.to}</p>
            </div>
            <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">Chỉnh sửa</button>
          </div>
        ))}
      </div>
    </div>
  );
}
