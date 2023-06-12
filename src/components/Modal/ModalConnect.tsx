// Modal.tsx
import React, { FC } from "react";
import { FluentIcon, MetamaskIcon, OKXIcon } from "./Icon";
import { toast } from "react-toastify";
//OKX provider
import {
  useStatus as useSatusOKX,
  connect as connectOKX,
  useChainId as useChainIdOKX,
  switchChain as switchChainOKX,
} from "@cfxjs/use-wallet-react/ethereum/OKX";

// Metamask provider
import {
  useStatus as useStatusMetamask,
  connect as connectMetamask,
  useChainId as useChainIdMetamask,
  switchChain as switchChainMetamask,
} from "@cfxjs/use-wallet-react/ethereum/MetaMask";

// Fluent provider
import {
  useStatus as useStatusFluent,
  connect as connectFluent,
  useChainId as useChainIdFluent,
  switchChain as switchChainFluent,
} from "@cfxjs/use-wallet-react/ethereum/Fluent";
import ProviderButton from "../ProviderButton/ProviderButton";
import useConfluxWalletContext from "../../hook/useConfluxWalletContext";
import { ConfluxProvider } from "../../ConfluxWalletProvider.types";
import { ModalProps } from "./ModalConnect.types";
import classNames from "classnames";

const ModalConnect: FC<ModalProps> = ({ isOpen, onClose, providers }) => {
  const {
    activeProvider,
    setActiveProvider,
    closeModal,
    chainId,
    wallet,
    theme,
  } = useConfluxWalletContext();

  const { account, balance, chainId: walletChain } = wallet;

  const statusOKX = useSatusOKX();
  const statusMetamask = useStatusMetamask();
  const statusFluent = useStatusFluent();
  const chainIdFluent = useChainIdFluent();
  const chainIdMetamask = useChainIdMetamask();
  const chainIdOKX = useChainIdOKX();

  const select = (provider: ConfluxProvider) => {
    setActiveProvider(provider);
    toast(`${provider.toUpperCase()} wallet connected !`);
    closeModal();
  };

  /**
   * Actions triggered when Metamask button is clicked
   */
  const metamaskActions = async () => {
    const isWrongNetwork = chainIdMetamask !== chainId.toString();

    try {
      if (
        statusMetamask === "active" &&
        activeProvider !== "metamask" &&
        !isWrongNetwork
      ) {
        select("metamask");
      } else if (statusMetamask !== "active") {
        await connectMetamask();
        if (isWrongNetwork) {
          await switchChainMetamask(`0x${chainId.toString(16)}`);
        }
        select("metamask");
      } else if (statusMetamask === "active" && isWrongNetwork) {
        await switchChainMetamask(`0x${chainId.toString(16)}`);
        select("metamask");
      }
    } catch (error) {
      toast(`An error occured : ${(error as any)?.message || ""}`);
    }
  };

  /**
   * Actions triggered when OKX button is clicked
   */
  const okxActions = async () => {
    const isWrongNetwork = chainIdOKX !== chainId.toString();
    try {
      if (
        statusOKX === "active" &&
        activeProvider !== "okx" &&
        !isWrongNetwork
      ) {
        select("okx");
      } else if (statusOKX !== "active") {
        await connectOKX();
        // Wrong chainId connected
        if (isWrongNetwork) {
          await switchChainOKX(`0x${chainId.toString(16)}`);
        }
        select("okx");
      } else if (statusOKX === "active" && isWrongNetwork) {
        await switchChainOKX(`0x${chainId.toString(16)}`);
        select("okx");
      }
    } catch (error) {
      toast(`An error occured : ${JSON.stringify(error)}`);
    }
  };

  /**
   * Actions triggered when Fluent button is clicked
   */
  const fluentActions = async () => {
    const isWrongNetwork = chainIdOKX !== chainId.toString();
    try {
      if (
        statusFluent === "active" &&
        activeProvider !== "fluent" &&
        !isWrongNetwork
      ) {
        select("fluent");
      } else if (statusFluent !== "active") {
        await connectFluent();
        // Wrong chainId connected
        if (isWrongNetwork) {
          await switchChainFluent(`0x${chainId.toString(16)}`);
        }
        select("fluent");
      } else if (statusFluent === "active" && isWrongNetwork) {
        await switchChainFluent(`0x${chainId.toString(16)}`);
        select("fluent");
      }
    } catch (error) {
      toast(`An error occured : ${JSON.stringify(error)}`);
    }
  };
  /**
   * Copy the address
   */
  const copyAddress = () => {
    const el = document.createElement("textarea");
    el.value = account || "";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    toast("Address copied !");
  };

  const providersData = {
    metamask: {
      status: statusMetamask,
      connect: metamaskActions,
      label: "Metamask",
      icon: <MetamaskIcon />,
      chainId: chainIdMetamask,
    },
    okx: {
      status: statusOKX,
      connect: okxActions,
      label: "OKX Wallet",
      icon: <OKXIcon />,
      chainId: chainIdOKX,
    },
    fluent: {
      status: statusFluent,
      connect: fluentActions,
      label: "Fluent",
      icon: <FluentIcon />,
      chainId: chainIdFluent,
    },
  };

  if (!isOpen) return null;

  return (
    <div
      id="defaultModal"
      key={chainIdFluent || "" + chainIdMetamask || "" + chainIdOKX}
      tabIndex={-1}
      aria-hidden={!isOpen}
      className={classNames(
        "fixed top-0 left-0 flex items-center justify-center right-0 z-50 bg-gray-700/75 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      )}
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <div
          className={classNames("relative rounded-lg shadow", {
            "bg-gray-800": theme === "dark",
            "bg-white": theme === "light",
          })}
        >
          <div
            className={classNames(
              "flex items-start justify-between p-4 border-b rounded-t",
              {
                "border-gray-900": theme === "dark",
              }
            )}
          >
            <h3
              className={classNames("text-xl font-semibold ", {
                "text-white": theme === "dark",
                "text-gray-900": theme === "light",
              })}
            >
              Connect your wallet
            </h3>
            <button
              onClick={onClose}
              type="button"
              className={classNames(
                "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              )}
              data-modal-hide="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {providers && (
            <div className="grid grid-cols-3 gap-4 p-6">
              {providers?.map(provider => {
                return (
                  <ProviderButton
                    theme={theme}
                    chainId={providersData[provider].chainId?.toString() || ""}
                    active={activeProvider === provider}
                    key={provider}
                    icon={providersData[provider].icon}
                    provider={provider}
                    status={providersData[provider].status}
                    disabled={
                      providersData[provider].status === "not-installed"
                    }
                    onClick={providersData[provider].connect}
                    text={providersData[provider].label}
                  />
                );
              })}
            </div>
          )}

          {(!providers || providers.length === 0) && (
            <p className="w-full p-6 text-orange-500">
              No providers found, please follow the ConfluxWalletProvider
              documentation to configure prodivers.
            </p>
          )}
          <div
            className={classNames(
              "flex items-center p-6 space-x-2 border-t rounded-b",
              {
                "border-gray-900": theme === "dark",
              }
            )}
          >
            {account && (
              <div>
                <div className="flex items-center justify-between space-x-4">
                  <div>
                    <p
                      className={classNames("text-sm", {
                        "text-gray-400": theme === "dark",
                        "text-gray-500": theme === "light",
                      })}
                    >
                      Account
                    </p>
                    <p
                      className={classNames({
                        "text-gray-100": theme === "dark",
                        "text-gray-700": theme === "light",
                      })}
                    >
                      {account}
                    </p>
                  </div>
                  <button
                    data-modal-hide="defaultModal"
                    type="button"
                    onClick={copyAddress}
                    className={classNames(
                      "text-gray-500  focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5  focus:z-10",
                      {
                        "bg-gray-900 hover:bg-gray-800 border-gray-900 ":
                          theme === "dark",
                        "bg-white hover:bg-gray-100": theme === "light",
                      }
                    )}
                  >
                    copy
                  </button>
                </div>
                {walletChain === chainId.toString() && (
                  <div className="flex items-center justify-between mt-3 space-x-4">
                    <div>
                      <p
                        className={classNames("text-sm", {
                          "text-gray-400": theme === "dark",
                          "text-gray-500": theme === "light",
                        })}
                      >
                        Balance
                      </p>
                      <p
                        className={classNames({
                          "text-gray-100": theme === "dark",
                          "text-gray-700": theme === "light",
                        })}
                      >
                        {balance?.toDecimalStandardUnit()} CFX
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConnect;
