export default function AmountCardComponent({ nominal, isActive, onSelectAmount }) {
  return (
    <div
      onClick={() => onSelectAmount(nominal)}
      className={`w-full flex flex-row items-center justify-start gap-2 p-[8px] rounded-md border cursor-pointer ${
        isActive ? "border-red-500" : "border-[#E0E0E0]"
      }`}
    >
      <div className="flex flex-col items-center justify-center w-[40px] h-[40px] bg-[#0055B81A] rounded-full">
        <img src={`/webp/wallet-icon.webp`} alt="wallet-icon" width={20} height={20} />
      </div>
      <span className="text-[14px] text-[#041C2C] font-semibold">
        Rp{parseInt(nominal).toLocaleString("id-ID")}
      </span>
    </div>
  );
}
