import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (countdown === 0) {
      router.back();
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 gap-6">
      <img src="/webp/lrt-mascot.webp" alt="LRT Jakarta" className="mb-4" width={200} height={50}/>
      <p className="text-xl text-[18px] text-[#000000B2] font-bold">Selamat!</p>
      <p className="text-[14px] text-[#344054]">Transaksi Kamu Telah Berhasil.</p>
      <p className="text-[12px] text-[#999999]">
        Kamu akan diarahkan kembali dalam {countdown} detik.
      </p>
    </div>
  )
}