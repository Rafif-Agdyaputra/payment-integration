'use client';

import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from "@/contex/AppContext";
import RegistrationHeaderComponent from "@/components/header/RegistrationHeaderComponent";
import CryptoJS from 'crypto-js';

export default function ConfirmPin() {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const router = useRouter();
  const { setUserPin } = useAppContext();
  const encryptionKey = 'gshock567uusj8';

  const decryptPin = (encryptedPin: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedPin, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleConfirm = () => {
    const encryptedPin = localStorage.getItem('userPin');
    if (!encryptedPin) return setError(true);

    const decryptedPin = decryptPin(encryptedPin);

    if (pin.includes('')) {
      setError(true);
    } else {
      setError(false);
      const enteredPin = pin.join('');

      if (enteredPin === decryptedPin) {
        setUserPin(enteredPin);
        localStorage.removeItem('phoneNumber');
        localStorage.removeItem('otp');
        router.push('/topup');
      } else {
        setError(true);
      }
    }
  };

  const closeErrorPopup = () => {
    setError(false);
  };

  useEffect(() => {
    const lastReset = localStorage.getItem('lastQuotaReset');
    const now = new Date();
    const currentMonth = now.getMonth();

    if (!lastReset || new Date(lastReset).getMonth() !== currentMonth) {
      localStorage.setItem('remainingQuota', '20000000');
      localStorage.setItem('lastQuotaReset', now.toString());
    }
  }, []);

  return (
    <>
      <RegistrationHeaderComponent title="LRT  X JakOne Pay"/>
      <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">
        <img src="/webp/lrt-logo.webp" alt="LRT Jakarta" className="mb-4" width={185} height={50} />
        <p className="text-xl mb-2">Konfirmasi PIN kamu!</p>

        <div className="flex space-x-2 mb-4">
          {pin.map((digit, index) => (
            <input
              key={index}
              type="password"
              maxLength={1}
              className="w-10 h-12 border rounded-md text-center text-xl"
              value={digit}
              onChange={(e) => {
                const newPin = [...pin];
                newPin[index] = e.target.value;
                setPin(newPin);
                if (e.target.value !== '' && index < pin.length - 1) {
                  document.getElementById(`confirm-pin-input-${index + 1}`)?.focus();
                }
              }}
              id={`confirm-pin-input-${index}`}
            />
          ))}
        </div>

        <span>Konfirmasi PIN kamu!</span>

        {error && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col items-center bg-white p-6 rounded shadow-lg">
              <p className="text-[#061127]">PIN yang kamu masukan</p>
              <p className="text-[#061127]">TIDAK SESUAI</p>
              <button onClick={closeErrorPopup} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                Konfirmasi
              </button>
            </div>
          </div>
        )}

        <button
          className="mt-4 bg-red-500 text-white px-6 py-2 rounded-md"
          onClick={handleConfirm}
        >
          Konfirmasi
        </button>
      </div>
    </>
  );
}
