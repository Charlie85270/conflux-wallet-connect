import { ConfluxProvider } from "../../ConfluxWalletProvider.types";

export interface ModalProps {
  isOpen: boolean;
  theme?: "light" | "dark";
  providers: ConfluxProvider[];
  onClose: () => void;
}
