import { createContext, useContext, useState, type ReactNode } from "react";
import type { ModalState } from "../type";
import ModalRenderer from "../components/modalRenderer";

interface ModalContextType {
  modal: ModalState;
  open: (modal: Exclude<ModalState, { type: "closed" }>) => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState>({ type: "closed" });

  const open = (next: Exclude<ModalState, { type: "closed" }>) => {
    setModal(next);
  };

  const close = () => {
    if (modal.type === "confirm") {
      modal.onConfirm?.();
    }

    if(modal.type === 'set-timer') {
      modal.onClose?.();
    }
    setModal({ type: "closed" });
  };

  return (
    <ModalContext.Provider value={{ modal, open, close }}>
      <ModalRenderer modal={modal} onClose={close} />
      {children}
    </ModalContext.Provider>
  );
}
export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
};
