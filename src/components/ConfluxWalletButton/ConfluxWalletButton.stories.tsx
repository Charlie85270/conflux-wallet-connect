import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ConfluxWalletButton from "./ConfluxWalletButton";
import ConfluxWalletProvider from "../../ConfluxWalletProvider";

const meta: Meta<typeof ConfluxWalletButton> = {
  component: ConfluxWalletButton,
  title: "Components/WalletButton",
  tags: ["autodocs"],
  parameters: {
    docs: {
      type: "auto",
      excludeDecorators: false,
      source: {
        code: `
import { ConfluxWalletButton } from "conflux-wallet-connect";

const MyComponent = () => {

  const { openModal } = useConfluxWalletContext();

  return <ConfluxWalletButton onClick={openModal} />;
  
};
`,
        type: "code",
        excludeDecorators: false,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["small", "medium", "large"] },
  },
};
export default meta;

type Story = StoryObj<typeof ConfluxWalletButton>;

export const Primary: Story = {
  args: {
    disabled: false,
    size: "medium",
  },

  decorators: [
    Story => {
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

export const DarkMode: Story = {
  args: {
    disabled: false,
    size: "medium",
  },

  decorators: [
    Story => {
      return (
        <ConfluxWalletProvider
          configuration={{
            theme: "dark",
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
