import { MouseEventHandler, ReactNode } from "react";
import { ConfluxProvider } from "../../ConfluxWalletProvider.types";

export interface ProviderButtonProps {
  active?: boolean;
  text?: string;
  theme?: "dark" | "light";
  provider: ConfluxProvider;
  chainId: string;
  status:
    | "in-detecting"
    | "not-installed"
    | "not-active"
    | "in-activating"
    | "active"
    | "chain-error";
  primary?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon: ReactNode;
}
