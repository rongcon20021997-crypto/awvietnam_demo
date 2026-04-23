import { useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Props {
  onLogin: () => void;
}

type LoginStep = 'phone' | 'otp' | 'register';

export default function MobileLogin({ onLogin }: Props) {
  const [step, setStep] = useState<LoginStep>('phone');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [accountStatus, setAccountStatus] = useState<'none' | 'pending' | 'rejected'>('none');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isNewUser, setIsNewUser] = useState(false);
  const [name, setName] = useState('');
  const [region, setRegion] = useState('TP.HCM');
  const [role, setRole] = useState<'technician' | 'dealer'>('technician');
  const [cccdUploaded, setCccdUploaded] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleModeSelect = (selectedMode: 'login' | 'register') => {
    setMode(selectedMode);
    setStep('phone');
  };

  const handlePhoneSubmit = async () => {
    setError(null);
    if (phone.length < 9) {
      setError('Vui lòng nhập số điện thoại hợp lệ.');
      return;
    }

    setLoading(true);
    const { data, error: dbError } = await supabase
      .from('technicians')
      .select('*')
      .eq('phone', phone)
      .maybeSingle();
    setLoading(false);

    if (mode === 'login') {
      if (!data) {
        if (phone === '0901234567') {
          setStep('otp');
          return;
        }
        setError('Số điện thoại này chưa được đăng ký.');
      } else if (data.status === 'pending') {
        setAccountStatus('pending');
      } else if (data.status === 'rejected') {
        setAccountStatus('rejected');
      } else {
        setStep('otp');
      }
    } else {
      // Registration mode
      if (data) {
        setError('Số điện thoại này đã được đăng ký. Vui lòng quay lại Đăng nhập.');
      } else {
        setStep('otp');
      }
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

  const handleOtpSubmit = async () => {
    const code = otp.join('');
    if (code.length === 6) {
      setTimeout(async () => {
        const { data } = await supabase
          .from('technicians')
          .select('*')
          .eq('phone', phone)
          .maybeSingle();

        if (data && data.status === 'approved') {
          onLogin();
        } else if (phone === '0901234567') {
          onLogin();
        } else {
          setIsNewUser(true);
          setStep('register');
        }
      }, 800);
    }
  };

  const handleRegisterSubmit = async () => {
    if (name && cccdUploaded) {
      const { error: dbError } = await supabase.from('technicians').insert([
        { 
          name, 
          phone, 
          region, 
          role, 
          status: 'pending',
          cccd_url: 'https://placeholder-url.com/cccd.jpg'
        }
      ]);

      if (dbError) {
        console.error('Registration error:', dbError);
        setError('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.');
      } else {
        setIsRegistered(true);
      }
    }
  };

  // Ưu tiên hiển thị màn hình trạng thái tài khoản trước mọi bước khác
  if (accountStatus !== 'none') {
    return (
      <div className="min-h-full bg-white flex flex-col items-center justify-center px-8 py-12 text-center">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${accountStatus === 'pending' ? 'bg-amber-100' : 'bg-red-100'}`}>
          {accountStatus === 'pending' ? (
            <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          ) : (
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {accountStatus === 'pending' ? 'Tài khoản chờ duyệt' : 'Tài khoản bị từ chối'}
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          {accountStatus === 'pending'
            ? 'Hệ thống đang xử lý thông tin của bạn. Vui lòng quay lại sau 1-2 giờ hoặc liên hệ Admin.'
            : 'Rất tiếc, yêu cầu đăng ký của bạn không được chấp nhận. Vui lòng liên hệ hotline để biết thêm chi tiết.'}
        </p>
        <button
          onClick={() => { setAccountStatus('none'); }}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-base shadow-md"
        >
          Quay lại
        </button>
      </div>
    );
  }

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

        {/* Form area */}
        <div className="bg-white rounded-t-3xl px-6 py-8 pb-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              {mode === 'login' ? 'Đăng nhập' : 'Đăng ký mới'}
            </h2>
            {mode === 'register' && (
              <button onClick={() => setMode('login')} className="text-blue-600 text-sm font-semibold">Quay lại</button>
            )}
          </div>
          
          <p className="text-gray-500 text-sm mb-6">
            {mode === 'login' ? 'Nhập số điện thoại để tiếp tục' : 'Nhập số điện thoại để bắt đầu đăng ký'}
          </p>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-100 rounded-xl p-3.5 flex items-center gap-3 animate-shake">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-red-600 text-sm font-medium leading-tight">{error}</p>
            </div>
          )}

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
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-base active:bg-blue-700 transition-colors shadow-md flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              mode === 'login' ? 'Nhận mã OTP' : 'Tiếp tục đăng ký'
            )}
          </button>

          {mode === 'login' ? (
            <>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-gray-400">hoặc</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              <button
                onClick={() => setMode('register')}
                className="w-full mt-4 border-2 border-blue-600 text-blue-600 font-bold py-3.5 rounded-xl text-base active:bg-blue-50 transition-colors"
              >
                Đăng ký tài khoản mới
              </button>
            </>
          ) : (
            <p className="text-center text-xs text-gray-400 mt-6">
              Bằng cách tiếp tục, bạn đồng ý với <span className="text-blue-600 underline">Điều khoản dịch vụ</span> của Airwell.
            </p>
          )}
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
        </div>
      </div>
    );
  }



  if (isRegistered) {
    return (
      <div className="min-h-full bg-white flex flex-col items-center justify-center px-8 py-12 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng ký thành công!</h2>
        <p className="text-gray-600 mb-8 px-4">
          Hệ thống đã ghi nhận thông tin. Vui lòng đợi Admin phê duyệt tài khoản của bạn trong vòng <span className="font-bold text-blue-600">1-2 giờ</span> tới.
        </p>
        <button
          onClick={() => {
            setIsRegistered(false);
            setStep('phone');
          }}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-base shadow-md"
        >
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-white flex flex-col">
      <div className="bg-blue-600 px-6 pt-6 pb-8 text-white relative">
        <button onClick={() => setStep('phone')} className="mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
        </button>
        <h2 className="text-2xl font-bold">Đăng ký tài khoản</h2>
        <p className="text-blue-200 text-sm mt-1">Điền thông tin để hoàn tất đăng ký</p>
      </div>

      <div className="flex-1 px-6 py-6 space-y-4 pb-24">
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3.5 flex items-center gap-3 animate-shake">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-red-600 text-sm font-medium leading-tight">{error}</p>
          </div>
        )}

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-500 uppercase font-bold">Số điện thoại xác thực</p>
            <p className="text-base font-bold text-gray-800">+84 {phone}</p>
          </div>
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
        </div>

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
          <select 
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-800 focus:border-blue-500 focus:outline-none bg-white"
          >
            <option>TP.HCM</option>
            <option>Hà Nội</option>
            <option>Đà Nẵng</option>
            <option>Cần Thơ</option>
            <option>Bình Dương</option>
            <option>Đồng Nai</option>
          </select>
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
        </div>

        <button
          onClick={() => {
            setError(null);
            if (!name) {
              setError('Vui lòng nhập Họ và tên.');
              return;
            }
            if (!cccdUploaded) {
              setError('Vui lòng chụp ảnh CCCD để xác minh.');
              return;
            }
            handleRegisterSubmit();
          }}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-base shadow-md mt-2 active:bg-blue-700 transition-colors"
        >
          Gửi đăng ký
        </button>
      </div>
    </div>
  );
}
