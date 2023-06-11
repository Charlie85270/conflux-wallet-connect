import { useState } from "react";

interface ModalState {
  /**
   * if the connect modal isOpen
   */
  isOpen: boolean;
  /**
   * Open the connect modal
   * @returns
   */
  openModal: () => void;
  /**
   * Close the conenct modal
   * @returns
   */
  closeModal: () => void;
}

const useConfluxWalletConnect = (): ModalState => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal };
};

export default useConfluxWalletConnect;
