import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';

export type AdminSection = 'dashboard' | 'technicians' | 'installations' | 'rewards' | 'reports' | 'programs';

export default function AdminApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [section, setSection] = useState<AdminSection>('dashboard');

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return <AdminLayout section={section} onNavigate={setSection} onLogout={() => setIsLoggedIn(false)} />;
}
