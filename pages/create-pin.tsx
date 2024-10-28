'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import CryptoJS from 'crypto-js';
import RegistrationHeaderComponent from "@/components/header/RegistrationHeaderComponent";

export default function CreatePin() {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const router = useRouter();
  const encryptionKey = 'gshock567uusj8';

  const handlePinChange = (index: number, value: string) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value !== '' && index < pin.length - 1) {
      document.getElementById(`pin-input-${index + 1}`)?.focus();
    }

    if (index === pin.length - 1 && newPin.every((d) => d !== '')) {
      const pinString = newPin.join('');
      const encryptedPin = CryptoJS.AES.encrypt(pinString, encryptionKey).toString();

      localStorage.setItem('userPin', encryptedPin);
      router.push('/confirm-pin');
    }
  };

  return (
    <>
      <RegistrationHeaderComponent title="LRT  X JakOne Pay"/>
      <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">
        <img src="/webp/lrt-logo.webp" alt="LRT Jakarta" className="mb-4" width={185} height={50} />
        <p className="text-xl mb-2">Buat PIN kamu!</p>
        <p className="text-gray-500 mb-4">Seluruh informasimu terlindungi</p>

        <div className="flex space-x-2">
          {pin.map((digit, index) => (
            <input
              key={index}
              id={`pin-input-${index}`} // Add an ID for focus management
              type="password"
              maxLength={1}
              className="w-10 h-12 border rounded-md text-center text-xl"
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
            />
          ))}
        </div>
        <img src="/webp/lrt-mascot.webp" alt="LRT Jakarta" className="my-12" width={230} height={90} />
        <p>Seluruh informasi kamu terlindungi</p>
      </div>
    </>
  );
}
