import { Dispatch, SetStateAction } from 'react';
import { create } from 'zustand'

export type ModalType = 'uploadModal' | 'pdfModal'

interface ModalData {
    pageNumber?: number;
    url?: string;
    degree?: number;
    setNumPages?: Dispatch<SetStateAction<number | undefined>>;
    numPages?: number
}

interface useModalStoreProps {
    type: ModalType | null;
    data?: ModalData | null;
    isOpen: boolean;
    onOpen: (type: ModalType, data: ModalData | null) => void;
    onClose: () => void;
}

export const useModalStore = create<useModalStoreProps>((set) => ({
    type: null,
    data: undefined,
    isOpen: false,
    onOpen: (type: ModalType, data: ModalData | null) => set({ isOpen: true, type, data }),
    onClose: () => set({ isOpen: false, type: null }),
}))