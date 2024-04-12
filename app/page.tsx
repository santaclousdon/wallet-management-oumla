"use client";

import Modal from "./components/Modal";
import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import Toastr from "./components/Toastr";
import { useWalletContext } from "./context/WalletContext";

export default function Home() {
  const [reference, setReference] = useState("");
  const [isModalState, setIsModalState] = useState(0);
  const router = useRouter();
  const walletContext = useWalletContext();

  useEffect(() => {
    const storedUUID = localStorage.getItem("reference");
    if (localStorage.getItem("reference")) {
      setReference(storedUUID!);
      router.push("/walletManagement");
    }
  }, []);

  const closeModal = () => setIsModalState(0);
  const openModal = (index: number) => setIsModalState(index);

  const onCreateUUID = async (index: number) => {
    const newUUID = uuidv4();
    // Store the UUID in local storage
    localStorage.setItem("reference", newUUID);
    try {
      const profileResponse = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "User",
          reference: newUUID,
        }),
      });

      if (!profileResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const profile = await profileResponse.json();
      setIsModalState(index);
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  };

  const greetingSentences1 = "Welcome to our site your destination.";
  const greetingSentences2 =
    "Here, your convenience and security are our top priorities, ensuring your financial management experience is unmatched. Join us on this journey to redefine the way you interact with your money, making it simpler, faster, and safer.";

  return (
    <div className="flex h-screen w-screen bg-proBack justify-center">
      <div className="flex flex-col w-full items-center justify-between">
        <div className="flex justify-center h-heightHead w-full border-b border-[#ebebeb]">
          <div className="flex flex-row justify-between items-center h-heightHead w-full border-b border-[#ebebeb;] max-w-[1400px]">
            <div className="flex items-center">
              <img
                className="h-[45px] max-w-full"
                src="/images/dashboard-logo.png"
                alt="logo"
              />
              <div className="text-2xl font-black text-proText ml-3">
                Wallet Management
              </div>
            </div>
            <div className="flex items-center">
              <div
                className="bg-[#ffc107] px-5 py-2 rounded-full text-base font-medium cursor-pointer"
                onClick={() => onCreateUUID(1)}
              >
                Creat New Wallet
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center h-[calc(100%-272px)] max-w-[1400px]">
          <div className="flex flex-col gap-6 flex-1">
            <div className="text-6xl text-proText font-bold">
              {greetingSentences1}{" "}
            </div>{" "}
            <div className="text-xl text-proTextLight font-normal">
              {greetingSentences2}{" "}
            </div>
            <div className="flex justify-start">
              <div
                className="flex bg-[#0d6efd] px-7 py-3 text-white font-semibold rounded-full cursor-pointer hover:bg-[#0a53be] gap-2"
                onClick={() => onCreateUUID(1)}
              >
                Create New
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
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
              <div
                className="flex px-7 py-3 text-[#212529] font-semibold rounded-full cursor-pointer hover:text-[#0d6efd] gap-2"
                onClick={() => openModal(2)}
              >
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
                    d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                  />
                </svg>
                Import Now
              </div>
            </div>
          </div>
          <img
            className="h-[435px] max-w-full flex-1"
            src="/images/back.png"
            alt="back"
          />
        </div>
        <div className="flex justify-center w-full relative ">
          <img
            className="transform rotate-180 absolute bottom-0 left-0"
            src="/images/footer.png"
            alt="footer"
          />
          <div className="flex justify-center items-center w-full max-w-[1400px] h-[192px]">
            <div className="font-normal text-base text-proText mr-20 mt-10">
              2024 © All rights reserved by World
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalState} onClose={closeModal} />
      <Toastr
        message="This Importing UUID is not correct"
        showToast={walletContext.showToastr}
        setShowToast={walletContext.setShowToastr}
      />
    </div>
  );
}
