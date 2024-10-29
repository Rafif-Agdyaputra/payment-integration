import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export interface MenuHeaderDto {
  title: string;
}

export default function MenuHeaderComponent({ title }: MenuHeaderDto) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="sticky w-full top-0 z-10 flex items-center bg-white px-4 py-3 border-b">
      <button onClick={handleBack} className="mr-3">
        <FaArrowLeft />
      </button>
      <span className="text-[#101828] text-lg font-semibold">{title}</span>
    </div>
  );
}
