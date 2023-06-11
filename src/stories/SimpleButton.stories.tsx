import React from "react";

import ConfluxWalletProvider from "../ConfluxWalletProvider";

import { useConfluxWalletContext } from "../hook";

const meta = {
  title: "Exemples/Open the modal with your own button",
  tags: ["autodocs"],
  parameters: {
    componentSubtitle:
      "If you want use your own button or components to open the modal, you just need to call the openModal function from the useConfluxWalletContext hook.",
    docs: {
      story: { inline: true }, // render the story in an iframe
      canvas: { sourceState: "shown" }, // start with the source open
      source: {
        code: `const { openModal } = useConfluxWalletContext();
    return (
      <button onClick={openModal} type="button">
        Connect
      </button>
    );`,
        type: "code",
        excludeDecorators: false,
      },
    },
  },
};
export default meta;

export const Primary = {
  render: () => {
    const { openModal } = useConfluxWalletContext();
    return (
      <button
        className="border px-2 py-1 rounded"
        onClick={openModal}
        type="button"
      >
        Connect
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
