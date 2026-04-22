import { mockNotifications } from '../../mockData';

interface Props {
  onBack: () => void;
}

const typeConfig = {
  reward: { color: 'bg-green-100', icon: '🏆' },
  promo: { color: 'bg-amber-100', icon: '🎉' },
  reminder: { color: 'bg-blue-100', icon: '⏰' },
  system: { color: 'bg-gray-100', icon: '⚙️' },
};

export default function MobileNotifications({ onBack }: Props) {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-blue-600 px-5 pt-4 pb-5 flex items-center gap-3">
        <button onClick={onBack} className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-white font-bold text-lg">Thông báo</h2>
      </div>

      <div className="px-4 py-4 space-y-3">
        {mockNotifications.map(notif => {
          const cfg = typeConfig[notif.type];
          return (
            <div key={notif.id} className={`bg-white rounded-2xl shadow-sm p-4 border-l-4 ${notif.read ? 'border-gray-200' : 'border-blue-500'}`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 ${cfg.color} rounded-xl flex items-center justify-center flex-shrink-0 text-lg`}>
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-bold ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>{notif.title}</p>
                    {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>}
                  </div>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{notif.message}</p>
                  <p className="text-xs text-gray-400 mt-1.5">{notif.createdAt}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
