"use client";

import React, { useState, useEffect } from "react";
import { useWalletContext } from "../context/WalletContext";
import { onMaskedId, onCopyWalletAddress } from "../utils/service";

type ReceiverProps = {
  address: any;
};

const Receiver: React.FC<ReceiverProps> = ({ address }) => {
  const walletContext = useWalletContext();
  useEffect(() => {
    if (address) {
      const _maskedAddress = onMaskedId(address.address);
      walletContext.setMaskedAddress(_maskedAddress);
    }
  }, [address]);

  const handleShowToastr = () => {
    walletContext.setToastrState("copied");
    walletContext.setShowToastr(false); // Reset the toastr to hide, allowing re-trigger
    setTimeout(() => {
      walletContext.setShowToastr(true);
    }, 100); // Short delay before showing it again
  };

  return (
    <div className="sm:w-1/2 p-6 space-y-8">
      <div className="flex gap-1 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          aria-hidden="true"
          className="h-8 w-8 rotate-45"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 13l-5 5m0 0l-5-5m5 5V6"
          ></path>
        </svg>
        <p className="text-xl font-bold">Receive</p>
        <button
          className="flex px-6 items-start text-xl font-bold gap-2 hover:text-slate-500"
          onClick={() => {
            localStorage.removeItem("reference");
            walletContext.setReference("");
          }}
        >
          Log out
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </button>
      </div>
      <div className="space-y-1">
        <p className=" font-light text-gray-400">Address:</p>
        <div className="flex items-center gap-2" onClick={handleShowToastr}>
          <button
            className="bg-sky-500 rounded-md p-1 hover:bg-[#0a7aad]"
            onClick={() => onCopyWalletAddress(address.address)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="h-6 w-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              ></path>
            </svg>
          </button>
          <div className="flex-1 flex items-center">
            <p className="" id="walletAddressDiv">
              {walletContext.maskedAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receiver;
