import { useRouter } from 'next/navigation';
import {FaArrowLeft} from "react-icons/fa";

export default function MenuHeaderComponent({title}: string) {

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center bg-white mb-6">
      <button onClick={handleBack} className="mr-2">
        <FaArrowLeft />
      </button>
      <span className="text-[#101828] text-[18px] font-semibold">{title}</span>
    </div>
  )
}