'use client';
import {useEffect, useMemo, useRef, useState} from 'react';
import { useRouter } from 'next/navigation';
import {generateOTP} from "@/service/generateOtpService";
import RegistrationHeaderComponent from "@/components/header/RegistrationHeaderComponent";

export default function OtpVerification() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [showError, setShowError] = useState(false);
  const initialTime = 10;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isExpired, setIsExpired] = useState(false);
  const [otpVariable, setOtpVariable] = useState('');

  const logMessage = async (level: string, message: string) => {
    await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, message }),
    });
  };

  const countdownTimer = useMemo(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    const storedOtp = localStorage.getItem('otp');
    countdownTimer();
    if (!storedPhoneNumber) {
      router.push('/');
    } else {
      setOtpVariable(storedOtp);
      setPhoneNumber(storedPhoneNumber);
    }
  }, [countdownTimer]);

  const validateOtp = async (inputOtp: string) => {
    const storedOtp = localStorage.getItem('otp');
    if (inputOtp === storedOtp) {
      await logMessage('info', `Success validate OTP`);
      router.push('/registration');
    } else {
      await logMessage('error', `Error validate OTP. Wrong OTP`);
      setShowError(true);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      if (index === otp.length - 1 && newOtp.every(digit => digit !== '')) {
        validateOtp(newOtp.join(''));
      }
    }
  };

  const handleBackspace = (index: number, event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const closeErrorPopup = () => {
    setShowError(false);
  };

  const handleResendOTP = async () => {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    const otp = generateOTP();
    setOtpVariable(otp);
    await logMessage('info', `Resend phone number: ${storedPhoneNumber}`);
    await logMessage('info', `Generate new OTP: ${otp}`);
    localStorage.setItem('phoneNumber', storedPhoneNumber);
    localStorage.setItem('otp', otp);
  };

  return (
    <>
      <RegistrationHeaderComponent title="Verifikasi Kode OTP" />
      <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6 gap-6">
        <div className="flex flex-col text-[14px]">
          <p className="">Masukkan 6 digit kode OTP yang sudah dikirim ke nomor kamu dibawah ini ya!</p>
          <p className="font-bold text-red-500 mb-2">{phoneNumber}</p>
          <p className="font-bold text-blue-500 mb-2">Kode Otp Dummy: {otpVariable}</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex space-x-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-10 h-12 border rounded-md text-center text-xl"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(index, e)}
              />
            ))}
          </div>

          <span className="text-[14px] text-[#344054]">Tidak terima kode?</span>
          {isExpired ? (
            <button onClick={handleResendOTP} className="text-[12px] text-blue-500">
              Kirim OTP Ulang
            </button>
          ) : (
            <span className="text-[12px] text-[#344054]">
          Kirim kode kembali dalam 00:{String(timeLeft).padStart(1, '0')}
        </span>
          )}
        </div>

        {showError && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col bg-white p-6 rounded shadow-lg">
              <p className="text-red-500">OTP Salah</p>
              <button onClick={closeErrorPopup} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
