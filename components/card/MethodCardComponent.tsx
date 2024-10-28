export interface MethodCardDto {
  icon: string;
  name: string;
}

export default function MethodCardComponent({icon, name}: MethodCardDto) {
  return (
    <div className="flex flex-row items-center gap-4">
      <div className="flex flex-col items-center justify-center w-[56px] h-[56px] bg-[#0055B81A] rounded-full">
        <img src={`/webp/${icon}`} alt="wallet-icon" width={20} height={20}/>
      </div>
      <span className="text-[18px] text-[#041C2C] font-bold">{name}</span>
    </div>
  )
}