import { create } from 'zustand'


interface useConfettiStoreProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}


export const useConfettiStore = create<useConfettiStoreProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))
