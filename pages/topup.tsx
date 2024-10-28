import MethodCardComponent from "@/components/card/MethodCardComponent";
import MenuCardComponent from "@/components/card/MenuCardComponent";
import MenuHeaderComponent from "@/components/header/MenuHeaderComponent";
import {useAppContext} from "@/contex/AppContext";

export interface MenuItemDto {
  icon: string;
  title: string;
  subTitle: string;
  url: string;
}

export default function Topup() {
  const { registrationData } = useAppContext();

  const menuItems: MenuItemDto[] = [
    {
      icon: 'phone-icon.svg',
      title: 'JakOne Mobile',
      subTitle: 'No Administration fees via the JakOne Mobile Mobile App',
      url: '/debit-card'
    },
    {
      icon: 'atm-icon.svg',
      title: 'ATM Bank DKI',
      subTitle: 'Top up Martipay from nearest Bank DKI ATM',
      url: '/debit-card'
    },
    {
      icon: 'other-bank-icon.svg',
      title: 'Other Bank',
      subTitle: 'Transfer anytime from your favourite Indonesia bank',
      url: '/debit-card'
    },
    {
      icon: 'debit-icon.svg',
      title: 'Debit Card',
      subTitle: 'Top up online using your debit card',
      url: '/debit-card'
    },
  ]

  return (
    <div className="flex flex-col items-start justify-start min-h-screen bg-white px-4 gap-6">
      <MenuHeaderComponent title="Top Up LRTJPay"/>
      <h2 className="font-semibold text-red-500">Halo, {registrationData.name}</h2>
      <MethodCardComponent icon="wallet-icon.webp" name="Top Up Methods" />
      <div className="flex flex-col gap-6 items-start w-full mt-6">
        {menuItems.map((data, index) => {
          return (
            <MenuCardComponent icon={data.icon} title={data.title} subTitle={data.subTitle} url={data.url} />
          )
        })}
      </div>
    </div>
  )
}