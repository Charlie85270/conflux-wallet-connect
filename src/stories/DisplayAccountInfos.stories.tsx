import React from "react";

import ConfluxWalletProvider from "../ConfluxWalletProvider";

import { useConfluxWalletContext } from "../hook";
import { ConfluxWalletButton } from "../components";

const meta = {
  title: "Exemples/How to display user balance and adress",
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "In this exemple we display the active wallet .",
    docs: {
      story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: "shown" }, // start with the source open
      source: {
        code: `
import { useConfluxWalletContext } from "conflux-wallet-connect";

  
const MyAccountInfoComp = () => {
  
    const { wallet, activeProvider, openModal } = useConfluxWalletContext();
    const { chainId, account, balance } = wallet;

    return (
      <div>
        {activeProvider ? (
          <p>The active and connect wallet is : {activeProvider}</p>
        ) : (
          <div>
            <p>No wallet connected</p>
            <ConfluxWalletButton onClick={openModal} />
          </div>
        )}
        {account && (
          <p>
            The balance of the address : <b>{account}</b> on chainId{" "}
            <b>{chainId} </b>is <b>{balance?.toDecimalStandardUnit()}</b>
          </p>
        )}
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
    const { wallet, activeProvider, openModal } = useConfluxWalletContext();
    const { chainId, account, balance } = wallet;

    return (
      <div>
        {activeProvider ? (
          <p>The active and connect wallet is : {activeProvider}</p>
        ) : (
          <div>
            <p>No wallet connected</p>
            <ConfluxWalletButton onClick={openModal} />
          </div>
        )}
        {account && (
          <p>
            The balance of the address : <b>{account}</b> on chainId{" "}
            <b>{chainId} </b>is <b>{balance?.toDecimalStandardUnit()}</b>
          </p>
        )}
      </div>
    );
  },
  decorators: [
    (Story: any) => {
      return (
        <ConfluxWalletProvider
          configuration={{
            chainId: 71,
            providers: ["fluent", "metamask", "okx"],
          }}
        >
          <Story />
        </ConfluxWalletProvider>
      );
    },
  ],
};
