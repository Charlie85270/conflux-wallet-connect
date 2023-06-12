import React, { FC, useEffect, useState } from "react";
import useConfluxWalletConnect from "./hook/useConfluxWalletConnect";
import ModalConnect from "./components/Modal/ModalConnect";

//OKX provider
import {
  useStatus as useStatusOKX,
  useAccount as useAccountOKX,
  useChainId as useChainIdOKX,
  useBalance as useBalanceOKX,
  connect as connectOKX,
  addChain as addChainOKX,
  completeDetect as completeDetectOKX,
  personalSign as personalSignOKX,
  requestCrossNetworkPermission as requestCrossNetworkPermissionOKX,
  provider as providerOKX,
  requestPermissions as requestPermissionsOKX,
  sendTransaction as sendTransactionOKX,
  setCrossNetworkChain as setCrossNetworkChainOKX,
  switchChain as switchChainOKX,
  trackBalanceChangeOnce as trackBalanceChangeOnceOKX,
  typedSign as typedSignOKX,
  watchAsset as watchAssetOKX,
} from "@cfxjs/use-wallet-react/ethereum/OKX";

// Metamask provider
import {
  useStatus as useStatusMetamask,
  useAccount as useAccountMetamask,
  useChainId as useChainIdMetamask,
  useBalance as useBalanceMetamask,
  connect as connectMetamask,
  addChain as addChainMetamask,
  completeDetect as completeDetectMetamask,
  personalSign as personalSignMetamask,
  requestCrossNetworkPermission as requestCrossNetworkPermissionMetamask,
  provider as providerMetamask,
  requestPermissions as requestPermissionsMetamask,
  sendTransaction as sendTransactionMetamask,
  setCrossNetworkChain as setCrossNetworkChainMetamask,
  switchChain as switchChainMetamask,
  trackBalanceChangeOnce as trackBalanceChangeOnceMetamask,
  typedSign as typedSignMetamask,
  watchAsset as watchAssetMetamask,
} from "@cfxjs/use-wallet-react/ethereum/MetaMask";

// Fluent provider
import {
  useStatus as useStatusFluent,
  useAccount as useAccountFluent,
  useChainId as useChainIdFluent,
  useBalance as useBalanceFluent,
  connect as connectFluent,
  addChain as addChainFluent,
  completeDetect as completeDetectFluent,
  personalSign as personalSignFluent,
  requestCrossNetworkPermission as requestCrossNetworkPermissionFluent,
  provider as providerFluent,
  requestPermissions as requestPermissionsFluent,
  sendTransaction as sendTransactionFluent,
  setCrossNetworkChain as setCrossNetworkChainFluent,
  switchChain as switchChainFluent,
  trackBalanceChangeOnce as trackBalanceChangeOnceFluent,
  typedSign as typedSignFluent,
  watchAsset as watchAssetFluent,
} from "@cfxjs/use-wallet-react/ethereum/Fluent";
import {
  ConfluxProvider,
  ConfluxWalletProviderProps,
  Wallet,
} from "./ConfluxWalletProvider.types";
import { ToastContainer } from "react-toastify";
import { ConfluxWalletContext } from "./ConfluxWalletProviderContext";

