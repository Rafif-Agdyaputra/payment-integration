'use client';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { generateOTP } from '@/service/generateOtpService';
import RegistrationHeaderComponent from '@/components/header/RegistrationHeaderComponent';

export default function PhoneInput() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('remainingQuota');
    localStorage.removeItem('lastQuotaReset');
  }, []);

  const logMessage = async (level: string, message: string) => {
    await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, message }),
    });
  };

  const handleSendOTP = async () => {
    const otp = generateOTP();

    await logMessage('info', `OTP generated for phone number: ${phoneNumber}`);
    await logMessage('info', `Generated OTP: ${otp}`);

    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('otp', otp);
    router.push('/otp-verification');
  };

  return (
    <>
      <RegistrationHeaderComponent title="LRT X JakOne Pay" />
      <div className="flex flex-col items-center min-h-screen w-full bg-white px-6 py-8">

        <img
          src="/webp/lrt-logo.webp"
          alt="LRT Jakarta"
          className="mb-6"
          width={185}
          height={50}
        />

        <h2 className="text-lg font-medium text-black/70 mb-6">Selamat Datang</h2>

        <div className="flex flex-col items-start w-full gap-4">

          <p className="text-sm text-[#061127]">
            Ekspresikan perjalananmu menggunakan LRT Pay
          </p>

          <div className="w-full">
            <label htmlFor="phone-number" className="block text-sm font-semibold text-black mb-2">
              Nomor Telepon
            </label>
            <div className="flex items-center border border-red-500 rounded-lg overflow-hidden p-2">
              <input
                id="phone-number"
                type="tel"
                className="flex-1 text-base px-4 py-3 focus:outline-none"
                placeholder="085839328544"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button
                onClick={handleSendOTP}
                className="bg-red-500 text-white px-4 py-3 hover:bg-red-600 transition duration-200"
              >
                Kirim OTP
              </button>
            </div>
          </div>

          <p className="text-sm text-black">
            Seluruh transaksi aman. Dengan melanjutkan proses ini, Anda menyetujui{' '}
            <a className="font-semibold text-red-500 cursor-pointer">syarat & ketentuan</a> yang berlaku.
          </p>
        </div>
      </div>
    </>

  );
}
