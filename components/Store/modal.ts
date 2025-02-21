import { create } from "zustand";
import { ModalState } from "./types";

export const ModalStore = create<ModalState>((set) => ({
  modalOpen: false,
  setModalOpen: (open: boolean) => set({ modalOpen: open }),
}));
