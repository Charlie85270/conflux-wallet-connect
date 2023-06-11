import React from "react";
import { ConfluxWalletButtonProps } from "./ConfluxWalletButton.types";
import classNames from "classnames";
import { FluentIcon, MetamaskIcon, OKXIcon } from "../Modal/Icon";
import { ConfluxProvider } from "../../ConfluxWalletProvider.types";
import useConfluxWalletContext from "../../hook/useConfluxWalletContext";
/**
 * ConfluxWalletButton is pre-styled button component used to facilitate
 * the management and the display of the connected wallets
 *
 *
 * The click on the button display the modal to select a wallet
 * @param size the size of the button
 * @param disabled if the button is disabled
 * @returns
 */
const ConfluxWalletButton: React.FC<ConfluxWalletButtonProps> = ({
  size,
  disabled,
  onClick,
  ...props
}) => {
  const { openModal, isOpen, activeProvider, wallet, chainId, theme } =
    useConfluxWalletContext();

  const { account, chainId: chainIdWalletConnect } = wallet;
  const isWaitingWallet = isOpen && !activeProvider;

  const isWrongNetwork = chainIdWalletConnect !== chainId.toString();
  const getIcon = (provider?: ConfluxProvider) => {
    const classNames = "w-4 h-4";
    if (provider === "fluent") {
      return <FluentIcon className={classNames} />;
    }
    if (provider === "metamask") {
      return <MetamaskIcon className={classNames} />;
    }
    if (provider === "okx") {
      return <OKXIcon className={classNames} />;
    }
    return null;
  };

  return (
    <button
      type="button"
      onClick={openModal}
      disabled={disabled}
      className={classNames(
        `flex space-x-2 items-center justify-center w-full px-4 py-2 text-centertransition duration-200 ease-in border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2`,
        {
          "text-lg": size === "large",
          "text-md": size === "medium",
          "text-sm": size === "small",
          "bg-white hover:bg-gray-100 focus:ring-gray-200 focus:ring-offset-gray-200 text-gray-800 ":
            theme === "light",
          "bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 focus:ring-offset-gray-700 text-white":
            theme === "dark",
          "opacity-70": disabled,
        }
      )}
      {...props}
    >
      {isWaitingWallet && (
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="mr-2 animate-spin"
          viewBox="0 0 1792 1792"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
        </svg>
      )}

      {Boolean(activeProvider) ? (
        <>
          <div
            className={classNames("w-2 h-2 bg-green-500 rounded-full", {
              "bg-orange-500": isWrongNetwork,
              "bg-gren-500": !isWrongNetwork,
            })}
          ></div>
          {getIcon(activeProvider)}
          <span>
            {account?.slice(0, 8)}...{account?.slice(-4)}
          </span>
        </>
      ) : isOpen ? (
        "Connecting"
      ) : (
        "Connect wallet"
      )}
    </button>
  );
};

export default ConfluxWalletButton;
