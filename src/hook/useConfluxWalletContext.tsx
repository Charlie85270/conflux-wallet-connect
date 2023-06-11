import React from "react";
import type { ConfluxWalletContextProps } from "../ConfluxWalletProvider.types";
import { ConfluxWalletContext } from "../ConfluxWalletProviderContext";

/**
 * Hook to use the Conflux wallet context and interact with wallets providers
 * Should be wrap with <ConfluxWalletProvider />
 * @returns @type ConfluxWalletContext
 */
const useConfluxWalletContext = (): ConfluxWalletContextProps => {
  const context = React.useContext(ConfluxWalletContext);

  if (!context) {
    throw new Error(
      "useConfluxWalletContext must be used within a ConfluxWalletProvider"
    );
  }

  return context;
};

export default useConfluxWalletContext;
