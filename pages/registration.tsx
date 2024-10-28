'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {useAppContext} from "@/contex/AppContext";
import RegistrationHeaderComponent from "@/components/header/RegistrationHeaderComponent";

export default function Registration() {
  const { setRegistrationData } = useAppContext();
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    birthDate: '',
    location: '',
    email: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const logMessage = async (level: string, message: string) => {
    await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, message }),
    });
  };

  useEffect(() => {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    if (storedPhoneNumber) {
      setFormData((prevData) => ({ ...prevData, phone: storedPhoneNumber }));
    } else {
      setFormData((prevData) => ({ ...prevData }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = async () => {
    const isEmpty = Object.values(formData).some((value) => value.trim() === '');
    if (isEmpty) {
      await logMessage('error', `Field cannot be empty: Registration Page`);
      setError('Semua field harus diisi!');
      return;
    } else {
      await logMessage('info', `Success registration`);
      router.push('/create-pin');
    }
    setRegistrationData(formData);
    localStorage.setItem('registrationData', JSON.stringify(formData));
  };

  return (
    <>
      <RegistrationHeaderComponent title="LRT  X JakOne Pay"/>
      <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6">
        <img src="/webp/lrt-logo.webp" alt="LRT Jakarta" className="mb-4" width={185} height={50}/>
        <div className="w-full max-w-md space-y-4">
          <input
            name="phone"
            placeholder="Nomor Telepon"
            className="w-full p-3 border rounded-md"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            name="name"
            placeholder="Nama"
            className="w-full p-3 border rounded-md"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            name="birthDate"
            type="date"
            className="w-full p-3 border rounded-md"
            value={formData.birthDate}
            onChange={handleChange}
          />
          <input
            name="location"
            placeholder="Tempat Lahir"
            className="w-full p-3 border rounded-md"
            value={formData.location}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="Email"
            className="w-full p-3 border rounded-md"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {error && (
          <p className="text-red-500 mt-2">{error}</p>
        )}

        <button
          className="w-full mt-6 bg-red-500 text-white px-6 py-2 rounded-md"
          onClick={handleSubmit}
        >
          Daftar
        </button>
      </div>
    </>
  );
}
