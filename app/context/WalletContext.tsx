"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface IWalletContextProps {
  btcPrice: string | null;
  setBtcPrice: (_: string | null) => void;
  address: string | undefined;
  setAddress: (_: string | undefined) => void;
  transactions: any | undefined;
  setTransactions: (_: any | undefined) => void;
  reference: string | undefined;
  setReference: (_: string | undefined) => void;
  maskedAddress: string | undefined;
  setMaskedAddress: (_: string | undefined) => void;
  importUUID: string | undefined;
  setImportUUID: (_: string | undefined) => void;
  amount: Number | any;
  setAmount: (_: Number | any) => void;
  toAddress: string | undefined;
  setToAddress: (_: string | undefined) => void;
  fromAddress: string | undefined;
  setFromAddress: (_: string | undefined) => void;
  showToastr: boolean;
  setShowToastr: (_: boolean) => void;
  toastrState: string;
  setToastrState: (_: string) => void;
}

const defaultValue: IWalletContextProps = {
  btcPrice: null,
  setBtcPrice: (_: string | null) => {},
  address: "",
  setAddress: (_: string | undefined) => {},
  transactions: [],
  setTransactions: (_: any | undefined) => {},
  reference: "",
  setReference: (_: string | undefined) => {},
  maskedAddress: "",
  setMaskedAddress: (_: string | undefined) => {},
  importUUID: "",
  setImportUUID: (_: string | undefined) => {},
  amount: 0,
  setAmount: (_: Number | null) => {},
  toAddress: "",
  setToAddress: (_: string | undefined) => {},
  fromAddress: "",
  setFromAddress: (_: string | undefined) => {},
  showToastr: false,
  setShowToastr: (_: boolean) => {},
  toastrState: "",
  setToastrState: (_: string) => {},
};

const WalletContext = createContext<IWalletContextProps>(defaultValue);

interface IWalletWrapperProps {
  children: React.ReactNode;
}

export function WalletWrapper({ children }: IWalletWrapperProps) {
  const [btcPrice, setBtcPrice] = useState<string | null>(null);
  const [address, setAddress] = useState<string | undefined>("");
  const [transactions, setTransactions] = useState<any | undefined>([]);
  const [reference, setReference] = useState<string | undefined>("");
  const [importUUID, setImportUUID] = useState<string | undefined>("");
  const [maskedAddress, setMaskedAddress] = useState<string | undefined>("");
  const [amount, setAmount] = useState<Number | any>(0);
  const [toAddress, setToAddress] = useState<string | undefined>("");
  const [showToastr, setShowToastr] = useState<boolean>(false);
  const [fromAddress, setFromAddress] = useState<string | undefined>("");
  const [toastrState, setToastrState] = useState<string>("");

  const sharedState = {
    btcPrice: btcPrice,
    setBtcPrice: setBtcPrice,
    address: address,
    setAddress: setAddress,
    transactions: transactions,
    setTransactions: setTransactions,
    reference: reference,
    setReference: setReference,
    importUUID: importUUID,
    setImportUUID: setImportUUID,
    maskedAddress: maskedAddress,
    setMaskedAddress: setMaskedAddress,
    amount: amount,
    setAmount: setAmount,
    toAddress: toAddress,
    setToAddress: setToAddress,
    fromAddress: fromAddress,
    setFromAddress: setFromAddress,
    showToastr: showToastr,
    setShowToastr: setShowToastr,
    toastrState: toastrState,
    setToastrState: setToastrState,
  };

  return (
    <WalletContext.Provider value={sharedState}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletContext() {
  return useContext(WalletContext);
}
