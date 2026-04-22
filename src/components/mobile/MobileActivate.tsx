import { useState } from 'react';

interface Props {
  onBack: () => void;
}

type ActivateStep = 'scan' | 'form' | 'photos' | 'review' | 'result';

export default function MobileActivate({ onBack }: Props) {
  const [step, setStep] = useState<ActivateStep>('scan');
  const [serial, setSerial] = useState('');
  const [model, setModel] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [address, setAddress] = useState('');
  const [photoSerial, setPhotoSerial] = useState(false);
  const [photoInstall, setPhotoInstall] = useState(false);
  const [aiResult, setAiResult] = useState<'loading' | 'success' | 'fail' | null>(null);
  const [failReason, setFailReason] = useState('');

  const handleScanSubmit = () => {
    if (serial.length >= 5) setStep('form');
  };

  const handleFormSubmit = () => {
    if (customerName && customerPhone && address) setStep('photos');
  };

  const handlePhotosSubmit = () => {
    if (photoSerial && photoInstall) setStep('review');
  };

  const handleSubmit = () => {
    setStep('result');
    setAiResult('loading');
    setTimeout(() => {
      if (serial === 'FAIL') {
        setAiResult('fail');
        setFailReason('Ảnh số serial không rõ nét. Vui lòng chụp lại ảnh dàn nóng/lạnh có đầy đủ thông tin serial.');
      } else {
        setAiResult('success');
      }
    }, 2500);
  };

  const StepIndicator = () => (
    <div className="flex items-center gap-1 px-5 py-3 bg-white border-b border-gray-100">
      {(['scan', 'form', 'photos', 'review'] as ActivateStep[]).map((s, i) => (
        <div key={s} className="flex items-center gap-1">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
            step === s ? 'bg-blue-600 text-white' :
            ['scan', 'form', 'photos', 'review', 'result'].indexOf(step) > i ? 'bg-green-500 text-white' :
            'bg-gray-200 text-gray-400'
          }`}>
            {['scan', 'form', 'photos', 'review', 'result'].indexOf(step) > i ? '✓' : i + 1}
          </div>
          {i < 3 && <div className={`w-6 h-0.5 ${['scan', 'form', 'photos', 'review', 'result'].indexOf(step) > i ? 'bg-green-500' : 'bg-gray-200'}`}></div>}
        </div>
      ))}
      <span className="ml-1 text-xs text-gray-500 font-medium">
        {step === 'scan' ? 'Scan' : step === 'form' ? 'Thông tin' : step === 'photos' ? 'Ảnh' : 'Xác nhận'}
      </span>
    </div>
  );

  if (step === 'scan') {
    return (
      <div className="min-h-full bg-gray-50">
        <div className="bg-blue-600 px-5 pt-4 pb-5 flex items-center gap-3">
          <button onClick={onBack} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-white font-bold text-lg">Kích Hoạt Lắp Đặt</h2>
        </div>
        <StepIndicator />

        <div className="px-5 py-6">
          {/* Scanner area */}
          <div className="bg-gray-900 rounded-2xl overflow-hidden mb-5 relative" style={{ height: '200px' }}>
            <div className="absolute inset-4 border-2 border-white/30 rounded-xl">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-400 rounded-tl"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-400 rounded-tr"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-400 rounded-bl"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-400 rounded-br"></div>
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-blue-400 opacity-70 animate-pulse"></div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <svg className="w-8 h-8 text-white/50 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/></svg>
              <p className="text-white/60 text-xs">Hướng camera vào barcode</p>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs text-gray-400 font-medium">hoặc nhập thủ công</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Số Serial máy *</label>
            <input
              type="text"
              value={serial}
              onChange={e => setSerial(e.target.value.toUpperCase())}
              placeholder="VD: AW10ID1234567"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base font-mono text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Model máy *</label>
            <select
              value={model}
              onChange={e => setModel(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 focus:border-blue-500 focus:outline-none bg-white"
            >
              <option value="">Chọn model...</option>
              <option>AW9ID-1 (9.000 BTU)</option>
              <option>AW10ID-1 (10.000 BTU)</option>
              <option>AW12ID-1 (12.000 BTU)</option>
              <option>AW18ID-2 (18.000 BTU)</option>
              <option>AW24ID-3 (24.000 BTU)</option>
            </select>
          </div>

          <button
            onClick={handleScanSubmit}
            disabled={!serial || !model}
            className="w-full bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-base shadow-md transition-colors"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    );
  }

  if (step === 'form') {
    return (
      <div className="min-h-full bg-gray-50">
        <div className="bg-blue-600 px-5 pt-4 pb-5 flex items-center gap-3">
          <button onClick={() => setStep('scan')} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-white font-bold text-lg">Thông tin khách hàng</h2>
        </div>
        <StepIndicator />

        <div className="px-5 py-5 space-y-4 pb-24">
          <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            <p className="text-xs text-blue-700 font-medium">Serial: <span className="font-mono">{serial}</span> — {model}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Họ tên khách hàng *</label>
            <input
              type="text"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">SĐT khách hàng *</label>
            <input
              type="tel"
              value={customerPhone}
              onChange={e => setCustomerPhone(e.target.value)}
              placeholder="0901 234 567"
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Địa chỉ lắp đặt *</label>
            <textarea
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"
              rows={3}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 focus:border-blue-500 focus:outline-none resize-none"
            />
          </div>

          <div className="bg-gray-100 rounded-xl p-3 flex items-center gap-3">
            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
            <div>
              <p className="text-xs font-semibold text-gray-700">GPS: TP.HCM, Q.1</p>
              <p className="text-xs text-gray-500">Vị trí đã được ghi nhận</p>
            </div>
          </div>

          <button
            onClick={handleFormSubmit}
            disabled={!customerName || !customerPhone || !address}
            className="w-full bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-base shadow-md transition-colors"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    );
  }

  if (step === 'photos') {
    return (
      <div className="min-h-full bg-gray-50">
        <div className="bg-blue-600 px-5 pt-4 pb-5 flex items-center gap-3">
          <button onClick={() => setStep('form')} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-white font-bold text-lg">Chụp ảnh xác nhận</h2>
        </div>
        <StepIndicator />

        <div className="px-5 py-6 space-y-4 pb-24">
          <p className="text-sm text-gray-600">AI sẽ kiểm tra ảnh tự động. Đảm bảo ảnh rõ nét và đủ thông tin.</p>

          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">1. Ảnh dàn nóng/lạnh (có số serial) *</p>
            <button
              onClick={() => setPhotoSerial(!photoSerial)}
              className={`w-full border-2 border-dashed rounded-2xl py-8 flex flex-col items-center gap-3 transition-all ${
                photoSerial ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white'
              }`}
            >
              {photoSerial ? (
                <>
                  <img
                    src="https://images.pexels.com/photos/4489732/pexels-photo-4489732.jpeg?w=300"
                    alt="serial"
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div className="flex items-center gap-1.5 text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    <span className="text-sm font-semibold">Đã chụp</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <span className="text-gray-500 text-sm font-medium">Chụp ảnh dàn nóng/lạnh</span>
                  <span className="text-xs text-gray-400">Đảm bảo số serial thấy rõ</span>
                </>
              )}
            </button>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">2. Ảnh tổng thể công trình *</p>
            <button
              onClick={() => setPhotoInstall(!photoInstall)}
              className={`w-full border-2 border-dashed rounded-2xl py-8 flex flex-col items-center gap-3 transition-all ${
                photoInstall ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white'
              }`}
            >
              {photoInstall ? (
                <>
                  <img
                    src="https://images.pexels.com/photos/7191981/pexels-photo-7191981.jpeg?w=300"
                    alt="install"
                    className="w-32 h-24 object-cover rounded-lg"
                  />
                  <div className="flex items-center gap-1.5 text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    <span className="text-sm font-semibold">Đã chụp</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  </div>
                  <span className="text-gray-500 text-sm font-medium">Chụp ảnh tổng thể</span>
                  <span className="text-xs text-gray-400">Máy lắp trên tường / trần</span>
                </>
              )}
            </button>
          </div>

          <button
            onClick={handlePhotosSubmit}
            disabled={!photoSerial || !photoInstall}
            className="w-full bg-blue-600 disabled:bg-gray-300 text-white font-bold py-4 rounded-xl text-base shadow-md transition-colors"
          >
            Tiếp tục xem lại
          </button>
        </div>
      </div>
    );
  }

  if (step === 'review') {
    return (
      <div className="min-h-full bg-gray-50">
        <div className="bg-blue-600 px-5 pt-4 pb-5 flex items-center gap-3">
          <button onClick={() => setStep('photos')} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-white font-bold text-lg">Xác nhận thông tin</h2>
        </div>
        <StepIndicator />

        <div className="px-5 py-5 space-y-3 pb-24">
          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2.5">
            <h3 className="font-bold text-gray-800 text-sm border-b border-gray-100 pb-2">Thông tin máy</h3>
            <Row label="Serial" value={serial} mono />
            <Row label="Model" value={model} />
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-2.5">
            <h3 className="font-bold text-gray-800 text-sm border-b border-gray-100 pb-2">Khách hàng</h3>
            <Row label="Họ tên" value={customerName} />
            <Row label="SĐT" value={customerPhone} />
            <Row label="Địa chỉ" value={address} />
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-gray-800 text-sm border-b border-gray-100 pb-2 mb-2">Ảnh xác nhận</h3>
            <div className="grid grid-cols-2 gap-2">
              <img src="https://images.pexels.com/photos/4489732/pexels-photo-4489732.jpeg?w=300" alt="serial" className="rounded-lg h-20 w-full object-cover" />
              <img src="https://images.pexels.com/photos/7191981/pexels-photo-7191981.jpeg?w=300" alt="install" className="rounded-lg h-20 w-full object-cover" />
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-xs text-amber-700 font-medium">AI sẽ tự động kiểm tra và phê duyệt trong vài giây.</p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white font-bold py-4 rounded-xl text-base shadow-md"
          >
            Gửi kích hoạt
          </button>
        </div>
      </div>
    );
  }

  // Result
  return (
    <div className="min-h-full bg-gray-50 flex flex-col items-center justify-center px-6 py-10">
      {aiResult === 'loading' && (
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h3 className="text-lg font-bold text-gray-800 mb-1">AI đang kiểm tra...</h3>
          <p className="text-sm text-gray-500">Phân tích ảnh và thông tin</p>
        </div>
      )}

      {aiResult === 'success' && (
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">Kích hoạt thành công!</h3>
          <p className="text-gray-500 text-sm mb-5">AI đã phê duyệt. Điểm thưởng đã được cộng.</p>

          <div className="bg-white rounded-2xl p-5 shadow-sm mb-6 w-full">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-600 text-sm">Điểm nhận được</span>
              <span className="text-2xl font-bold text-green-600">+50 điểm</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 text-sm">Tổng điểm hiện tại</span>
              <span className="text-xl font-bold text-blue-600">1,300 điểm</span>
            </div>
          </div>

          <button
            onClick={onBack}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-base shadow-md"
          >
            Về trang chủ
          </button>
        </div>
      )}

      {aiResult === 'fail' && (
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Kích hoạt thất bại</h3>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-left w-full">
            <p className="text-sm font-semibold text-red-700 mb-1">Lý do từ AI:</p>
            <p className="text-sm text-red-600">{failReason}</p>
          </div>
          <button
            onClick={() => setStep('photos')}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-base shadow-md mb-3"
          >
            Chụp lại ảnh
          </button>
          <button
            onClick={onBack}
            className="w-full border-2 border-gray-300 text-gray-600 font-bold py-3.5 rounded-xl text-base"
          >
            Về trang chủ
          </button>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-start gap-2">
      <span className="text-xs text-gray-500 flex-shrink-0">{label}</span>
      <span className={`text-xs font-semibold text-gray-800 text-right ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  );
}
