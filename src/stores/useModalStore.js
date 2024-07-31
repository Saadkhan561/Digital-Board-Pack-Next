import create from "zustand";

const useModalStore = create((set) => ({
  modals: {},
  openModal: (modalName, id) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: true },
      id,
    })),
  closeModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: false },
      id: undefined,
    })),
}));

export default useModalStore;
