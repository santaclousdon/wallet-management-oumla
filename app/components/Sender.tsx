"use client";

import React, { useState, useEffect } from "react";
import { sendTransactionAPI } from "../utils/service";
import { useWalletContext } from "../context/WalletContext";
import Toastr from "./Toastr";
import { validate } from "bitcoin-address-validation";

type SenderProps = {
  btcPrice: string | null;
  address: any;
};

const Sender: React.FC<SenderProps> = ({ btcPrice, address }) => {
  const walletContext = useWalletContext();

  useEffect(() => {
    const _ref = localStorage.getItem("reference");
    if (!_ref || !address) {
      return;
    }
    walletContext.setReference(_ref as string);
    walletContext.setFromAddress(address.address);
  }, [address]);

  const onSendTransaction = async () => {
    const btcValidate = validate(walletContext.toAddress!);
    console.log("btcValidate", btcValidate);
    if (!btcValidate) {
      walletContext.setToastrState("sendError");
      walletContext.setShowToastr(false); // Reset the toastr to hide, allowing re-trigger
      setTimeout(() => {
        walletContext.setShowToastr(true);
      }, 100); // Short delay before showing it again
    } else {
      if (!walletContext.reference) return;
      console.log("From Address", address.address);
      console.log("To Address", walletContext.toAddress);
      const sendTransactionResponse = await sendTransactionAPI(
        walletContext.reference,
        walletContext.fromAddress!,
        walletContext.toAddress!,
        walletContext.amount!
      );
      console.log("SendTransactionResponse", sendTransactionResponse);
    }
  };

  return (
    <div className="sm:w-1/2 p-6 space-y-6 overflow-hidden rounded-lg">
      <div className="flex gap-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="h-8 w-8 rotate-45"
        >
          <path
            fillRule="evenodd"
            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
        <p className="text-xl font-bold">Send</p>
      </div>
      <div className="flex items-center gap-2 bg-sky-500 rounded-xl p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="h-6 w-6 text-white"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
        <input
          type="text"
          placeholder="Search, public address (0x), or ENS"
          aria-label="Search by public address or ENS"
          className="flex-1 bg-transparent outline-none placeholder:text-gray-100"
          onChange={(e) => {
            walletContext.setToAddress(e.target.value);
          }}
        />
      </div>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <input
            type="number"
            min="0"
            placeholder="Amount"
            className="flex-1 bg-transparent outline-none pr-2 w-full"
            value={walletContext.amount === null ? null : walletContext.amount}
            onChange={(e) => {
              const value =
                e.target.value === "" ? null : Number(e.target.value);
              walletContext.setAmount(value!);
            }}
          />
          <div className="flex gap-3 items-center text-xs">
            <div className="flex items-center gap-1">
              <div
                className="p-2 cursor-pointer rounded-md hover:bg-primary hover:border-primary"
                onClick={() => {
                  walletContext.setAmount(
                    (address === undefined ? 0 : address.balance) / 4
                  );
                }}
              >
                1/4
              </div>
              <div
                className="p-2 cursor-pointer rounded-md hover:bg-primary hover:border-primary"
                onClick={() => {
                  walletContext.setAmount(
                    (address === undefined ? 0 : address.balance) / 2
                  );
                }}
              >
                Half
              </div>
              <div
                className="p-2 cursor-pointer rounded-md hover:bg-primary hover:border-primary"
                onClick={() => {
                  walletContext.setAmount(
                    address === undefined ? 0 : address.balance
                  );
                }}
              >
                All
              </div>
            </div>
            <p className="text-base">BTC</p>
          </div>
        </div>
        <hr className=" border-primary rounded-xl" />
        <div className="flex items-center justify-between">
          <p>{walletContext.amount * Number(btcPrice)}</p>
          <p>USD</p>
        </div>
      </div>
      <div className="flex items-center justify-around">
        <button
          className="p-3 px-12 flex text-center justify-center bg-sky-400 hover:-translate-y-2 transition-all rounded-xl"
          onClick={onSendTransaction}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Sender;
