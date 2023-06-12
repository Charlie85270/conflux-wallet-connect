import "react-toastify/dist/ReactToastify.css";

import * as MetamaskProvider from "@cfxjs/use-wallet-react/ethereum/MetaMask";
import * as FluentProvider from "@cfxjs/use-wallet-react/ethereum/Fluent";
import * as OKXProvider from "@cfxjs/use-wallet-react/ethereum/OKX/index";

import * as Toastify from "react-toastify";
import { ModalConnect, ConfluxWalletButton } from "./components/index";
import ConfluxWalletProvider from "./ConfluxWalletProvider";
import { ConfluxWalletContext } from "./ConfluxWalletProviderContext";
import { useConfluxWalletContext } from "./hook/index";
import {
  ConfluxProvider,
  Wallet,
  ConfluxWalletProviderProps,
  ConfluxWalletContextProps,
  ConfluxWalletProviderConfiguration,
} from "./ConfluxWalletProvider.types";
import Unit from "@cfxjs/use-wallet-react/utils/unit";

export {
  ConfluxWalletProvider,
  MetamaskProvider,
  FluentProvider,
  OKXProvider,
  ConfluxWalletButton,
  ModalConnect,
  ConfluxWalletContext,
  useConfluxWalletContext,
  Toastify,
  Unit,
};
export type {
  ConfluxProvider,
  ConfluxWalletProviderConfiguration,
  Wallet,
  ConfluxWalletProviderProps,
  ConfluxWalletContextProps,
};
