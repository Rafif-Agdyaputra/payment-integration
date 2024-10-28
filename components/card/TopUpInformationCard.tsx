
export default function TopUpInformationCard({saveUp, maxTrx}) {
  return (
    <div className="w-full flex flex-row items-start bg-[#F2F6FA] rounded-lg p-[12px] gap-2">
      <img src="/svg/speaker-icon.svg" alt="speaker-icon" width={14} height={14}/>
      <div className="flex flex-col gap-2">
        <span className="text-[12px] text-[#E21A1A] font-semibold leading-3">Top Up Information</span>
        <span className="text-[12px] text-[#000000]">
          You can save up to Rp {parseInt(saveUp).toLocaleString("id-ID")} with maximum transactions of Rp {parseInt(maxTrx).toLocaleString("id-ID")} per month
        </span>
      </div>
    </div>
  )
}