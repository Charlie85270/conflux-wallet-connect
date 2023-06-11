import React from "react";
import { ConfluxWalletContextProps } from "./ConfluxWalletProvider.types";

export const ConfluxWalletContext = React.createContext<
  ConfluxWalletContextProps | undefined
>(undefined);
