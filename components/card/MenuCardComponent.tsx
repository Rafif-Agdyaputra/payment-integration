import {FaArrowRight} from "react-icons/fa";
import {useRouter} from "next/navigation";
import {useCallback} from "react";

export interface MenuItemCardComponent {
  icon: string;
  title: string;
  subTitle: string;
  url: string;
}

export default function MenuCardComponent({icon, title, subTitle, url}: MenuItemCardComponent) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(url);
  }, [url]);

  return (
    <>
      <div className="w-full flex flex-row items-center justify-between gap-4 cursor-pointer" onClick={handleClick}>
        <div className="flex flex-row items-center justify-center gap-3">
          <div
            className="flex flex-col items-center justify-center w-[56px] h-[56px] rounded-full"
            style={{background: 'linear-gradient(270deg, #C0A720 0%, #E21A1A 100%)'}}>
            <img src={`/svg/${icon}`} alt="wallet-icon" width={16} height={20} />
          </div>
          <div className="flex flex-col items-start gap-[1px] text-[12px] text-[#000000]">
            <span className="font-semibold">{title}</span>
            <span className="font-normal">{subTitle}</span>
          </div>
        </div>
        <FaArrowRight />
      </div>
    </>
  )
}