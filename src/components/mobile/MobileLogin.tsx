import { useState } from 'react';

interface Props {
  onLogin: () => void;
}

type LoginStep = 'phone' | 'otp' | 'register';

export default function MobileLogin({ onLogin }: Props) {
  const [step, setStep] = useState<LoginStep>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isNewUser, setIsNewUser] = useState(false);
  const [name, setName] = useState('');
  const [cccdUploaded, setCccdUploaded] = useState(false);

  const handlePhoneSubmit = () => {
    if (phone.length >= 9) {
      setStep('otp');
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleOtpSubmit = () => {
    const code = otp.join('');
    if (code.length === 6) {
      if (phone === '0901234567') {
        onLogin();
      } else {
        setIsNewUser(true);
        setStep('register');
      }
    }
  };

  if (step === 'phone') {
    return (
      <div className="min-h-full bg-gradient-to-b from-blue-600 to-blue-800 flex flex-col">
        {/* Logo area */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 pt-12 pb-6">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 7H7a5 5 0 000 10h10a5 5 0 000-10zM7 15a3 3 0 110-6 3 3 0 010 6z"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wide">AIRWELL</h1>
          <p className="text-blue-200 text-sm mt-1">Hệ thống kích hoạt bảo hành</p>
        </div>

        {/* Login form */}
        <div className="bg-white rounded-t-3xl px-6 py-8 pb-24">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Đăng nhập</h2>
          <p className="text-gray-500 text-sm mb-6">Nhập số điện thoại để tiếp tục</p>

          <div className="mb-4">
            <label className="text-sm font-semibold text-gray-700 mb-2 block">Số điện thoại</label>
            <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors">
              <span className="bg-gray-50 px-3 py-3.5 text-gray-600 font-medium text-sm border-r border-gray-200">+84</span>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="901 234 567"
                className="flex-1 px-3 py-3.5 text-gray-800 font-medium outline-none bg-white text-base"
                onKeyDown={e => e.key === 'Enter' && handlePhoneSubmit()}
              />
            </div>
          </div>

          <button
            onClick={handlePhoneSubmit}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-base active:bg-blue-700 transition-colors shadow-md"
          >
            Nhận mã OTP
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              Dùng <span className="font-semibold text-blue-600">0901234567</span> để đăng nhập demo
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">hoặc</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <button
            onClick={() => setStep('register')}
            className="w-full mt-4 border-2 border-blue-600 text-blue-600 font-bold py-3.5 rounded-xl text-base"
          >
            Đăng ký tài khoản mới
          </button>
        </div>
      </div>
    );
  }

  if (step === 'otp') {
    return (
      <div className="min-h-full bg-white flex flex-col">
        <div className="bg-blue-600 px-6 pt-6 pb-8">
          <button onClick={() => setStep('phone')} className="text-white mb-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          </button>
          <h2 className="text-2xl font-bold text-white">Xác thực OTP</h2>
          <p className="text-blue-200 text-sm mt-1">Mã 6 chữ số gửi đến +84 {phone}</p>
        </div>

        <div className="flex-1 px-6 py-8">
          <div className="flex gap-2 justify-center mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleOtpChange(i, e.target.value)}
                className="w-11 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
              />
            ))}
          </div>

          <button
            onClick={handleOtpSubmit}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-base shadow-md"
          >
            Xác nhận
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">Nhập bất kỳ 6 chữ số nào để tiếp tục</p>
          </div>

          <button className="w-full mt-6 text-blue-600 font-medium text-sm py-2">
            Gửi lại mã (60s)
          </button>
        </div>
      </div>
    );
  }

  // Register
  return (
    <div className="min-h-full bg-white flex flex-col">
      <div className="bg-blue-600 px-6 pt-6 pb-8">
        <button onClick={() => setStep('phone')} className="text-white mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-2xl font-bold text-white">{isNewUser ? 'Đăng ký tài khoản' : 'Tạo tài khoản'}</h2>
        <p className="text-blue-200 text-sm mt-1">Điền thông tin để hoàn tất đăng ký</p>
      </div>

      <div className="flex-1 px-6 py-6 space-y-4 pb-24">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Họ và tên *</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nguyễn Văn A"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Khu vực *</label>
          <select className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 focus:border-blue-500 focus:outline-none bg-white">
            <option>TP.HCM</option>
            <option>Hà Nội</option>
            <option>Đà Nẵng</option>
            <option>Cần Thơ</option>
            <option>Bình Dương</option>
            <option>Đồng Nai</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Vai trò *</label>
          <div className="grid grid-cols-2 gap-2">
            <button className="border-2 border-blue-500 bg-blue-50 text-blue-700 font-semibold py-3 rounded-xl text-sm">
              Thợ cá nhân
            </button>
            <button className="border-2 border-gray-200 text-gray-600 font-semibold py-3 rounded-xl text-sm">
              Đại lý
            </button>
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-1.5 block">Upload CCCD *</label>
          <button
            onClick={() => setCccdUploaded(!cccdUploaded)}
            className={`w-full border-2 border-dashed rounded-xl py-6 flex flex-col items-center gap-2 transition-colors ${
              cccdUploaded ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
            }`}
          >
            {cccdUploaded ? (
              <>
                <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                <span className="text-green-600 font-semibold text-sm">CCCD đã tải lên</span>
              </>
            ) : (
              <>
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span className="text-gray-500 text-sm">Chụp / tải ảnh CCCD</span>
              </>
            )}
          </button>
          <p className="text-xs text-gray-400 mt-1.5">Dùng để xác minh danh tính. AI sẽ kiểm tra tự động.</p>
        </div>

        <button
          onClick={onLogin}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-base shadow-md mt-2"
        >
          Gửi đăng ký
        </button>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
          <p className="text-xs text-amber-700 font-medium">Admin sẽ xét duyệt trong 1-2 ngày làm việc.</p>
        </div>
      </div>
    </div>
  );
}
