import React from "react";

type WalletProps = {
  btcPrice: string | null;
  address: any;
};

const WalletBalance: React.FC<WalletProps> = ({ btcPrice, address }) => {
  return (
    <div className="flex-1 flex flex-col p-4 space-y-8 justify-between">
      <div className="flex lg:grid justify-between items-center lg:space-y-8">
        <div className="flex items-center">
          <p className="-rotate-90">Balance</p>
          <div>
            <p className="font-thin">
              {address === undefined ? "Loading..." : address.network}
            </p>
            <div className="flex items-center gap-1">
              <p className="font-bold text-2xl">
                {address === undefined ? "Loading..." : address.balance}
              </p>
            </div>
            <p className="text-primary">
              {address === undefined
                ? "Loading..."
                : address.balance * Number(btcPrice)}{" "}
              $
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletBalance;