const ConfluxWalletProvider: FC<ConfluxWalletProviderProps> = ({
  children,
  configuration: {
    theme = "light",
    providers,
    defaultActiveWallet = "metamask",
    chainId = 1030,
  },
}) => {
  const statusOKX = useStatusOKX();
  const statusMetamask = useStatusMetamask();
  const statusFluent = useStatusFluent();

  const chainIdFluent = useChainIdFluent();
  const chainIdMetamask = useChainIdMetamask();
  const chainIdOKX = useChainIdOKX();

  const fluentWallet = {
    status: statusFluent,
    account: useAccountFluent(),
    chainId: chainIdFluent,
    balance: useBalanceFluent(),
    connect: connectFluent,
    addChain: addChainFluent,
    completeDetect: completeDetectFluent,
    personalSign: personalSignFluent,
    requestCrossNetworkPermission: requestCrossNetworkPermissionFluent,
    provider: providerFluent,
    requestPermissions: requestPermissionsFluent,
    sendTransaction: sendTransactionFluent,
    setCrossNetworkChain: setCrossNetworkChainFluent,
    switchChain: switchChainFluent,
    trackBalanceChangeOnce: trackBalanceChangeOnceFluent,
    typedSign: typedSignFluent,
    watchAsset: watchAssetFluent,
  };
  const metamaskWallet = {
    status: statusMetamask,
    account: useAccountMetamask(),

    chainId: chainIdMetamask,
    balance: useBalanceMetamask(),
    connect: connectMetamask,
    addChain: addChainMetamask,
    completeDetect: completeDetectMetamask,
    personalSign: personalSignMetamask,
    requestCrossNetworkPermission: requestCrossNetworkPermissionMetamask,
    provider: providerMetamask,
    requestPermissions: requestPermissionsMetamask,
    sendTransaction: sendTransactionMetamask,
    setCrossNetworkChain: setCrossNetworkChainMetamask,
    switchChain: switchChainMetamask,
    trackBalanceChangeOnce: trackBalanceChangeOnceMetamask,
    typedSign: typedSignMetamask,
    watchAsset: watchAssetMetamask,
  };
  const okxWallet = {
    status: statusOKX,
    account: useAccountOKX(),
    chainId: chainIdOKX,
    balance: useBalanceOKX(),
    connect: connectOKX,
    addChain: addChainOKX,
    completeDetect: completeDetectOKX,
    personalSign: personalSignOKX,
    requestCrossNetworkPermission: requestCrossNetworkPermissionOKX,
    provider: providerOKX,
    requestPermissions: requestPermissionsOKX,
    sendTransaction: sendTransactionOKX,
    setCrossNetworkChain: setCrossNetworkChainOKX,
    switchChain: switchChainOKX,
    trackBalanceChangeOnce: trackBalanceChangeOnceOKX,
    typedSign: typedSignOKX,
    watchAsset: watchAssetOKX,
  };
  const getWalletFromProvider = (provider: ConfluxProvider) => {
    switch (provider) {
      case "metamask":
        return metamaskWallet;
      case "okx":
        return okxWallet;
      case "fluent":
        return fluentWallet;
    }
  };

  /**
   * Set the default active wallet if multiple wallet are connected
   */
  const defaultWallet =
    statusMetamask === "active"
      ? metamaskWallet
      : statusFluent === "active"
      ? fluentWallet
      : statusOKX === "active"
      ? okxWallet
      : getWalletFromProvider(defaultActiveWallet);

  const defaultActiveProvider =
    statusMetamask === "active"
      ? "metamask"
      : statusFluent === "active"
      ? "fluent"
      : statusOKX === "active"
      ? "okx"
      : undefined;

  const [wallet, setWallet] = useState<Wallet>(defaultWallet);
  const [activeProvider, setActiveProvider] = useState<
    ConfluxProvider | undefined
  >(defaultActiveProvider);

  useEffect(() => {
    if (activeProvider === "fluent") {
      setWallet(fluentWallet);
    }
    if (activeProvider === "metamask") {
      setWallet(metamaskWallet);
    }
    if (activeProvider === "okx") {
      setWallet(okxWallet);
    }
  }, [activeProvider, chainIdFluent, chainIdMetamask, chainIdOKX]);

  useEffect(() => {
    if (!activeProvider) {
      if (statusMetamask === "active") {
        setActiveProvider("metamask");
      } else if (statusFluent === "active") {
        setActiveProvider("fluent");
      } else if (statusOKX === "active") {
        setActiveProvider("okx");
      }
    }
  }, [activeProvider, chainIdFluent, chainIdMetamask, chainIdOKX]);

  useEffect(() => {
    // Fluent become inactive
    if (statusFluent === "not-active" && activeProvider === "fluent") {
      if (statusMetamask === "active") {
        setActiveProvider("metamask");
      }
      if (statusOKX === "active") {
        setActiveProvider("okx");
      }
    }
    // Metamask become inactive
    if (statusMetamask === "not-active" && activeProvider === "metamask") {
      if (statusFluent === "active") {
        setActiveProvider("fluent");
      }
      if (statusOKX === "active") {
        setActiveProvider("okx");
      }
    }
    // OKX become inactive
    if (statusOKX === "not-active" && activeProvider === "okx") {
      if (statusMetamask === "active") {
        setActiveProvider("metamask");
      }
      if (statusFluent === "active") {
        setActiveProvider("fluent");
      }
    }

    if (
      activeProvider &&
      statusOKX === "not-active" &&
      statusMetamask === "not-active" &&
      statusFluent === "not-active"
    ) {
      setActiveProvider(undefined);
    }
  }, [statusFluent, statusMetamask, statusOKX, activeProvider]);

  const { closeModal, isOpen, openModal } = useConfluxWalletConnect();

  return (
    <ConfluxWalletContext.Provider
      value={{
        closeModal,
        isOpen,
        openModal,
        wallet,
        activeProvider,
        setActiveProvider,
        chainId,
        theme,
      }}
    >
      <ToastContainer />
      <ModalConnect
        providers={providers}
        isOpen={isOpen}
        onClose={closeModal}
      />
      {children}
    </ConfluxWalletContext.Provider>
  );
};

export default ConfluxWalletProvider;
