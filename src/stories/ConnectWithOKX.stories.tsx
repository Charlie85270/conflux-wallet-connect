import React from "react";

import { ConfluxWalletProvider, OKXProvider } from "../index";
import { Toastify } from "../index";

const meta = {
  title: "Exemples/How to create a 'Connect with OKX' button",
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      'In this exemple we will check if the OKX extension is installed on the user desktop and display a "Connect with OKX" button if the wallet is installed. Then, when the user connect his wallet we display informations about his account.',
    docs: {
      story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: "shown" }, // start with the source open
      source: {
        code: `
import { useConfluxWalletContext, OKXProvider, Toastify } from "conflux-wallet-connect";

  
const MyConnectOKXButtonComp = () => { 

    const { connect } = OKXProvider;
    const account = OKXProvider.useAccount();
    const status = OKXProvider.useStatus();
    
    let buttonLabel = "Connect with OKX";
    const connectOKX = () => {
      connect()
        .then(() => {
          Toastify.toast("OKX connected !");
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
      buttonLabel = "Please install OKX extension.";
    }

    return (
      <button
        disabled={status === "not-installed"}
        className="px-2 py-1 border rounded"
        onClick={connectOKX}
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
    const { connect } = OKXProvider;
    const account = OKXProvider.useAccount();
    const status = OKXProvider.useStatus();

    let buttonLabel = "Connect with OKX";
    const connectOKX = () => {
      connect()
        .then(() => {
          Toastify.toast("OKX connected !");
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
      buttonLabel = "Please install OKX extension.";
    }

    return (
      <button
        disabled={status === "not-installed"}
        className="px-2 py-1 border rounded"
        onClick={connectOKX}
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
