import React, { useState } from "react";

import { ConfluxWalletProvider, FluentProvider } from "../index";
import { Toastify } from "../index";

const meta = {
  title: "Exemples/How to creare a 'Connect with fluent' button",
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      'In this exemple we will check if the fluent wallet is installed on the user desktop and display a "Connect with flient" button if the wallet is installed. Then, when the user connect his wallet we display informations about his account.',
    docs: {
      story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: "shown" }, // start with the source open
      source: {
        code: `
import { useConfluxWalletContext, FluentProvider, Toastify } from "conflux-wallet-connect";

  
const MyConnectFluentButtonComp = () => { 

    const { connect } = FluentProvider;
    const account = FluentProvider.useAccount();
    const status = FluentProvider.useStatus();

    let buttonLabel = "Connect with fluent";
    const connectFluent = () => {
      connect()
        .then(() => {
          Toastify.toast("Fluent connected !");
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
      buttonLabel = "Please install fluent extension.";
    }

    return (
      <button
        disabled={status === "not-installed"}
        className="px-2 py-1 border rounded"
        onClick={connectFluent}
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
    const { connect } = FluentProvider;
    const account = FluentProvider.useAccount();
    const status = FluentProvider.useStatus();

    let buttonLabel = "Connect with fluent";
    const connectFluent = () => {
      connect()
        .then(() => {
          Toastify.toast("Fluent connected !");
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
      buttonLabel = "Please install fluent extension.";
    }

    return (
      <button
        disabled={status === "not-installed"}
        className="px-2 py-1 border rounded"
        onClick={connectFluent}
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
