import "@/styles/globals.css";
import type { AppProps } from "next/app";
import RegistrationFooterComponent from "@/components/footer/RegistrationFooterComponent";
import {AppProvider} from "@/contex/AppContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="w-full max-w-[500px] mx-auto p-4 border">
          <Component {...pageProps} />
          <RegistrationFooterComponent />
        </div>
      </div>
    </AppProvider>
  );
}
