import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ModalConnect from "./ModalConnect";
import ConfluxWalletProvider from "../../ConfluxWalletProvider";
import { ConfluxWalletProviderConfiguration } from "../../ConfluxWalletProvider.types";

const meta: Meta<typeof ModalConnect> = {
  component: ModalConnect,
  title: "Components/ModalConnect",
  argTypes: {
    providers: { control: "check", options: ["fluent", "metamask", "okx"] },
  },
};
export default meta;

type Story = StoryObj<typeof ModalConnect>;

export const Primary: Story = {
  args: {
    isOpen: true,

    providers: ["fluent", "metamask", "okx"],
  },

  decorators: [
    Story => {
      const configuration: ConfluxWalletProviderConfiguration = {
        chainId: 71,
        providers: ["fluent", "metamask", "okx"],
      };
      return (
        <ConfluxWalletProvider configuration={configuration}>
          <Story />
        </ConfluxWalletProvider>
      );
    },
  ],
};

export const DarkMode: Story = {
  args: {
    isOpen: true,

    providers: ["fluent", "metamask", "okx"],
  },

  decorators: [
    Story => {
      const configuration: ConfluxWalletProviderConfiguration = {
        chainId: 71,
        theme: "dark",
        providers: ["fluent", "metamask", "okx"],
      };
      return (
        <ConfluxWalletProvider configuration={configuration}>
          <Story />
        </ConfluxWalletProvider>
      );
    },
  ],
};
