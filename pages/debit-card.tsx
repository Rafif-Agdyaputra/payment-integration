import MethodCardComponent from "@/components/card/MethodCardComponent";
import TopUpInformationCard from "@/components/card/TopUpInformationCard";
import AmountCardComponent from "@/components/card/AmountCardComponent";
import { AiFillInfoCircle } from "react-icons/ai";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import MenuHeaderComponent from "@/components/header/MenuHeaderComponent";

export interface AmountData {
  nominal: number;
}

const MAX_MONTHLY_TOPUP = 20000000;

export default function DebitCard() {
  const [customAmount, setCustomAmount] = useState<number>(0);
  const [activeNominal, setActiveNominal] = useState<number | null>(null);
  const [remainingQuota, setRemainingQuota] = useState<number>(MAX_MONTHLY_TOPUP);
  const router = useRouter();

  const isButtonDisabled =
    customAmount < 20000 ||
    customAmount > 2000000 ||
    customAmount > remainingQuota;

  const amountData: AmountData[] = [
    { nominal: 50000 },
    { nominal: 100000 },
    { nominal: 150000 },
    { nominal: 200000 },
    { nominal: 250000 },
    { nominal: 300000 },
  ];

  const handleAmountClick = (amount: number) => {
    setCustomAmount(amount);
    setActiveNominal(amount);
  };

  const goToSuccessPage = () => {
    const newQuota = remainingQuota - customAmount;
    setRemainingQuota(newQuota);
    localStorage.setItem("remainingQuota", newQuota.toString());
    router.push("/success");
  };

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  useEffect(() => {
    const storedQuota = localStorage.getItem("remainingQuota");
    if (storedQuota) {
      setRemainingQuota(Number(storedQuota));
    }
  }, []);

  return (
    <div className="flex flex-col items-start justify-start min-h-screen bg-white px-4 gap-6">
      <MenuHeaderComponent title="Top Up LRTJPay"/>
      <MethodCardComponent icon="wallet-icon.webp" name="Via Debit/Credit Card" />
      <TopUpInformationCard saveUp={2000000} maxTrx={20000000} />
      <div className="w-full grid grid-cols-2 gap-2">
        {amountData.map((amount, index) => {
          return (
            <AmountCardComponent
              key={index}
              nominal={amount.nominal}
              isActive={activeNominal === amount.nominal}
              onSelectAmount={handleAmountClick}
            />
          )
        })}
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-[14px] text-[#041C2C] font-semibold">Enter Another Amount</span>
        <div className="flex flex-row gap-3 items-center">
          <span className="text-[28px] text-[#041C2C] font-bold">Rp</span>
          <input
            type="tel"
            placeholder="0"
            value={customAmount !== 0 ? formatNumber(customAmount) : ""}
            onChange={(e) => {
              const value = e.target.value.replace(/\./g, '');
              setCustomAmount(Number(value));
              setActiveNominal(null);
            }}
            className="text-[28px] font-bold placeholder-[#999999] focus:outline-none"
            style={{ background: 'transparent', color: customAmount !== 0 ? '#041C2C' : '#999999' }}
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <AiFillInfoCircle color="#999999" />
          <span className="text-[11px] text-[#999999]">Minimum top up amount Rp 20.000</span>
        </div>
        <span className="text-[11px] text-red-500">
          This month quota: Rp {remainingQuota.toLocaleString("id-ID")}
        </span>
      </div>

      <div className="w-full mx-auto">
        <button
          onClick={goToSuccessPage}
          disabled={isButtonDisabled}
          className={`w-full py-3 text-white font-semibold rounded-lg ${
            isButtonDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
