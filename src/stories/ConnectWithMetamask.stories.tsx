import React, { useState } from "react";

import { ConfluxWalletProvider, MetamaskProvider } from "../index";
import { Toastify } from "../index";

const meta = {
  title: "Exemples/How to creare a 'Connect with Metamask' button",
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      'In this exemple we will check if the Metamask extension is installed on the user desktop and display a "Connect with Metamask" button if the wallet is installed. Then, when the user connect his wallet we display informations about his account.',
    docs: {
      story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: "shown" }, // start with the source open
      source: {
        code: `
import { useConfluxWalletContext, MetamaskProvider, Toastify } from "conflux-wallet-connect";

  
const MyConnectMetamasktButtonComp = () => { 

    const { connect } = MetamaskProvider;
    const account = MetamaskProvider.useAccount();
    const status = MetamaskProvider.useStatus();
    
    let buttonLabel = "Connect with Metamask";
    const connectMM = () => {
      connect()
        .then(() => {
          Toastify.toast("Metamask connected !");
        })
        .catch(err => {
          Toastify.toast(err);
        });
    };
    if (status === "active") {
      buttonLabel =
        account?.slice(0, 8) + "..." + account?.slice(-4) + " connected";
    }
    if (status === "not-installed") {
      buttonLabel = "Please install Metamask extension.";
    }

    return (
      <button
        disabled={status === "not-installed"}
        className="px-2 py-1 border rounded"
        onClick={connectMM}
        type="button"
      >
        {buttonLabel}
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
    const { connect } = MetamaskProvider;
    const account = MetamaskProvider.useAccount();
    const status = MetamaskProvider.useStatus();

    let buttonLabel = "Connect with Metask";
    const connectMM = () => {
      connect()
        .then(() => {
          Toastify.toast("Metamask connected !");
        })
        .catch(err => {
          Toastify.toast(err);
        });
    };
    if (status === "active") {
      buttonLabel =
        account?.slice(0, 8) + "..." + account?.slice(-4) + " connected";
    }
    if (status === "not-installed") {
      buttonLabel = "Please install Metamask extension.";
    }

    return (
      <button
        disabled={status === "not-installed"}
        className="px-2 py-1 border rounded"
        onClick={connectMM}
        type="button"
      >
        {buttonLabel}
      </button>
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
