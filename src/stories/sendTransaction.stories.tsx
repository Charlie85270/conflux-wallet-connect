import React, { useCallback } from "react";

import ConfluxWalletProvider from "../ConfluxWalletProvider";
import { Toastify, Unit } from "../index";
import { useConfluxWalletContext } from "../hook";

const meta = {
  title: "Exemples/How to send a transaction",
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "To send a transaction, use the sendTransaction method from useConfluxWalletContext hook.",
    docs: {
      description: {
        component:
          "This will send a transaction with the active and connected provider or display a popup if no wallet are connected. To send a transaction with a specific one you can check others exemples (How to connect with....).",
      },
      story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: "shown" }, // start with the source open
      source: {
        code: `
import { ConfluxWalletProvider, Toastify , Unit, useConfluxWalletContext } from "conflux-wallet-connect";

  

const MyTransactionButtonComp = () => { 

    const { wallet, activeProvider } = useConfluxWalletContext();
    const { sendTransaction, account } = wallet;

    // Send 1 native token to self (connected account)
    const handleClickSendTransaction = useCallback(async () => {
      // For ts Type Guards. when status turn to 'active', account|chainId|balance must be exist.
      if (!account) {
        Toastify.toast("Account not connected");
      }

      try {
        const TxnHash = await sendTransaction({
          to: account,
          value: Unit.fromStandardUnit("1").toHexMinUnit(),
        });
        Toastify.toast(TxnHash);
      } catch (err) {
        Toastify.toast(JSON.stringify(err));
      }
    }, [account]);
    return (
      <div>
        <p>Current active and connected wallet : {activeProvider || "NONE"}</p>
        <br />
        <button
          className="border px-2 py-1 rounded"
          onClick={handleClickSendTransaction}
          type="button"
        >
          Self send 1 CFX
        </button>
      </div>
    ); 
  };`,
        type: "code",
        excludeDecorators: false,
      },
    },
  },
};
export default meta;

export const Primary = {
  render: () => {
    const { wallet, activeProvider } = useConfluxWalletContext();
    const { sendTransaction, account } = wallet;

    // Send 1 native token to self (connected account)
    const handleClickSendTransaction = useCallback(async () => {
      // For ts Type Guards. when status turn to 'active', account|chainId|balance must be exist.
      if (!account) {
        Toastify.toast("Account not connected");
      }

      try {
        const TxnHash = await sendTransaction({
          to: account,
          value: Unit.fromStandardUnit("1").toHexMinUnit(),
        });
        Toastify.toast(`Success : ${TxnHash}`);
      } catch (err) {
        Toastify.toast(`Error during the transaction: ${JSON.stringify(err)}`);
      }
    }, [account]);
    return (
      <div>
        <p>Current active and connected wallet : {activeProvider || "NONE"}</p>
        <br />
        <button
          className="border px-2 py-1 rounded"
          onClick={handleClickSendTransaction}
          type="button"
        >
          Self send 1 CFX
        </button>
      </div>
    );
  },
  decorators: [
    (Story: any) => {
      return (
        <ConfluxWalletProvider
          configuration={{
            providers: ["fluent", "metamask", "okx"],
            chainId: 71,
          }}
        >
          <Story />
        </ConfluxWalletProvider>
      );
    },
  ],
};
