import { useState } from 'react';
import { User } from '../../types';

interface Props {
  user: User;
  onBack: () => void;
}

type Tab = 'overview' | 'redeem';

export default function MobilePoints({ user, onBack }: Props) {
  const [tab, setTab] = useState<Tab>('overview');
  const [redeemType, setRedeemType] = useState<'cash' | 'gift'>('cash');
  const [redeemPoints, setRedeemPoints] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cashValue = Math.floor(parseInt(redeemPoints || '0') * 2500);

  return (
    <div className="min-h-full bg-gray-50">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 pt-4 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-white font-bold text-lg">Điểm thưởng</h2>
        </div>

        <div className="text-center">
          <svg className="w-10 h-10 text-amber-200 mx-auto mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <p className="text-5xl font-bold text-white">{user.points.toLocaleString()}</p>
          <p className="text-amber-200 text-sm mt-1">điểm tích lũy</p>
          <p className="text-white/80 text-xs mt-0.5">≈ {(user.points * 2500).toLocaleString()}đ</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white flex border-b border-gray-200">
        <button
          onClick={() => setTab('overview')}
          className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${tab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
        >
          Tổng quan
        </button>
        <button
          onClick={() => setTab('redeem')}
          className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${tab === 'redeem' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}
        >
          Đổi thưởng
        </button>
      </div>

      {tab === 'overview' && (
        <div className="px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Tổng đã nhận</p>
              <p className="text-lg font-bold text-green-600">{(user.totalEarned / 1000000).toFixed(1)}M đ</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-xs text-gray-500 mb-1">Máy đã lắp</p>
              <p className="text-lg font-bold text-blue-600">{user.installCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 text-sm mb-3">Quy đổi điểm</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                <span className="text-sm text-gray-600">AW9ID-1 (9K BTU)</span>
                <span className="text-sm font-bold text-blue-600">+30 điểm</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                <span className="text-sm text-gray-600">AW12ID-1 (12K BTU)</span>
                <span className="text-sm font-bold text-blue-600">+50 điểm</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-gray-50">
                <span className="text-sm text-gray-600">AW18ID-2 (18K BTU)</span>
                <span className="text-sm font-bold text-blue-600">+75 điểm</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-sm text-gray-600">AW24ID-3 (24K BTU)</span>
                <span className="text-sm font-bold text-blue-600">+100 điểm</span>
              </div>
            </div>
            <div className="mt-3 bg-amber-50 rounded-lg p-2.5">
              <p className="text-xs text-amber-700 font-medium">1 điểm = 2,500đ tiền mặt</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 text-sm mb-3">Lịch sử điểm gần đây</h3>
            <div className="space-y-2.5">
              {[
                { date: '22/04', desc: 'Kích hoạt AW10ID1234567', pts: '+50' },
                { date: '15/04', desc: 'Đổi thưởng tiền mặt', pts: '-200' },
                { date: '10/04', desc: 'Kích hoạt AW18ID7654321', pts: '+75' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-800 font-medium">{item.desc}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                  <span className={`font-bold text-sm ${item.pts.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{item.pts}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'redeem' && (
        <div className="px-4 py-4 space-y-4 pb-24">
          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Yêu cầu đã gửi!</h3>
              <p className="text-sm text-gray-500 mt-1">Admin sẽ duyệt và thanh toán trong 3-5 ngày làm việc.</p>
              <button onClick={() => setSubmitted(false)} className="mt-4 text-blue-600 font-semibold text-sm">Gửi yêu cầu khác</button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setRedeemType('cash')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-colors ${redeemType === 'cash' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                >
                  <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
                  <span className="text-sm font-bold text-gray-700">Tiền mặt</span>
                </button>
                <button
                  onClick={() => setRedeemType('gift')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-colors ${redeemType === 'gift' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                >
                  <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>
                  <span className="text-sm font-bold text-gray-700">Đổi quà</span>
                </button>
              </div>

              {redeemType === 'cash' && (
                <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Số điểm muốn đổi</label>
                    <input
                      type="number"
                      value={redeemPoints}
                      onChange={e => setRedeemPoints(e.target.value)}
                      placeholder="Tối thiểu 100 điểm"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 focus:border-blue-500 focus:outline-none"
                    />
                    {cashValue > 0 && <p className="text-xs text-green-600 mt-1 font-medium">= {cashValue.toLocaleString()}đ</p>}
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Số tài khoản ngân hàng</label>
                    <input
                      type="text"
                      placeholder="VCB - 001100XXXXXXX"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {redeemType === 'gift' && (
                <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
                  {[
                    { name: 'Áo thun Airwell (S/M/L/XL)', pts: 80 },
                    { name: 'Nón kết Airwell', pts: 60 },
                    { name: 'Bộ dụng cụ cơ bản', pts: 150 },
                    { name: 'Bộ dụng cụ cao cấp', pts: 300 },
                  ].map((g, i) => (
                    <button key={i} className="w-full flex justify-between items-center p-3 border-2 border-gray-200 rounded-xl hover:border-blue-400 transition-colors">
                      <span className="text-sm font-medium text-gray-800">{g.name}</span>
                      <span className="text-sm font-bold text-blue-600">{g.pts} điểm</span>
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => setSubmitted(true)}
                className="w-full bg-amber-500 text-white font-bold py-4 rounded-xl text-base shadow-md"
              >
                Gửi yêu cầu đổi thưởng
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
