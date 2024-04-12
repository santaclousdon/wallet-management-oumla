"use client";

import WalletBalance from "../components/WalletBalance";
import Receiver from "../components/Receiver";
import Sender from "../components/Sender";
import Transactions from "../components/Transactions";
import { useWalletContext } from "../context/WalletContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getAddressAPI,
  fetchBTCPriceAPI,
  getAllTransactionsAPI,
} from "../utils/service";
import Toastr from "../components/Toastr";

const WalletManagement = () => {
  const router = useRouter();
  const walletContext = useWalletContext();
  const callWalletAPI = async () => {
    if (!walletContext.reference) return;

    const _address = await getAddressAPI(walletContext.reference);
    walletContext.setAddress(_address);
  };

  const callGetTransactionsAPI = async () => {
    if (!walletContext.reference) return;

    const _transactions = await getAllTransactionsAPI(walletContext.reference);
    walletContext.setTransactions(_transactions);
  };

  const callFetchBTCPriceAPI = async () => {
    const _btcPrice = await fetchBTCPriceAPI();
    walletContext.setBtcPrice(_btcPrice);
  };

  useEffect(() => {
    const _ref = localStorage.getItem("reference");
    if (!_ref) {
      router.push("/");
    }
    walletContext.setReference(_ref as string);
  }, [walletContext.reference]);

  useEffect(() => {
    if (!walletContext.reference) {
      return;
    } else {
      callWalletAPI();
      callFetchBTCPriceAPI();
      callGetTransactionsAPI();
    }
  }, [walletContext.reference]);

  return (
    <div className="lg:h-screen bg-white dark:bg-black text-black dark:text-white overflow-hidden">
      <main className="lg:flex z-10 relative max-w-screen-2xl 2xl:mx-auto">
        <div className="lg:w-1/4 flex flex-col p-6 space-y-8 lg:h-screen">
          <WalletBalance
            address={walletContext.address}
            btcPrice={walletContext.btcPrice}
          />
        </div>
        <div className="lg:w-3/4 p-6 space-y-8">
          <div className="sm:flex justify-between">
            <Sender
              btcPrice={walletContext.btcPrice}
              address={walletContext.address}
            />
            <Receiver address={walletContext.address} />
          </div>
          <Transactions transactions={walletContext.transactions} />
        </div>
        <Toastr
          message="This wallet address is not BTC Wallet address!"
          showToast={walletContext.showToastr}
          setShowToast={walletContext.setShowToastr}
        />
      </main>
    </div>
  );
};

export default WalletManagement;
