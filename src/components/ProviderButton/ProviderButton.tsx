import React from "react";
import { ProviderButtonProps } from "./ProviderButton.types";
import classNames from "classnames";
import useConfluxWalletContext from "../../hook/useConfluxWalletContext";

const ProviderButton: React.FC<ProviderButtonProps> = ({
  active,
  size,
  chainId,
  theme,
  primary,
  disabled,
  text,
  status,
  icon,
  onClick,
  ...props
}) => {
  const { chainId: globaleChainId } = useConfluxWalletContext();

  const isWrongNetwork = globaleChainId.toString() !== chainId.toString();

  let label = `Connect with ${text}`;
  if (isWrongNetwork && status !== "not-installed") {
    label = "Switch network";
  } else {
    switch (status) {
      case "in-activating":
        label = "Connecting";
        break;
      case "not-installed":
        label = `${text} isn't installed`;
        break;
      case "active":
        label = `Connected`;
        break;
      case "not-active":
        label = `Connect with ${text}`;
      default:
        break;
    }
  }

  return (
    <button
      type="button"
      className={classNames(
        "border flex items-center relative justify-between transform transition duration-200 flex-col rounded p-4 flex",
        {
          "border-gray-900": theme === "dark",
          "hover:scale-105 hover:shadow": !disabled,
          "opacity-60": disabled,
          "border-2 border-green-400": active && !isWrongNetwork,
          "border-2 border-orange-400": active && isWrongNetwork,
        }
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {active && (
        <div
          className={classNames(
            "absolute top-0 left-0 h-6 p-1 text-xs text-white rounded-br max-w-max",
            {
              "bg-orange-400 ": isWrongNetwork,
              "bg-green-400": !isWrongNetwork,
            }
          )}
        >
          {isWrongNetwork ? "Wrong network" : "Active"}
        </div>
      )}
      <div className="flex items-center w-20 h-20 mb-4">{icon}</div>
      <span
        className={classNames("text-sm ", {
          "text-gray-400": disabled,
          "text-white": theme === "dark" && !disabled,
          "text-gray-700": theme === "light" && !disabled,
        })}
      >
        {label}
      </span>
    </button>
  );
};

export default ProviderButton;
