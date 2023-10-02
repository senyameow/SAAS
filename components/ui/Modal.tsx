'use client'

import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

interface ModalProps {
    children?: React.ReactNode;
    title?: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

export const Modal: React.FC<ModalProps> = ({ children, title, description, isOpen, onClose, className }) => {

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }

    return (
        <Dialog onOpenChange={onChange} open={isOpen}>
            <DialogContent className={cn(``, className)}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div>
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    )
}