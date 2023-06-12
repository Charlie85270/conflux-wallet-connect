import React, { useCallback } from "react";

import ConfluxWalletProvider from "../ConfluxWalletProvider";
import { Toastify } from "../index";
import { useConfluxWalletContext } from "../hook";

const meta = {
  title: "Exemples/How to sign a message",
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "To sign a message, use the personalSign method from useConfluxWalletContext hook.",
    docs: {
      description: {
        component:
          "This will sign a message with the active wallet or display a popup if no wallet are connected. To send a transaction with a specific one you can check others exemples (How to connect with....).",
      },
      story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: "shown" }, // start with the source open
      source: {
        code: `
import { ConfluxWalletProvider, Toastify , Unit, useConfluxWalletContext } from "conflux-wallet-connect";

  
const MySignMessageButtonComp = () => { 

    const { wallet } = useConfluxWalletContext();
    const { personalSign, account } = wallet;

    // Sign a message (connected account)
    const handleSign = useCallback(async () => {
      // For ts Type Guards. when status turn to 'active', account|chainId|balance must be exist.
      if (!account) {
        Toastify.toast("Account not connected");
      }

      try {
        const TxnHash = await personalSign('Hello from conflux wallet connect');
        Toastify.toast(TxnHash);
      } catch (err) {
        Toastify.toast(JSON.stringify(err));
      }
    }, [account]);
    return (
      <button
        className="px-2 py-1 border rounded"
        onClick={handleSign}
        type="button"
      >
         Sign a message
      </button>
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
    const { wallet } = useConfluxWalletContext();
    const { personalSign, account } = wallet;

    // Sign a message (connected account)
    const handleSign = useCallback(async () => {
      // For ts Type Guards. when status turn to 'active', account|chainId|balance must be exist.
      if (!account) {
        Toastify.toast("Account not connected");
      }

      try {
        const TxnHash = await personalSign(
          "Hello from conflux wallet connect !"
        );
        Toastify.toast(`Success : ${TxnHash}`);
      } catch (err) {
        Toastify.toast(`Error during the transaction: ${JSON.stringify(err)}`);
      }
    }, [account]);
    return (
      <button
        className="px-2 py-1 border rounded"
        onClick={handleSign}
        type="button"
      >
        Sign a message
      </button>
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
