'use client';
import { useRouter } from 'next/navigation';

export default function Header({title}: string) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center px-4 py-2 bg-white mb-6">
      <button onClick={handleBack} className="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <span className="text-[#101828] text-[18px] font-semibold">{title}</span>
    </div>
  );
}
