export const getAddressAPI = async (reference: string) => {
  const addressResponse = await fetch("/api/address", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "User",
      reference: reference,
    }),
  });
  const address = await addressResponse.json();
  return  address.data.addresses[0];
};

export const fetchBTCPriceAPI = async () => {
  try {
    const response = await fetch("/api/btcPrice");
    if (!response.ok) {
      throw new Error("Failed to fetch.");
    }
    const data = await response.json();
    // setBtcPrice(data.btcPrice);
    return data.btcPrice
  } catch (error) {
    console.error("Error fetching BTC rate:", error);
    // setBtcPrice("Error fetching price");
    return "Error fetching price"
  }
};

export const getAllTransactionsAPI = async (reference: string) => {
  const allTransactionResponse = await fetch("/api/getAllTransactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "User",
      reference: reference,
    }),
  });
  const allTransactions = await allTransactionResponse.json();
  return allTransactions.data.transactions;
};

export const sendTransactionAPI = async (reference: string, fromAddress: string, toAddress: string, amount: Number) => {
  const sendTransactionResponse = await fetch("/api/sendTransaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "User",
      reference: reference,
      from: fromAddress,
      to: toAddress,
      amount: amount,
    }),
  });
  const response = await sendTransactionResponse.json();
  return response;
}

export const onMaskedId = (id: string) => {
  const firstFive = id === undefined ? "" : id.substring(0, 5);
  const lastFive = id === undefined ? "" : id.substring(id.length - 5);
  const maskedAddress = `${firstFive}...${lastFive}`;
  return maskedAddress;
};

export const onCopyWalletAddress = (copyAddress: string) => {
  const walletAddressInput = copyAddress;

  navigator.clipboard
    .writeText(walletAddressInput)
    .then(() => {
      console.log("Text copied to clipboard: " + walletAddressInput);
      // window.alert("Copied");
    })
    .catch((error) => {
      console.error("Could not copy text to clipboard: ", error);
    });
};  