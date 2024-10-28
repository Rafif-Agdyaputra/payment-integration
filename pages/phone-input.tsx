'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {generateOTP} from "@/service/generateOtpService";
import RegistrationHeaderComponent from "@/components/header/RegistrationHeaderComponent";
// import logger from "@/utils/logger";

export default function PhoneInput() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();

  const handleSendOTP = () => {
    const otp = generateOTP();
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('otp', otp);

    // logger.info(`OTP generated for phone number: ${phoneNumber}`);
    router.push('/otp-verification');
  };

  return (
    <>
      <RegistrationHeaderComponent title="LRT  X JakOne Pay"/>
      <div className="w-full flex flex-col items-center justify-start min-h-screen bg-white px-6">
        <img src="/webp/lrt-logo.webp" alt="LRT Jakarta" className="mb-4" width={185} height={50}/>
        <p className="text-xl text-[18px] text-[#000000B2] mb-2">Selamat Datang</p>

        <div className="flex flex-col items-start w-full gap-4">
          <p className="text-[12px] text-[#061127]">Ekspresikan perjalananmu menggunakan LRT Pay</p>
          <div>
            <span className="text-[12px] text-black font-semibold">Nomor Telepon</span>
            <div className="w-full flex items-center justify-between border border-[#D43E33] rounded-md p-2">
              <input
                type="tel"
                className="flex-1 text-lg px-4 py-2 focus:outline-none"
                placeholder="085839328544"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <button
                onClick={handleSendOTP}
                className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
              >
                Kirim OTP
              </button>
            </div>
          </div>
          <p className="text-[14px]">Seluruh transaksi aman, dengan melanjutkan proses ini. Menu <a className="font-semibold text-red-500">syarat & ketentuan</a> yang berlaku</p>
        </div>
      </div>
    </>
  );
}
