"use client";

import React, { useState, useEffect } from "react";
import { onMaskedId, onCopyWalletAddress } from "../utils/service";

type TransactionsProps = {
  transactions: any;
};

const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  return (
    <div className="">
      <div className="sm:flex gap-1 items-center justify-between">
        <div className="flex gap-1 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-6 w-6 rotate-45"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
            ></path>
          </svg>
          <p className="text-xl font-bold">Transactions</p>
        </div>
      </div>
      <div className="overflow-y-auto lg:h-[80vh] h-auto lg:pb-[50vh]">
        <div className="mt-4 grid grid-cols-4 gap-2 text-sm text-gray-400 px-6">
          <p>VALUE</p>
          <p>DATE</p>
          <p>TYPE</p>
          <p>TX</p>
        </div>
        <div className="mt-2 flex flex-col gap-2 text-sm px-4">
          {transactions.map((transaction: any, index: number) => (
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-sm bg-gray-600/10 rounded-md p-4"
              key={index}
            >
              <p className="">
                {transaction.amount}
                <span className="font-thin mx-1 text-xs">
                  {transaction.network}
                </span>
              </p>
              <p className="text-gray-400">{transaction.date}</p>
              <p className="text-primary font-medium">
                {transaction.type === "Deposit" ? "Received" : "Sent"}
              </p>
              <div className="flex text-gray-400 gap-4 items-center">
                {onMaskedId(transaction.txid)}
                <button
                  className="bg-slate-400 rounded-md p-1 hover:bg-slate-500"
                  onClick={() => onCopyWalletAddress(transaction.txid)}
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
