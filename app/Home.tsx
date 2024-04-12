"use client";
import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

export default function Home() {
  const [reference, setReference] = useState("");
  const [isModalState, setIsModalState] = useState(0);
  const router = useRouter();

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

  const greetingSentences1 = "Welcome to our site your ultimate destination.";
  const greetingSentences2 =
    "Here, your convenience and security are our top priorities, ensuring your financial management experience is unmatched. Join us on this journey to redefine the way you interact with your money, making it simpler, faster, and safer.";

  return (
    <div className="flex h-screen w-screen bg-proBack justify-center">
      <div className="flex flex-col max-w-[1400px]">
        <div className="flex flex-row justify-between items-center h-heightHead w-full">
          <div className="flex items-center">
            <img
              className="h-[45px] max-w-full"
              src="/images/dashboard-logo.png"
            />
            <div className="text-2xl font-bold text-proText ml-3">
              Wallet Management
            </div>
          </div>
          <div className="flex items-center" />
        </div>
      </div>
    </div>
  );
}
