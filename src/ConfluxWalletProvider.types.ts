import {
  AddChainParameter as AddChainParameterOKX,
  Provider as ProviderOKX,
  TransactionParameters as TransactionParametersOKX,
  WatchAssetParams as WatchAssetParamsOKX,
} from "@cfxjs/use-wallet-react/ethereum/OKX/type";

import {
  AddChainParameter as AddChainParameterMetamask,
  Provider as ProviderMetamask,
  TransactionParameters as TransactionParametersMetamask,
  WatchAssetParams as WatchAssetParamsMetamask,
} from "@cfxjs/use-wallet-react/ethereum/MetaMask/type";
import {
  AddChainParameter as AddChainParameterFluent,
  Provider as ProviderFluent,
  TransactionParameters as TransactionParametersFluent,
  WatchAssetParams as WatchAssetParamsFluent,
} from "@cfxjs/use-wallet-react/ethereum/Fluent/type";

import useConfluxWalletConnect from "./hook/useConfluxWalletConnect";
import Unit from "@cfxjs/use-wallet-react/utils/unit";

export type ConfluxProvider = "metamask" | "fluent" | "okx";
export type Wallet = {
  /**
   * Status of the current active wallet
   */
  status:
    | "in-detecting"
    | "not-installed"
    | "not-active"
    | "in-activating"
    | "active"
    | "chain-error";
  /**
   * Account connected on the current active wallet
   */
  account: string | undefined;
  /**
   * chainId of the current active wallet
   */
  chainId: string | undefined;
  /**
   * Balance of the current active wallet
   */
  balance: Unit | undefined;
  /**
   * Method to connect the wallet
   */
  connect: () => Promise<string[]>;
  /**
   * Method to add a chain to the wallet
   */
  addChain: (
    params:
      | AddChainParameterOKX
      | AddChainParameterMetamask
      | AddChainParameterFluent
  ) => Promise<string>;
  completeDetect: () => Promise<void>;
  /**
   * Method to personal sign a message
   */
  personalSign: (message: string) => Promise<string>;
  /**
   * Method to check the cross network permission
   */
  requestCrossNetworkPermission: () => Promise<Record<string, string>>;
  /**
   * Get the provider
   */
  provider: ProviderOKX | ProviderMetamask | ProviderFluent | undefined;
  /**
   * Method to request permissions
   */
  requestPermissions: (
    params: Record<string, any>
  ) => Promise<Record<string, string>>;
  /**
   * Method to send a transaction
   */
  sendTransaction: (
    params: Omit<
      | TransactionParametersOKX
      | TransactionParametersMetamask
      | TransactionParametersFluent,
      "from"
    >
  ) => Promise<string>;
  /**
   * Method to set the cross network chain
   */
  setCrossNetworkChain: (chainId?: string | undefined) => void;
  /**
   * Method to swith the netowrk
   */
  switchChain: (chainId: string) => Promise<string>;
  /**
   * Listenner to track balance changes
   */
  trackBalanceChangeOnce: (callback: VoidFunction) => void;
  /**
   * Method to sign typed data
   */
  typedSign: (typedData: Record<string, any>) => Promise<string>;
  /**
   * Listenner to track assets
   */
  watchAsset: (
    param:
      | WatchAssetParamsFluent
      | WatchAssetParamsMetamask
      | WatchAssetParamsOKX
  ) => Promise<string>;
};

export interface ConfluxWalletProviderProps {
  children: React.ReactNode;
  /**
   * Configuration of the provider
   */
  configuration: ConfluxWalletProviderConfiguration;
}

export interface ConfluxWalletProviderConfiguration {
  /**
   * List of the provider to display on the conenct modal
   */
  providers: ConfluxProvider[];
  /**
   * Default active provider if multiple wallets are connected
   * (User can select active wallet on the modal)
   */
  defaultActiveWallet?: ConfluxProvider;
  /**
   * chainId to connect
   */
  chainId?: 1030 | 71;
  /**
   * Theme of the app
   * "dark" or "light"
   */
  theme?: "dark" | "light";
}

export interface ConfluxWalletContextProps
  extends ReturnType<typeof useConfluxWalletConnect> {
  /**
   * Current active provider (wallet)
   */
  activeProvider?: ConfluxProvider;
  /**
   * Set current active provider
   * @param provider the provider
   * @returns
   */
  setActiveProvider: (provider: ConfluxProvider) => void;
  /**
   * Set of the function and attributs to interact with the current wallet
   */
  wallet: Wallet;
  /**
   * Current chainId
   */
  chainId: number;
  /**
   * theme
   */
  theme?: "dark" | "light";
}
